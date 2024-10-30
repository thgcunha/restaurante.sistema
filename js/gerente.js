let total = 0; // Variável para armazenar o total do pedido
let itensPedido = []; // Array para armazenar os itens do pedido


document.addEventListener("DOMContentLoaded", carregarDados);

        function carregarDados() {
            const tipos = ["comidas", "bebidas", "sobremesas"];
            tipos.forEach(tipo => {
                const dados = JSON.parse(localStorage.getItem(tipo)) || [];
                dados.forEach(item => adicionarItemTabela(tipo, item.nome, item.valor));
            });
        }

        function adicionarComida() {
            const nome = document.getElementById("nomecomida").value.trim();
            const valor = document.getElementById("valorcomida").value.trim();
            const tipo = document.getElementById("tipodecomida").value;

            if (nome && valor) {
                adicionarItemTabela(tipo, nome, valor);
                salvarDados(tipo, nome, valor);
                document.getElementById("nomecomida").value = '';
                document.getElementById("valorcomida").value = '';
            }
        }

        function adicionarItemTabela(tipo, nome, valor) {
            const tbody = document.getElementById(tipo);
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${nome}</td>
                <td>${valor}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarItem(this)">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="excluirItem(this)">Excluir</button>
                </td>
            `;
            tbody.appendChild(row);
        }

        function salvarDados(tipo, nome, valor) {
            const dados = JSON.parse(localStorage.getItem(tipo)) || [];
            dados.push({ nome, valor });
            localStorage.setItem(tipo, JSON.stringify(dados));
        }

        function editarItem(button) {
            const row = button.parentElement.parentElement;
            const nome = row.children[0].innerText;
            const valor = row.children[1].innerText;
            const tipo = row.parentElement.id;

            document.getElementById("nomecomida").value = nome;
            document.getElementById("valorcomida").value = valor;
            document.getElementById("tipodecomida").value = tipo;

            excluirItem(button);
        }

        function excluirItem(button) {
            const row = button.parentElement.parentElement;
            const tipo = row.parentElement.id;
            const nome = row.children[0].innerText;
            const valor = row.children[1].innerText;

            row.remove();
            removerDados(tipo, nome, valor);
        }

        function removerDados(tipo, nome, valor) {
            const dados = JSON.parse(localStorage.getItem(tipo)) || [];
            const novosDados = dados.filter(item => !(item.nome === nome && item.valor === valor));
            localStorage.setItem(tipo, JSON.stringify(novosDados));
        }