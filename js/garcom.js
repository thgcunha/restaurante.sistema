import { StorageService } from './storage.js';
import { formatCurrency } from './utils.js';

let total = 0;
let itensPedido = [];

function carregarDados() {
    const tipos = ["comidas", "bebidas", "sobremesas"];
    tipos.forEach(tipo => {
        const dados = StorageService.getData(tipo);
        dados.forEach(item => adicionarItemTabela(tipo, item.nome, item.valor));
    });
}

function adicionarItemTabela(tipo, nome, valorStr) {
    const tbody = document.getElementById(tipo);
    if(!tbody) return;
    
    // Parse value to ensure it's a number
    const valor = typeof valorStr === 'string' ? parseFloat(valorStr.replace(',', '.')) : valorStr;
    
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${nome}</td>
        <td>${formatCurrency(valor)}</td>
        <td>
            <button class="adicionarpedido btn btn-sm btn-primary">Adicionar ao Pedido</button>
        </td>
    `;
    
    row.querySelector('.adicionarpedido').addEventListener('click', () => adicionarAoPedido(nome, valor, tipo));
    tbody.appendChild(row);
}

function adicionarAoPedido(nome, valor, tipo) {
    total += valor; 
    itensPedido.push({ nome, valor, tipo });
    atualizarTotal(); 
    exibirItensPedido(); 
}

function atualizarTotal() {
    const totalDisplay = document.querySelector("#totalDisplay");
    if(totalDisplay) {
        totalDisplay.innerHTML = `Total: ${formatCurrency(total)}`;
    }
}

function exibirItensPedido() {
    const container = document.getElementById("telo");
    if(!container) return;
    container.innerHTML = ''; 

    itensPedido.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = `row ${item.tipo} mb-2 align-items-center p-2 border rounded bg-white shadow-sm`; 
        itemDiv.innerHTML = `
            <div class="col">
                <span class="icon">${getIcon(item.tipo)}</span> 
                ${item.nome}
            </div>
            <div class="col fw-bold text-end">${formatCurrency(item.valor)}</div>
        `;
        container.appendChild(itemDiv);
    });
}

function getIcon(tipo) {
    switch(tipo) {
        case 'comidas': return "🍽️"; 
        case 'bebidas': return "🍹"; 
        case 'sobremesas': return "🍰"; 
        default: return ""; 
    }
}

function finalizarPedidoGarcom() {
    if (itensPedido.length === 0) {
        alert("Não há itens no pedido!");
        return;
    }

    const mesa = document.getElementById("mesa").value; 
    if (!mesa) {
        alert("Por favor, informe o número da mesa!");
        return;
    }

    const pedidoCompleto = {
        id: Date.now(),
        mesa: mesa, 
        itens: itensPedido,
        total: total
    };

    StorageService.addItem("pedidosCozinheiro", pedidoCompleto);

    itensPedido = [];
    total = 0;
    atualizarTotal();
    exibirItensPedido();
    document.getElementById("mesa").value = ''; 

    alert("Pedido finalizado e enviado para a cozinha!");
}

document.addEventListener("DOMContentLoaded", () => {
    carregarDados();
    
    // Check if we are on the garcom page before attaching
    const btnFinalizar = document.getElementById('finalizar');
    if (btnFinalizar) {
        btnFinalizar.removeAttribute('onclick'); // remove inline
        btnFinalizar.addEventListener('click', finalizarPedidoGarcom);
        btnFinalizar.className = "btn btn-success mt-3";
    }
});
