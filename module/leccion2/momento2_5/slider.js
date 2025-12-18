export function init() {
    loadIframe({
        id: 'Slide2_5AWeb',
        src: 'https://iframe.mediadelivery.net/embed/426232/b8c8058a-c6d4-474e-902d-a3afc9eb914c?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
        className: 'iframe-video-vertical-web',
        style: 'width: 20vw; height: 80vh; min-height: 300px;',
    });

    loadIframe({
        id: 'Slide2_5AMobile',
        src: 'https://iframe.mediadelivery.net/embed/426232/b8c8058a-c6d4-474e-902d-a3afc9eb914c?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
        className: 'iframe-video-vertical-mobile',
        style: 'width: 20vw; height: 80vh; min-height: 300px;',
    });

    loadIframe({
        id: 'Slide2_5BWeb',
        src: 'https://iframe.mediadelivery.net/embed/426232/598319c1-9dc7-4af9-9253-ff493c45eb95?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
        className: 'iframe-video-vertical-web',
        style: 'width: 20vw; height: 80vh; min-height: 300px;',
    });

    loadIframe({
        id: 'Slide2_5BMobile',
        src: 'https://iframe.mediadelivery.net/embed/426232/598319c1-9dc7-4af9-9253-ff493c45eb95?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
        className: 'iframe-video-vertical-mobile',
        style: 'width: 20vw; height: 80vh; min-height: 300px;',
    });

    // Detener videos cuando se cierran los modales
    document.addEventListener('hidden.bs.modal', function (event) {
        const modalId = event.target.id;
        
        if (modalId === 'modal-entrada') {
            // Detener inmediatamente y luego recargar
            const webContainer = document.getElementById('Slide2_5AWeb');
            const mobileContainer = document.getElementById('Slide2_5AMobile');
            
            if (webContainer) {
                webContainer.innerHTML = '<div class="loader spinner-pulse"></div>';
                setTimeout(() => {
                    loadIframe({
                        id: 'Slide2_5AWeb',
                        src: 'https://iframe.mediadelivery.net/embed/426232/b8c8058a-c6d4-474e-902d-a3afc9eb914c?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
                        className: 'iframe-video-vertical-web',
                        style: 'width: 20vw; height: 80vh; min-height: 300px;',
                    });
                }, 100);
            }
            
            if (mobileContainer) {
                mobileContainer.innerHTML = '<div class="loader spinner-pulse"></div>';
                setTimeout(() => {
                    loadIframe({
                        id: 'Slide2_5AMobile',
                        src: 'https://iframe.mediadelivery.net/embed/426232/b8c8058a-c6d4-474e-902d-a3afc9eb914c?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
                        className: 'iframe-video-vertical-mobile',
                        style: 'width: 20vw; height: 80vh; min-height: 300px;',
                    });
                }, 100);
            }
        }
        
        if (modalId === 'modal-salida') {
            // Detener inmediatamente y luego recargar
            const webContainer = document.getElementById('Slide2_5BWeb');
            const mobileContainer = document.getElementById('Slide2_5BMobile');
            
            if (webContainer) {
                webContainer.innerHTML = '<div class="loader spinner-pulse"></div>';
                setTimeout(() => {
                    loadIframe({
                        id: 'Slide2_5BWeb',
                        src: 'https://iframe.mediadelivery.net/embed/426232/598319c1-9dc7-4af9-9253-ff493c45eb95?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
                        className: 'iframe-video-vertical-web',
                        style: 'width: 20vw; height: 80vh; min-height: 300px;',
                    });
                }, 100);
            }
            
            if (mobileContainer) {
                mobileContainer.innerHTML = '<div class="loader spinner-pulse"></div>';
                setTimeout(() => {
                    loadIframe({
                        id: 'Slide2_5BMobile',
                        src: 'https://iframe.mediadelivery.net/embed/426232/598319c1-9dc7-4af9-9253-ff493c45eb95?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
                        className: 'iframe-video-vertical-mobile',
                        style: 'width: 20vw; height: 80vh; min-height: 300px;',
                    });
                }, 100);
            }
        }
    });
}

