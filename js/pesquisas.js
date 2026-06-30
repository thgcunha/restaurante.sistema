import { StorageService } from './storage.js';

const mockFeedbacks = [
    { nome: "Carlos Ribeiro", nota: 5, comentario: "Comida excelente e ambiente maravilhoso! O garçom nos atendeu super rápido.", data: "2026-06-28" },
    { nome: "Mariana Souza", nota: 4, comentario: "Gostei bastante, mas achei que a sobremesa demorou um pouquinho.", data: "2026-06-29" },
    { nome: "Roberto Mendes", nota: 5, comentario: "O melhor restaurante italiano da região. Atendimento impecável.", data: "2026-06-30" },
    { nome: "Fernanda Costa", nota: 3, comentario: "O prato estava meio frio, mas a equipe trocou prontamente.", data: "2026-06-30" }
];

function inicializarPesquisas() {
    let feedbacks = StorageService.getData("feedbacks");
    if(feedbacks.length === 0) {
        feedbacks = mockFeedbacks;
        StorageService.saveData("feedbacks", feedbacks);
    }
    
    renderizar(feedbacks);
}

function renderizar(feedbacks) {
    const lista = document.getElementById("listaFeedbacks");
    if(!lista) return;
    
    let soma = 0;
    feedbacks.forEach(f => soma += f.nota);
    const media = (soma / feedbacks.length).toFixed(1);
    
    document.getElementById("notaMedia").innerText = media;
    document.getElementById("totalAvaliacoes").innerText = `Baseado em ${feedbacks.length} avaliações`;
    
    let estrelasHtml = '';
    const estrelasInt = Math.round(media);
    for(let i = 1; i <= 5; i++) {
        estrelasHtml += (i <= estrelasInt) ? '<i class="bi bi-star-fill"></i> ' : '<i class="bi bi-star"></i> ';
    }
    document.getElementById("estrelasMedia").innerHTML = estrelasHtml;
    
    lista.innerHTML = '';
    const feedbacksInvertido = [...feedbacks].reverse();
    
    feedbacksInvertido.forEach(f => {
        let stars = '';
        for(let i = 1; i <= 5; i++) {
            stars += (i <= f.nota) ? '<i class="bi bi-star-fill text-warning"></i> ' : '<i class="bi bi-star text-warning"></i> ';
        }
        
        const div = document.createElement("div");
        div.className = "p-4 border rounded-3 bg-light shadow-sm mb-2";
        div.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <strong class="text-primary fs-5">${f.nome}</strong>
                <span class="badge bg-secondary"><i class="bi bi-calendar3"></i> ${f.data.split('-').reverse().join('/')}</span>
            </div>
            <div class="mb-3 fs-5">${stars}</div>
            <p class="mb-0 text-secondary fst-italic">"${f.comentario}"</p>
        `;
        lista.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', inicializarPesquisas);
