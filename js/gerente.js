// Variáveis globais
let total = 0; // Armazena o total do pedido
let itensPedido = []; // Armazena os itens do pedido

// Carrega os dados ao carregar a página
document.addEventListener("DOMContentLoaded", carregarDados);

// Função para carregar dados salvos no localStorage
function carregarDados() {
    const tipos = ["comidas", "bebidas", "sobremesas"];
    tipos.forEach(tipo => {
        const dados = JSON.parse(localStorage.getItem(tipo)) || [];
        dados.forEach(item => {
            const valorNumerico = parseFloat(item.valor).toFixed(2).replace(".", ",");
            adicionarItemTabela(tipo, item.nome, valorNumerico);
        });
    });
}

document.addEventListener("DOMContentLoaded", carregarDados);


// Função para adicionar uma nova comida
function adicionarComida() {
    const nome = document.getElementById("nomecomida").value.trim();
    const valor = document.getElementById("valorcomida").value.trim();
    const tipo = document.getElementById("tipodecomida").value;

    if (nome && valor && tipo) {
        adicionarItemTabela(tipo, nome, valor);
        salvarDados(tipo, nome, valor);
        limparFormulario();
    } else {
        alert("Preencha todos os campos antes de adicionar.");
    }
}

// Função para adicionar um item à tabela
function adicionarItemTabela(tipo, nome, valor) {
    const tbody = document.getElementById(tipo);
    const row = document.createElement("tr");
    const valorFormatado = `R$ ${parseFloat(valor).toFixed(2).replace('.', ',')}`; // Formata o valor como R$ com 2 casas decimais
    row.innerHTML = `
        <td>${nome}</td>
        <td>${valorFormatado}</td>
        <td>
            <button class="botao-editar" onclick="editarItem(this)">Editar</button>
            <button class="botao-excluir" onclick="excluirItem(this)">Excluir</button>
        </td>
    `;
    tbody.appendChild(row);
}

// Função para salvar dados no localStorage
function salvarDados(tipo, nome, valor) {
    const dados = JSON.parse(localStorage.getItem(tipo)) || [];
    const valorFormatado = parseFloat(valor).toFixed(2);
    dados.push({ nome, valor: valorFormatado });
    localStorage.setItem(tipo, JSON.stringify(dados));
}


// Função para editar um item da tabela
function editarItem(button) {
    const row = button.parentElement.parentElement;
    const nome = row.children[0].innerText;
    const valor = row.children[1].innerText;
    const tipo = row.parentElement.id;

    // Preenche o formulário com os dados do item selecionado
    document.getElementById("nomecomida").value = nome;
    document.getElementById("valorcomida").value = valor;
    document.getElementById("tipodecomida").value = tipo;

    // Exclui o item da tabela e do localStorage para evitar duplicidade
    excluirItem(button);
}

// Função para excluir um item da tabela
function excluirItem(button) {
    const row = button.parentElement.parentElement;
    const tipo = row.parentElement.id;
    const nome = row.children[0].innerText;
    const valor = row.children[1].innerText;

    row.remove(); // Remove a linha da tabela
    removerDados(tipo, nome, valor); // Remove do localStorage
}

// Função para remover dados do localStorage
function removerDados(tipo, nome, valor) {
    const dados = JSON.parse(localStorage.getItem(tipo)) || [];
    const valorNumerico = parseFloat(valor.replace("R$ ", "").replace(",", "."));
    const novosDados = dados.filter(item => !(item.nome === nome && parseFloat(item.valor) === valorNumerico));
    localStorage.setItem(tipo, JSON.stringify(novosDados));
}


// Função para limpar o formulário
function limparFormulario() {
    document.getElementById("nomecomida").value = '';
    document.getElementById("valorcomida").value = '';
    
}


    // Estoques
    
    document.addEventListener("DOMContentLoaded", function() {
        // Função para atualizar o status do estoque com base na quantidade
        function atualizarStatus() {
            const statusElements = document.querySelectorAll('.status-ok, .status-low, .status-critical');
            
            // Loop para atualizar o status baseado na quantidade
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const quantidade = parseInt(row.cells[1].innerText);
                const statusSpan = row.querySelector('span');
                
                if (quantidade > 20) {
                    statusSpan.classList.remove('status-low', 'status-critical');
                    statusSpan.classList.add('status-ok');
                    statusSpan.innerText = 'Estoque OK';
                } else if (quantidade > 5) {
                    statusSpan.classList.remove('status-ok', 'status-critical');
                    statusSpan.classList.add('status-low');
                    statusSpan.innerText = 'Estoque Baixo';
                } else {
                    statusSpan.classList.remove('status-ok', 'status-low');
                    statusSpan.classList.add('status-critical');
                    statusSpan.innerText = 'Crítico';
                }
            });
        }

        // Função para adicionar item novo ao estoque
        const form = document.querySelector('form');
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita o envio do formulário
            
            const itemInput = document.querySelector('#item');
            const quantidadeInput = document.querySelector('#quantidade');
            
            const novoItem = itemInput.value;
            const novaQuantidade = parseInt(quantidadeInput.value);
            
            // Criação de uma nova linha na tabela
            const tabela = document.querySelector('tbody');
            const novaLinha = document.createElement('tr');
            
            novaLinha.innerHTML = `
                <td>${novoItem}</td>
                <td>${novaQuantidade} kg</td>
                <td><span class="status-ok">Estoque OK</span></td>
                <td><button class="solicitar">Solicitar mais</button></td>
            `;
            
            tabela.appendChild(novaLinha);
            itemInput.value = '';
            quantidadeInput.value = '';
            
            // Atualiza o status de estoque após adicionar o item
            atualizarStatus();
        });

        // Adicionar evento de clique nos botões de "Solicitar mais"
        const solicitarButtons = document.querySelectorAll('.solicitar');
        solicitarButtons.forEach(button => {
            button.addEventListener('click', function() {
                alert('Você solicitou mais desse item!');
            });
        });

        // Chama a função para atualizar o status quando a página for carregada
        atualizarStatus();
    });


