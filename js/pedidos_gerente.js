import { StorageService } from './storage.js';
import { formatCurrency } from './utils.js';

function carregarPedidos() {
    const pedidos = StorageService.getData("pedidosCozinheiro");
    const container = document.getElementById("pedidosContainer");
    if(!container) return;
    
    container.innerHTML = '';
    
    if(pedidos.length === 0) {
        container.innerHTML = '<div class="text-center text-muted py-5 w-100"><i class="bi bi-emoji-smile fs-1 d-block mb-2"></i> Cozinha livre no momento. Todos os pedidos foram entregues.</div>';
        return;
    }
    
    pedidos.forEach(p => {
        const div = document.createElement("div");
        div.className = "glass-panel p-4 m-2 shadow-sm border-0";
        div.style.width = "320px";
        div.innerHTML = `
            <h5 class="fw-bold text-primary mb-3 pb-2 border-bottom">Mesa ${p.mesa} <span class="badge bg-secondary float-end">#${p.id}</span></h5>
            <div class="mb-3" style="max-height: 200px; overflow-y: auto;">
                ${p.itens.map(i => `<div class="d-flex justify-content-between border-bottom py-2"><span class="fw-medium">${i.quantidade}x ${i.nome}</span></div>`).join('')}
            </div>
            <div class="fw-bold text-end text-success fs-5 mt-2">Total: ${formatCurrency(p.total)}</div>
        `;
        container.appendChild(div);
    });
}

window.addEventListener('storage_updated', (e) => { if(e.detail && e.detail.key === 'pedidosCozinheiro') carregarPedidos(); });
window.addEventListener('storage', (e) => { if(e.key === 'pedidosCozinheiro') carregarPedidos(); });
document.addEventListener('DOMContentLoaded', carregarPedidos);
