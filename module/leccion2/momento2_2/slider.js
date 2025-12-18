export function init() {
    let audios_sld11_espacios = document.querySelectorAll(".card_sld11_espacios audio");

    window.mostrarCard_sld11_espacios = function (letra) {
        // Ocultar todas las cards
        document.querySelectorAll(".card_sld11_espacios").forEach(card => {
            card.style.display = "none";
        });

        // Mostrar la tarjeta seleccionada
        let card = document.getElementById(`card-${letra}_sld11_espacios`);
        if (card) {
            card.style.display = "block"; // Asegura que la tarjeta sea visible
        }

        // Detener cualquier otro audio en reproducción
        audios_sld11_espacios.forEach(audio => {
            if (!audio.paused) {
                audio.pause();
                audio.currentTime = 0;
            }
        });

        // Reproducir el audio de la tarjeta seleccionada
        let audio = document.getElementById(`audio-${letra}_sld11_espacios`);
        if (audio) {
            audio.play();
        }
    };

    // Asegurar que todas las tarjetas estén ocultas inicialmente
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".card_sld11_espacios").forEach(card => {
            card.style.display = "none";
        });
    });
}