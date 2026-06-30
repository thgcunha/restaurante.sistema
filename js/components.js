class LabelezzaHeader extends HTMLElement {
    connectedCallback() {
        if (!document.getElementById('bootstrap-icons')) {
            const link = document.createElement('link');
            link.id = 'bootstrap-icons';
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
            document.head.appendChild(link);
        }

        const title = this.getAttribute('title') || 'La Belezza';
        const subtitle = this.getAttribute('subtitle') || '';
        
        let subtitleHtml = '';
        if (subtitle) {
            subtitleHtml = `<br><hr id="hr1">${subtitle}`;
        }

        this.innerHTML = `
            <header id="${subtitle ? 'cab2' : 'cab'}">
                <h1>
                    ${title}
                    ${subtitleHtml}
                </h1>
            </header>
        `;
    }
}

class LabelezzaFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer>
                <p>© ${new Date().getFullYear()} La Belezza - Desenvolvido por Thiago Gonçalves Cunha</p>
            </footer>
        `;
    }
}

// Define os Web Components para uso no HTML
customElements.define('labelezza-header', LabelezzaHeader);
customElements.define('labelezza-footer', LabelezzaFooter);
