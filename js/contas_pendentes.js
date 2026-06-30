import { StorageService } from './storage.js';
import { formatCurrency } from './utils.js';

function carregarContas() {
    const pedidos = StorageService.getData("pedidosCozinheiro");
    const tbody = document.getElementById("tabelaContas");
    if(!tbody) return;
    
    tbody.innerHTML = '';
    
    if(pedidos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-5"><i class="bi bi-check-circle text-success fs-2 d-block mb-2"></i> Nenhuma conta pendente no salão.</td></tr>';
        return;
    }
    
    pedidos.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-secondary">#${p.id}</td>
            <td><span class="badge bg-primary fs-6">Mesa ${p.mesa}</span></td>
            <td class="fw-bold text-success fs-5">${formatCurrency(p.total)}</td>
            <td class="text-end"><a href="/pages/caixa.html" class="btn btn-sm btn-outline-primary fw-bold px-3">Ir para Caixa <i class="bi bi-arrow-right"></i></a></td>
        `;
        tbody.appendChild(tr);
    });
}

window.addEventListener('storage_updated', (e) => { if(e.detail && e.detail.key === 'pedidosCozinheiro') carregarContas(); });
window.addEventListener('storage', (e) => { if(e.key === 'pedidosCozinheiro') carregarContas(); });
document.addEventListener('DOMContentLoaded', carregarContas);
