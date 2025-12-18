export function init() {
  document.addEventListener('DOMContentLoaded', function () {
    // Seleccionamos solo los audios con la clase nueva
    const audios = document.querySelectorAll('.audio-card-effect');

    audios.forEach(audio => {
      // Subimos hasta la card padre (ajusta según tu estructura HTML)
      const card = audio.closest('.card_agentel2');

      // Si no hay card, salimos (evita errores)
      if (!card) return;

      // Al reproducir: activamos la card
      audio.addEventListener('play', () => {
        card.classList.add('active');
      });

      // Al pausar o terminar: desactivamos la card
      audio.addEventListener('pause', () => {
        card.classList.remove('active');
      });

      audio.addEventListener('ended', () => {
        card.classList.remove('active');
      });
    });
  });
}