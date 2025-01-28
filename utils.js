export function validateURL(url) {
    const supportedPlatforms = [
        'youtube.com',
        'youtu.be',
        'vimeo.com',
        'soundcloud.com'
    ];

    try {
        const parsedURL = new URL(url);
        return supportedPlatforms.some(platform => 
            parsedURL.hostname.includes(platform)
        );
    } catch {
        return false;
    }
}