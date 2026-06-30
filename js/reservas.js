import { StorageService } from './storage.js';

function carregarReservas() {
    const reservas = StorageService.getData("reservas");
    const tbody = document.getElementById("tabelaReservas");
    if(!tbody) return;
    tbody.innerHTML = '';
    
    reservas.sort((a,b) => new Date(`${a.data}T${a.hora}`) - new Date(`${b.data}T${b.hora}`));
    
    if(reservas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-4">Nenhuma reserva agendada.</td></tr>';
        return;
    }
    
    reservas.forEach(r => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>
                <span class="badge bg-light text-dark border"><i class="bi bi-calendar3"></i> ${r.data.split('-').reverse().join('/')}</span>
                <span class="badge bg-light text-dark border ms-1"><i class="bi bi-clock"></i> ${r.hora}</span>
            </td>
            <td class="fw-bold text-primary">${r.nome}</td>
            <td><span class="badge bg-secondary">Mesa ${r.mesa}</span></td>
            <td class="text-end"><button class="btn btn-sm btn-outline-danger btn-excluir"><i class="bi bi-trash"></i> Cancelar</button></td>
        `;
        tr.querySelector('.btn-excluir').addEventListener('click', () => {
            if(confirm('Tem certeza que deseja cancelar a reserva de ' + r.nome + '?')) {
                StorageService.removeItem("reservas", x => x.id === r.id);
                carregarReservas();
            }
        });
        tbody.appendChild(tr);
    });
}

function inicializar() {
    carregarReservas();
    const form = document.getElementById('formReserva');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const nova = {
                id: Date.now(),
                nome: document.getElementById('resNome').value,
                mesa: document.getElementById('resMesa').value,
                data: document.getElementById('resData').value,
                hora: document.getElementById('resHora').value
            };
            StorageService.addItem("reservas", nova);
            form.reset();
            carregarReservas();
            alert("Reserva salva com sucesso!");
        });
    }
}
document.addEventListener('DOMContentLoaded', inicializar);
