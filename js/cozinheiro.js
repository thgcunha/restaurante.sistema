import { StorageService } from './storage.js';
import { formatCurrency } from './utils.js';

function carregarPedidos() {
    const pedidos = StorageService.getData("pedidosCozinheiro");
    const pedidoContainer = document.getElementById("pedidoCozinheiro");
    if(!pedidoContainer) return;
    
    pedidoContainer.innerHTML = ''; 

    if (pedidos.length > 0) {
        pedidos.forEach(pedido => adicionarPedidoAoContainer(pedido));
    } else {
        pedidoContainer.innerHTML = '<p class="pedido-disponivel text-muted">Nenhum pedido disponível no momento.</p>'; 
    }
}

function adicionarPedidoAoContainer(pedido) {
    const pedidoContainer = document.getElementById("pedidoCozinheiro");
    const pedidoDiv = document.createElement("div");
    pedidoDiv.className = "pedido-item mb-3 p-3 border rounded bg-white shadow-sm";

    const itensHTML = pedido.itens.map(item => `
        <div class="row border-bottom py-1">
            <div class="col fw-medium">${item.nome}</div>
            <div class="col text-end text-muted">${formatCurrency(item.valor)}</div>
        </div>
    `).join('');

    pedidoDiv.innerHTML = `
        <h5 class="text-primary mb-3"><i class="bi bi-receipt"></i> Pedido #${pedido.id} - Mesa: ${pedido.mesa}</h5>
        <div class="mb-3">${itensHTML}</div>
        <button class="finalizar btn btn-success w-100">Pronto / Finalizar</button>
    `;

    pedidoDiv.querySelector('.finalizar').addEventListener('click', () => finalizarPedido(pedido.id));
    pedidoContainer.appendChild(pedidoDiv);
}

function finalizarPedido(pedidoId) {
    StorageService.removeItem("pedidosCozinheiro", p => p.id === pedidoId);
    carregarPedidos(); 
}

// Ouve atualizações do storage na mesma janela (custom event disparado pelo StorageService)
window.addEventListener('storage_updated', (e) => {
    if(e.detail && e.detail.key === 'pedidosCozinheiro') {
        carregarPedidos();
    }
});

// Ouve atualizações de outras abas nativamente
window.addEventListener('storage', (e) => {
    if(e.key === 'pedidosCozinheiro') {
        carregarPedidos();
    }
});

document.addEventListener("DOMContentLoaded", carregarPedidos);
