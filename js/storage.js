export const StorageService = {
    getData(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch (e) {
            console.error("Error reading localStorage", e);
            return [];
        }
    },
    
    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
        // Dispara um evento customizado caso precise atualizar componentes na mesma janela
        window.dispatchEvent(new CustomEvent('storage_updated', { detail: { key } }));
    },
    
    addItem(key, item) {
        const data = this.getData(key);
        data.push(item);
        this.saveData(key, data);
    },
    
    removeItem(key, predicate) {
        let data = this.getData(key);
        const originalLength = data.length;
        data = data.filter(item => !predicate(item));
        if (data.length !== originalLength) {
            this.saveData(key, data);
        }
    },

    updateItem(key, predicate, updatedItem) {
        let data = this.getData(key);
        const index = data.findIndex(predicate);
        if (index !== -1) {
            data[index] = { ...data[index], ...updatedItem };
            this.saveData(key, data);
        }
    }
};
