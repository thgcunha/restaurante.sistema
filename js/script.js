import './components.js';
import { getShortDateFormatted, getMonthName } from './utils.js';

function sincronizarData() {
    const dataAtual = getShortDateFormatted(0);
    const dataOntem = getShortDateFormatted(-1);
    const dataAmanha = getShortDateFormatted(1);
    
    const mesNome = getMonthName();

    const dataEl = document.getElementById('data');
    if(dataEl) {
        dataEl.textContent = dataAtual.day;
        document.getElementById('datam').textContent = ` ${dataOntem.day}`;
        document.getElementById('dataM').textContent = ` ${dataAmanha.day}`;
        document.getElementById('mes').textContent = mesNome;
        document.getElementById('diaDaSemanam').textContent = dataOntem.dayOfWeek;
        document.getElementById('diaDaSemana').textContent = dataAtual.dayOfWeek;
        document.getElementById('diaDaSemanaM').textContent = dataAmanha.dayOfWeek;
    }
}

document.addEventListener('DOMContentLoaded', sincronizarData);
