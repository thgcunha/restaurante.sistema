function liberar() {
    let htmlContent = ''; // Inicializa uma string para armazenar o conteúdo HTML

    for (let i = 1; i <= 25; i++) {
        const mesa = document.getElementById(`mesa${i}`); // Captura cada mesa pelo ID
        const mesaEstado = localStorage.getItem(`mesa${i}`); // Recupera o estado da mesa

        if (mesa && mesaEstado === 'disabled') {
            htmlContent += `<p class="paragrafo-mesas">Mesa ${i} <button class="lib1" onclick="lib(${i})">Liberar</button></p>`;
        }
    }

    if (htmlContent) {
        document.getElementById("mesasusadas").innerHTML = htmlContent; // Atualiza o conteúdo da div
    } else {
        alert('Nenhuma mesa desativada encontrada.');
    }
}

function voltar() {
    document.getElementById("telarecepcao").style.display = "none";
    document.getElementById("telaprincipal").style.display = "block";
}

function mesa(num) {
    const cliente = prompt('Digite o seu CPF');
    if (cliente !== null) {
        localStorage.setItem('cliente', cliente);
        alert('Cliente registrado: ' + cliente + ' na mesa ' + num);
        const mesabt = document.getElementById("mesa" + num);
        mesabt.disabled = true;
        mesabt.classList.add('disabled');
        localStorage.setItem(`mesa${num}`, 'disabled'); // Salva o estado da mesa como desativada
    } else {
        alert('Entrada cancelada.');
    }
}

function lib(num) {
    const mesa = document.getElementById('mesa' + num);
    
    // Verifica se a classe 'disabled' está presente
    if (mesa.classList.contains('disabled')) {
        mesa.classList.remove('disabled'); // Remove a classe 'disabled'
        alert('Mesa ' + num + ' liberada!');
        mesa.disabled = false;
        localStorage.removeItem(`mesa${num}`); // Remove o estado da mesa
    } else {
        alert('A mesa não possui a classe "disabled".');
    }
    document.getElementById("mesasusadas").innerText = "";
}

// Função para carregar o estado das mesas ao iniciar
function carregarEstadoMesas() {
    for (let i = 1; i <= 25; i++) {
        const mesa = document.getElementById(`mesa${i}`);
        const mesaEstado = localStorage.getItem(`mesa${i}`); // Recupera o estado da mesa

        if (mesaEstado === 'disabled') {
            mesa.classList.add('disabled'); // Adiciona a classe 'disabled'
            mesa.disabled = true; // Desabilita a mesa
        }
    }
}

// Chame a função ao carregar a página
window.onload = carregarEstadoMesas;
