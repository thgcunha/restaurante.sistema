import { StorageService } from './storage.js';
import { formatCurrency } from './utils.js';

let totalpedidos = 0;
let totalrecebido = 0;

function setupCaixa() {
    const orderNumberEl = document.getElementById('order-number');
    if(orderNumberEl) {
        orderNumberEl.addEventListener('change', function() {
            const mesa = this.value;
            const pedidos = StorageService.getData("pedidosCozinheiro");
            const pedido = pedidos.find(p => p.mesa === mesa);

            const totalAmountEl = document.getElementById('total-amount');
            if (pedido) {
                totalAmountEl.value = formatCurrency(pedido.total);
                totalAmountEl.dataset.raw = pedido.total;
            } else {
                totalAmountEl.value = '';
                delete totalAmountEl.dataset.raw;
                alert('Pedido não encontrado para esta mesa.');
            }
        });
    }

    const confirmarBtn = document.getElementById('confirmar');
    if (confirmarBtn) {
        confirmarBtn.className = "btn btn-primary mt-3 w-100";
        confirmarBtn.addEventListener('click', function() {
            const orderNumber = document.getElementById('order-number').value;
            const totalAmountEl = document.getElementById('total-amount');
            const totalAmount = parseFloat(totalAmountEl.dataset.raw || 0); 
            const paymentMethod = document.getElementById('payment-method').value;
            let troco = 0;

            if (orderNumber && totalAmount > 0) {
                if (paymentMethod === 'dinheiro') {
                    const cashReceived = parseFloat(document.getElementById('cash-received').value);
                    if (cashReceived && cashReceived >= totalAmount) {
                        troco = cashReceived - totalAmount;
                    } else {
                        alert('O valor recebido deve ser maior ou igual ao valor total.');
                        return;
                    }
                }

                totalpedidos++;
                totalrecebido += totalAmount;

                document.getElementById('total-pedidos').innerText = totalpedidos;
                document.getElementById('total-recebido').innerText = formatCurrency(totalrecebido);
                document.getElementById('troco').innerText = formatCurrency(troco);

                document.getElementById('payment-form').reset();
                document.getElementById('cash-payment-section').style.display = 'none';
                
                StorageService.removeItem("pedidosCozinheiro", p => p.mesa === orderNumber);
                
                const vendas = StorageService.getData("vendasRealizadas");
                vendas.push({ 
                    id: Date.now(), 
                    mesa: orderNumber, 
                    total: totalAmount, 
                    data: new Date().toISOString() 
                });
                StorageService.saveData("vendasRealizadas", vendas);
                
                alert("Pagamento registrado com sucesso!");
            } else {
                alert('Insira um número de pedido válido e o valor.');
            }
        });
    }

    const paymentMethodEl = document.getElementById('payment-method');
    if (paymentMethodEl) {
        paymentMethodEl.addEventListener('change', function() {
            const paymentMethod = this.value;
            if (paymentMethod === 'dinheiro') {
                document.getElementById('cash-payment-section').style.display = 'block';
            } else {
                document.getElementById('cash-payment-section').style.display = 'none';
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", setupCaixa);
