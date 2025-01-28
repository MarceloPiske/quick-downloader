export async function downloadMedia(options) {
    try {
        const response = await fetch('https://n3h0ab5vbqes0qz583z8.c.websim.ai/api/extract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(options)
        });

        if (!response.ok) {
            throw new Error('Falha no download');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `downloaded_media.${options.format}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Erro no download:', error);
        throw error;
    }
}