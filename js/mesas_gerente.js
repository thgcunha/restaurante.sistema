import { StorageService } from './storage.js';

function renderizarMesas() {
    const container = document.getElementById("mesasContainer");
    if (!container) return;
    
    container.innerHTML = ''; 
    for (let i = 1; i <= 25; i++) {
        const estado = localStorage.getItem(`mesa${i}`);
        
        const mesaDiv = document.createElement("div");
        mesaDiv.className = "d-flex flex-column align-items-center justify-content-center rounded-4 shadow-sm fw-bold fs-3";
        mesaDiv.style.width = "90px";
        mesaDiv.style.height = "90px";
        mesaDiv.style.transition = "all 0.3s ease";
        mesaDiv.innerText = i;
        
        if (estado === 'disabled') {
            mesaDiv.style.background = "linear-gradient(135deg, #e74c3c, #c0392b)";
            mesaDiv.style.color = "#fff";
        } else {
            mesaDiv.style.background = "var(--bg-secondary)";
            mesaDiv.style.color = "var(--accent-color)";
            mesaDiv.style.border = "2px solid rgba(0,0,0,0.05)";
        }
        
        mesaDiv.onmouseover = () => mesaDiv.style.transform = "translateY(-5px)";
        mesaDiv.onmouseout = () => mesaDiv.style.transform = "translateY(0)";
        
        container.appendChild(mesaDiv);
    }
}

window.addEventListener('storage', () => renderizarMesas());
document.addEventListener('DOMContentLoaded', renderizarMesas);
