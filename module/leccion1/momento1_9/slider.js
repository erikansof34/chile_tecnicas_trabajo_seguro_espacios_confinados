export function init() {
    window.flipCard_sld9 = function (cardSelector) {
        const card = typeof cardSelector === 'string'
            ? document.querySelector(cardSelector)
            : cardSelector;
        card.classList.toggle('flipped_sld9');
    };
}