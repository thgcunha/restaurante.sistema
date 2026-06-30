import { StorageService } from './storage.js';
import { formatCurrency } from './utils.js';

function carregarDados() {
    const tipos = ["comidas", "bebidas", "sobremesas"];
    tipos.forEach(tipo => {
        const tbody = document.getElementById(tipo);
        if (!tbody) return; 
        
        tbody.innerHTML = ''; 
        const dados = StorageService.getData(tipo);
        dados.forEach(item => {
            adicionarItemTabela(tipo, item.nome, item.valor);
        });
    });
}

function adicionarComida() {
    const nomeInput = document.getElementById("nomecomida");
    const valorInput = document.getElementById("valorcomida");
    const tipoInput = document.getElementById("tipodecomida");

    if (!nomeInput || !valorInput || !tipoInput) return;

    const nome = nomeInput.value.trim();
    const valor = valorInput.value.trim();
    const tipo = tipoInput.value;

    if (nome && valor && tipo) {
        StorageService.addItem(tipo, { nome, valor });
        carregarDados();
        limparFormulario();
    } else {
        alert("Preencha todos os campos antes de adicionar.");
    }
}

function adicionarItemTabela(tipo, nome, valor) {
    const tbody = document.getElementById(tipo);
    if (!tbody) return;

    const row = document.createElement("tr");
    const valorFormatado = formatCurrency(valor);
    
    row.innerHTML = `
        <td>${nome}</td>
        <td>${valorFormatado}</td>
        <td>
            <button class="botao-editar btn btn-sm btn-warning text-white">Editar</button>
            <button class="botao-excluir btn btn-sm btn-danger">Excluir</button>
        </td>
    `;
    
    row.querySelector('.botao-editar').addEventListener('click', () => editarItem(tipo, nome, valor));
    row.querySelector('.botao-excluir').addEventListener('click', () => excluirItem(tipo, nome, valor));
    
    tbody.appendChild(row);
}

function editarItem(tipo, nome, valor) {
    document.getElementById("nomecomida").value = nome;
    document.getElementById("valorcomida").value = valor;
    document.getElementById("tipodecomida").value = tipo;

    excluirItem(tipo, nome, valor);
}

function excluirItem(tipo, nome, valor) {
    StorageService.removeItem(tipo, item => item.nome === nome && item.valor === valor);
    carregarDados();
}

function limparFormulario() {
    document.getElementById("nomecomida").value = '';
    document.getElementById("valorcomida").value = '';
}

function atualizarStatusEstoque() {
    const rows = document.querySelectorAll('tbody tr');
    rows.forEach(row => {
        if (row.cells.length !== 4) return;
        
        const cell = row.cells[1];
        if (!cell) return;
        
        const quantidade = parseInt(cell.innerText);
        if (isNaN(quantidade)) return;
        
        const statusSpan = row.querySelector('span');
        if (!statusSpan) return;
        
        statusSpan.className = ''; 
        if (quantidade > 20) {
            statusSpan.classList.add('status-ok', 'badge', 'bg-success');
            statusSpan.innerText = 'Estoque OK';
        } else if (quantidade > 5) {
            statusSpan.classList.add('status-low', 'badge', 'bg-warning', 'text-dark');
            statusSpan.innerText = 'Estoque Baixo';
        } else {
            statusSpan.classList.add('status-critical', 'badge', 'bg-danger');
            statusSpan.innerText = 'Crítico';
        }
    });
}

function inicializarGerente() {
    const btnAddComida = document.getElementById('btnAdicionarComida');
    if (btnAddComida) {
        btnAddComida.addEventListener('click', adicionarComida);
    }
    carregarDados();

    const formEstoque = document.querySelector('form');
    if (formEstoque) {
        formEstoque.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const itemInput = document.querySelector('#item');
            const quantidadeInput = document.querySelector('#quantidade');
            
            if(!itemInput || !quantidadeInput) return;
            
            const novoItem = itemInput.value;
            const novaQuantidade = parseInt(quantidadeInput.value);
            
            const tabela = document.querySelector('tbody');
            const novaLinha = document.createElement('tr');
            
            novaLinha.innerHTML = `
                <td>${novoItem}</td>
                <td>${novaQuantidade} kg</td>
                <td><span></span></td>
                <td><button class="solicitar btn btn-sm btn-info text-white">Solicitar mais</button></td>
            `;
            
            novaLinha.querySelector('.solicitar').addEventListener('click', () => alert('Você solicitou mais desse item!'));
            tabela.appendChild(novaLinha);
            itemInput.value = '';
            quantidadeInput.value = '';
            
            atualizarStatusEstoque();
        });
    }

    const solicitarButtons = document.querySelectorAll('.solicitar');
    solicitarButtons.forEach(button => {
        button.className = "solicitar btn btn-sm btn-info text-white";
        button.addEventListener('click', () => alert('Você solicitou mais desse item!'));
    });

    atualizarStatusEstoque();
}

document.addEventListener("DOMContentLoaded", inicializarGerente);
