document.addEventListener("DOMContentLoaded", carregarPedidos);

function carregarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem("pedidosCozinheiro")) || [];
    const pedidoContainer = document.getElementById("pedidoCozinheiro");
    
    pedidoContainer.innerHTML = ''; // Limpar conteúdo anterior

    if (pedidos.length > 0) {
        pedidos.forEach(pedido => adicionarPedidoAoContainer(pedido));
    } else {
        pedidoContainer.innerHTML = '<p>Nenhum pedido disponível.</p>'; // Mensagem caso não haja pedidos
    }
}

function adicionarPedidoAoContainer(pedido) {
    const pedidoContainer = document.getElementById("pedidoCozinheiro");
    const pedidoDiv = document.createElement("div");
    pedidoDiv.className = "pedido-item mb-3 p-3 border rounded";

    // Criar conteúdo do pedido
    const itensHTML = pedido.itens.map(item => `
        <div class="row">
            <div class="col">${item.nome}</div>
            <div class="col"> ${item.valor.toFixed(2).replace('.', ',')}</div>
        </div>
    `).join('');

    pedidoDiv.innerHTML = `
    <h5>Pedido ID: ${pedido.id} - Mesa: ${pedido.mesa}</h5>
    <div> ${itensHTML}  </div>
    <button class="finalizar" onclick="finalizarPedido(${pedido.id})">Finalizar Pedido</button>
`;

    
    pedidoContainer.appendChild(pedidoDiv);
}

function finalizarPedido(pedidoId) {
    const pedidos = JSON.parse(localStorage.getItem("pedidosCozinheiro")) || [];
    const pedidosAtualizados = pedidos.filter(pedido => pedido.id !== pedidoId);

    // Atualiza o localStorage
    localStorage.setItem("pedidosCozinheiro", JSON.stringify(pedidosAtualizados));

    carregarPedidos(); // Atualiza a interface após a remoção
}
