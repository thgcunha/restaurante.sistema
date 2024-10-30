document.getElementById('order-number').addEventListener('change', function() {
    const mesa = document.getElementById('order-number').value;

    // Buscar pedidos armazenados no localStorage
    const pedidos = JSON.parse(localStorage.getItem("pedidosCozinheiro")) || [];
    const pedido = pedidos.find(p => p.mesa === mesa);

    if (pedido) {
        document.getElementById('total-amount').value = pedido.total.toFixed(2).replace('.', ',');
    } else {
        document.getElementById('total-amount').value = '';
        alert('Pedido não encontrado para esta mesa.');
    }
});

let totalpedidos = 0;
let totalrecebido = 0;

document.getElementById('confirmar').addEventListener('click', function() {
    const orderNumber = document.getElementById('order-number').value;
    const totalAmount = parseFloat(document.getElementById('total-amount').value.replace(',', '.')); // Converte o valor para float
    const paymentMethod = document.getElementById('payment-method').value;
    let troco = 0;

    if (orderNumber && totalAmount > 0) {
        totalpedidos++;
        totalrecebido += totalAmount;

        // Verificar forma de pagamento
        if (paymentMethod === 'dinheiro') {
            const cashReceived = parseFloat(document.getElementById('cash-received').value);

            // Verifica se o valor recebido é maior ou igual ao total
            if (cashReceived && cashReceived >= totalAmount) {
                troco = cashReceived - totalAmount;
            } else {
                alert('O valor recebido deve ser maior ou igual ao valor total.');
                return;
            }
        }

        // Atualizar resumo do caixa
        document.getElementById('total-pedidos').innerText = totalpedidos;
        document.getElementById('total-recebido').innerText = totalrecebido.toFixed(2).replace('.', ',');
        document.getElementById('troco').innerText = troco.toFixed(2).replace('.', ',');

        // Limpar formulário
        document.getElementById('payment-form').reset();
        document.getElementById('cash-payment-section').style.display = 'none';
    } else {
        alert('Insira um número de pedido válido e o valor.');
    }
});

// Exibir campo de valor recebido se a forma de pagamento for "Dinheiro"
document.getElementById('payment-method').addEventListener('change', function() {
    const paymentMethod = document.getElementById('payment-method').value;
    console.log('Forma de pagamento selecionada:', paymentMethod); // Verifica se o evento está sendo acionado
    
    if (paymentMethod === 'dinheiro') {
        document.getElementById('cash-payment-section').style.display = 'block';
    } else {
        document.getElementById('cash-payment-section').style.display = 'none';
    }
});








