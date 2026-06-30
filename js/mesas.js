import { StorageService } from './storage.js';

function inicializarRecepcao() {
    const btnLiberar = document.querySelector('.liberar');
    if (btnLiberar) {
        btnLiberar.removeAttribute('onclick');
        btnLiberar.addEventListener('click', liberar);
    }
    
    // Configura botões das mesas
    for (let i = 1; i <= 25; i++) {
        const mesaBtn = document.getElementById(`mesa${i}`);
        if (mesaBtn) {
            mesaBtn.removeAttribute('onclick');
            mesaBtn.addEventListener('click', () => reservarMesa(i));
        }
    }
    carregarEstadoMesas();
}

function reservarMesa(num) {
    const cliente = prompt('Digite o CPF do cliente:');
    if (cliente) {
        localStorage.setItem('cliente', cliente);
        const mesaBtn = document.getElementById(`mesa${num}`);
        if(mesaBtn) {
            mesaBtn.disabled = true;
            mesaBtn.classList.add('disabled');
        }
        localStorage.setItem(`mesa${num}`, 'disabled');
        animarMesa(mesaBtn);
        alert(`Cliente registrado: ${cliente} na mesa ${num}`);
    } else {
        alert('Entrada cancelada.');
    }
}

function liberar() {
    const container = document.getElementById("mesasusadas");
    if (!container) return;
    
    container.innerHTML = '';
    let encontradas = false;

    for (let i = 1; i <= 25; i++) {
        const estado = localStorage.getItem(`mesa${i}`);
        if (estado === 'disabled') {
            encontradas = true;
            const p = document.createElement('p');
            p.className = 'paragrafo-mesas';
            p.innerHTML = `Mesa ${i} <button class="lib1 btn btn-sm btn-success text-white">Liberar</button>`;
            
            p.querySelector('button').addEventListener('click', () => lib(i));
            container.appendChild(p);
        }
    }

    if (!encontradas) {
        alert('Nenhuma mesa ocupada encontrada.');
    }
}

function lib(num) {
    const mesaBtn = document.getElementById(`mesa${num}`);
    if (mesaBtn) {
        mesaBtn.classList.remove('disabled');
        mesaBtn.disabled = false;
    }
    localStorage.removeItem(`mesa${num}`);
    alert(`Mesa ${num} liberada!`);
    
    const container = document.getElementById("mesasusadas");
    if (container) container.innerHTML = '';
}

function carregarEstadoMesas() {
    for (let i = 1; i <= 25; i++) {
        const mesaBtn = document.getElementById(`mesa${i}`);
        if (!mesaBtn) continue;
        
        const estado = localStorage.getItem(`mesa${i}`);
        if (estado === 'disabled') {
            mesaBtn.classList.add('disabled');
            mesaBtn.disabled = true;
        } else {
            mesaBtn.classList.remove('disabled');
            mesaBtn.disabled = false;
        }
    }
}

function animarMesa(mesaElement) {
    if(!mesaElement) return;
    mesaElement.style.transition = "transform 0.3s ease, background-color 0.3s ease";
    mesaElement.style.transform = "scale(1.05)";
    setTimeout(() => {
        mesaElement.style.transform = "scale(1)";
    }, 300);
}

document.addEventListener('DOMContentLoaded', inicializarRecepcao);
