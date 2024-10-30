// Função para obter e formatar a data atual
function sincronizarData() {
    const dataAtual = new Date();

    // dia/mês/ano
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = dataAtual.getMonth() + 1;
    const ano = dataAtual.getFullYear();

    // Obter o dia da semana
    const diasDaSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const diaDaSemana = diasDaSemana[dataAtual.getDay()]; // Dia da semana atual

    // Monta a string da data formatada
    const dataFormatada = `${dia}`;
    let nomeMes;

    // Exibe a data na página
    switch (mes) {
        case 1:
            nomeMes = "Janeiro";
            break;
        case 2:
            nomeMes = "Fevereiro";
            break;
        case 3:
            nomeMes = "Março";
            break;
        case 4:
            nomeMes = "Abril";
            break;
        case 5:
            nomeMes = "Maio";
            break;
        case 6:
            nomeMes = "Junho";
            break;
        case 7:
            nomeMes = "Julho";
            break;
        case 8:
            nomeMes = "Agosto";
            break;
        case 9:
            nomeMes = "Setembro";
            break;
        case 10:
            nomeMes = "Outubro";
            break;
        case 11:
            nomeMes = "Novembro";
            break;
        case 12:
            nomeMes = "Dezembro";
            break;
        default:
            nomeMes = "Mês inválido";
    }

    // Calcular ontem e amanhã
    const diaOntemData = new Date(dataAtual);
    diaOntemData.setDate(dataAtual.getDate() - 1); // Ontem
    const diaOntem = String(diaOntemData.getDate()).padStart(2, '0');
    const diaDaSemanaOntem = diasDaSemana[diaOntemData.getDay()];

    const diaAmanhaData = new Date(dataAtual);
    diaAmanhaData.setDate(dataAtual.getDate() + 1); // Amanhã
    const diaAmanha = String(diaAmanhaData.getDate()).padStart(2, '0');
    const diaDaSemanaAmanha = diasDaSemana[diaAmanhaData.getDay()];

    // Atualiza o HTML
    document.getElementById('data').textContent = dataFormatada;
    document.getElementById('datam').textContent = ` ${diaOntem}`
    document.getElementById('dataM').textContent = ` ${diaAmanha}`
    document.getElementById('mes').textContent = nomeMes;
    document.getElementById('diaDaSemanam').textContent = diaDaSemanaOntem;
    document.getElementById('diaDaSemana').textContent = diaDaSemana;
    document.getElementById('diaDaSemanaM').textContent = diaDaSemanaAmanha;
}
// Chama a função quando a página carregar
window.onload = sincronizarData;







