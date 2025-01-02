document.addEventListener("DOMContentLoaded", carregarDados);

function carregarDados() {
    const tipos = ["comidas", "bebidas", "sobremesas"];
    tipos.forEach(tipo => {
        const dados = JSON.parse(localStorage.getItem(tipo)) || [];
        dados.forEach(item => adicionarItemTabela(tipo, item.nome, item.valor));
    });
}

function adicionarItemTabela(tipo, nome, valor) {
    const tbody = document.getElementById(tipo);
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${nome}</td>
        <td>${valor}</td>
        <td>
            <button class="adicionarpedido" onclick="adicionarAoPedido('${nome}', ${valor}, '${tipo}')">Adicionar ao Pedido</button>
        </td>
    `;
    tbody.appendChild(row);
}

let total = 0;
let itensPedido = [];

function adicionarAoPedido(nome, valor, tipo) {
    total += valor; // Adiciona o valor ao total

    // Adiciona o item ao pedido com o tipo
    itensPedido.push({ nome, valor, tipo });

    atualizarTotal(); // Atualiza a exibição do total
    exibirItensPedido(); // Exibe os itens adicionados ao pedido
}

function atualizarTotal() {
    document.querySelector("#totalDisplay").innerHTML = total.toFixed(2).replace('.', ',');
}

function exibirItensPedido() {
    const container = document.getElementById("telo");
    container.innerHTML = ''; // Limpa o conteúdo anterior

    itensPedido.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = `row ${item.tipo}`; // Adiciona a classe com o tipo (comida, bebida ou sobremesa)
        itemDiv.innerHTML = `
            <div class="col">
                <span class="icon">${getIcon(item.tipo)}</span> <!-- Ícone do tipo -->
                ${item.nome}
            </div>
            <div class="col">${item.valor.toFixed(2).replace('.', ',')}</div>
        `;
        container.appendChild(itemDiv);
    });
}

// Função para retornar o ícone baseado no tipo
function getIcon(tipo) {
    switch(tipo) {
        case 'comidas':
            return "🍽️"; // Ícone de comida
        case 'bebidas':
            return "🍹"; // Ícone de bebida
        case 'sobremesas':
            return "🍰"; // Ícone de sobremesa
        default:
            return ; // Ícone padrão
    }
}


function finalizarPedidoGarcom() {
    if (itensPedido.length === 0) {
        alert("Não há itens no pedido!");
        return;
    }

    const mesa = document.getElementById("mesa").value; // Captura o número da mesa
    if (!mesa) {
        alert("Por favor, informe o número da mesa!");
        return;
    }

    const pedidoId = Date.now(); // Usar timestamp como ID único
    const pedidoCompleto = {
        id: pedidoId,
        mesa: mesa, // Adiciona o número da mesa
        itens: itensPedido,
        total: total
    };

    const pedidosExistentes = JSON.parse(localStorage.getItem("pedidosCozinheiro")) || [];
    pedidosExistentes.push(pedidoCompleto);
    localStorage.setItem("pedidosCozinheiro", JSON.stringify(pedidosExistentes));


    


    // Limpar o pedido do garçom
    itensPedido = [];
    total = 0;
    atualizarTotal();
    exibirItensPedido();
    document.getElementById("mesa").value = ''; // Limpa o campo da mesa

    alert("Pedido finalizado e enviado para a cozinha!");
}


