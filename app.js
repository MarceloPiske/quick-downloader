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

        fetchButton.addEventListener('click', async () => {
            const url = urlInput.value.trim();
            
            if (!validateURL(url)) {
                alert('URL inválida. Por favor, insira uma URL de plataforma suportada.');
                return;
            }

            try {
                this.mediaInfo = await extractMediaInfo(url);
                this.displayMediaInfo(this.mediaInfo);
                resultSection.classList.remove('hidden');
            } catch (error) {
                console.error('Erro ao buscar informações de mídia:', error);
                alert('Não foi possível processar a URL. Verifique a URL e tente novamente.');
            }
        });

        downloadButton.addEventListener('click', async () => {
            if (!this.mediaInfo) {
                alert('Por favor, primeiro busque uma URL válida.');
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
                alert('Falha no download. Tente novamente.');
            }
        });
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