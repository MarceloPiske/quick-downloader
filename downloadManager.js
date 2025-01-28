export async function downloadMedia(options) {
    try {
        // Use axios from the window object
        const response = await window.axios.post('/api/download', options, {
            responseType: 'blob'
        });

        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        
        // Generate a more meaningful filename
        const suggestedFilename = `downloaded_media_${options.quality}.${options.format}`;
        a.download = suggestedFilename;
        
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erro no download:', error);
        throw error;
    }
}