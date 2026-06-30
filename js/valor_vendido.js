import { StorageService } from './storage.js';
import { formatCurrency } from './utils.js';

function carregarMetricas() {
    const vendas = StorageService.getData("vendasRealizadas");
    const totalElement = document.getElementById("faturamentoTotal");
    const countElement = document.getElementById("totalVendas");
    const mediaElement = document.getElementById("ticketMedio");
    const tbody = document.getElementById("tabelaVendas");
    
    if(!totalElement || !tbody) return;
    
    let faturamento = 0;
    vendas.forEach(v => faturamento += v.total);
    
    totalElement.innerText = formatCurrency(faturamento);
    countElement.innerText = vendas.length;
    mediaElement.innerText = vendas.length > 0 ? formatCurrency(faturamento / vendas.length) : formatCurrency(0);
    
    tbody.innerHTML = '';
    
    if(vendas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-center text-muted py-4">Nenhuma venda registrada ainda no sistema.</td></tr>';
        return;
    }
    
    const vendasRev = [...vendas].reverse();
    
    vendasRev.forEach(v => {
        const dataObj = new Date(v.data);
        const dataStr = dataObj.toLocaleDateString('pt-BR');
        const horaStr = dataObj.toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'});
        
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="text-secondary"><i class="bi bi-calendar-event me-1"></i> ${dataStr} às ${horaStr}</td>
            <td><span class="badge bg-secondary fs-6">Mesa ${v.mesa}</span></td>
            <td class="text-end fw-bold text-success fs-5">${formatCurrency(v.total)}</td>
        `;
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', carregarMetricas);
