export function formatCurrency(value) {
    const numValue = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numValue || 0);
}

export function parseCurrency(valueStr) {
    if (!valueStr) return 0;
    let cleanStr = valueStr.replace(/[R$\s]/g, '').replace('.', '').replace(',', '.');
    return parseFloat(cleanStr) || 0;
}

export function getCurrentDateFormatted() {
    return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date());
}

export function getShortDateFormatted(offsetDays = 0) {
    const date = new Date();
    date.setDate(date.getDate() + offsetDays);
    const day = String(date.getDate()).padStart(2, '0');
    // uppercase first letter
    let dayOfWeek = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' }).format(date);
    dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    return { day, dayOfWeek };
}

export function getMonthName() {
    let month = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(new Date());
    return month.charAt(0).toUpperCase() + month.slice(1);
}
