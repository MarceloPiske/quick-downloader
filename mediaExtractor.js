export async function extractMediaInfo(url) {
    try {
        // Use axios from the window object
        const response = await window.axios.post('/api/extract', { url });
        
        return {
            title: response.data.title || 'Título não disponível',
            thumbnail: response.data.thumbnail || '',
            qualities: response.data.availableQualities || ['720p', '480p', '360p']
        };
    } catch (error) {
        console.error('Erro na extração de mídia:', error);
        throw error;
    }
}