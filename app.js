import { validateURL } from './utils.js';
import { extractMediaInfo } from './mediaExtractor.js';
import { downloadMedia } from './downloadManager.js';

class QuickDownloader {
    constructor() {
        this.mediaInfo = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const urlInput = document.getElementById('urlInput');
        const fetchButton = document.getElementById('fetchButton');
        const downloadButton = document.getElementById('downloadButton');
        const resultSection = document.getElementById('resultSection');

        // Configure Axios to use the current origin
        window.axios.defaults.baseURL = window.location.origin;

        fetchButton.addEventListener('click', async () => {
            const url = urlInput.value.trim();
            
            if (!validateURL(url)) {
                this.showAlert('URL inválida. Por favor, insira uma URL de plataforma suportada.');
                return;
            }

            try {
                this.mediaInfo = await extractMediaInfo(url);
                this.displayMediaInfo(this.mediaInfo);
                resultSection.classList.remove('hidden');
            } catch (error) {
                console.error('Erro ao buscar informações de mídia:', error);
                this.showAlert('Não foi possível processar a URL. Verifique a URL e tente novamente.');
            }
        });

        downloadButton.addEventListener('click', async () => {
            if (!this.mediaInfo) {
                this.showAlert('Por favor, primeiro busque uma URL válida.');
                return;
            }

            const qualitySelect = document.getElementById('qualitySelect');
            const formatSelect = document.getElementById('formatSelect');

            const downloadOptions = {
                url: urlInput.value.trim(),
                quality: qualitySelect.value,
                format: formatSelect.value
            };

            try {
                await downloadMedia(downloadOptions);
            } catch (error) {
                console.error('Erro no download:', error);
                this.showAlert('Falha no download. Tente novamente.');
            }
        });
    }

    showAlert(message) {
        // Create a more user-friendly alert
        const alertContainer = document.createElement('div');
        alertContainer.classList.add('alert');
        alertContainer.textContent = message;
        
        document.body.appendChild(alertContainer);
        
        setTimeout(() => {
            alertContainer.remove();
        }, 3000);
    }

    displayMediaInfo(mediaInfo) {
        const thumbnailImage = document.getElementById('thumbnailImage');
        const mediaTitle = document.getElementById('mediaTitle');
        const qualitySelect = document.getElementById('qualitySelect');

        thumbnailImage.src = mediaInfo.thumbnail;
        mediaTitle.textContent = mediaInfo.title;

        // Populate quality options
        qualitySelect.innerHTML = mediaInfo.qualities
            .map(quality => `<option value="${quality}">${quality}</option>`)
            .join('');
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    new QuickDownloader();
});