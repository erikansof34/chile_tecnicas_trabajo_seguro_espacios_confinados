export function init() {
    loadIframe({
        id: 'Slide1_2Web',
        src: 'https://iframe.mediadelivery.net/embed/426232/eff8e6fc-4799-416f-a1fa-38d377ba5060?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
        className: 'iframe-video-vertical-web',
        style: 'width: 20vw; height: 80vh; min-height: 300px;',
    });

    loadIframe({
        id: 'Slide1_2Mobile',
        src: 'https://iframe.mediadelivery.net/embed/426232/eff8e6fc-4799-416f-a1fa-38d377ba5060?autoplay=false&loop=false&muted=false&preload=true&responsive=true',
        className: 'iframe-video-vertical-mobile',
        style: 'width: 20vw; height: 80vh; min-height: 300px;',
    });


}