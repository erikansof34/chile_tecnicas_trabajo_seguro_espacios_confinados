export function init() {
    // Actividad de selección múltiple
    let opcionesSeleccionadas = [];
    const opcionesCorrectas = ['a', 'c', 'd', 'f', 'g'];
    const totalOpciones = 5;
    let actividadCompletada = false;

    function actualizarContador() {
        const contador = document.getElementById('contador-selecciones');
        const faltanSpan = document.getElementById('faltan-opciones');
        const btnValidarContainer = document.querySelector('.btn-validar-container');
        const btnValidar = document.querySelector('.btn-validar-multiple');

        if (opcionesSeleccionadas.length > 0) {
            contador.classList.remove('d-none');
            const faltan = totalOpciones - opcionesSeleccionadas.length;
            faltanSpan.textContent = faltan;

            if (opcionesSeleccionadas.length === totalOpciones) {
                contador.classList.add('d-none');
                btnValidarContainer.classList.remove('d-none');
                btnValidarContainer.classList.add('d-flex');
                btnValidar.disabled = false;
            } else {
                btnValidarContainer.classList.add('d-none');
                btnValidarContainer.classList.remove('d-flex');
                btnValidar.disabled = true;
            }
        } else {
            contador.classList.add('d-none');
            btnValidarContainer.classList.add('d-none');
            btnValidarContainer.classList.remove('d-flex');
            btnValidar.disabled = true;
        }
    }

    function validarRespuestas() {
        if (actividadCompletada || opcionesSeleccionadas.length !== totalOpciones) return;

        const opciones = document.querySelectorAll('.opcion-multiple');
        let correctas = 0;

        opciones.forEach(opcion => {
            const valor = opcion.getAttribute('data-valor');
            const esCorrecta = opcionesCorrectas.includes(valor);
            const estaSeleccionada = opcionesSeleccionadas.includes(valor);

            opcion.style.pointerEvents = 'none';
            opcion.classList.remove('seleccionada');

            // Solo colorear las opciones que fueron seleccionadas
            if (estaSeleccionada) {
                if (esCorrecta) {
                    opcion.classList.add('correcta');
                    correctas++;
                } else {
                    opcion.classList.add('incorrecta');
                }
            }
        });

        const resultado = document.getElementById('resultado-multiple');
        const porcentaje = Math.round((correctas / totalOpciones) * 100);

        if (correctas === totalOpciones) {
            resultado.innerHTML = `
        <div class="alert multi-select-feedback-success">
          <i class="fas fa-check-circle me-2"></i>
          Respuesta(s) correcta(s): ¡Muy bien! Sigue atento a ubicar los espacios confinados en nuestra organización.<br>
          <strong>Tus respuestas correctas son: ${correctas} de ${totalOpciones} (${porcentaje}%)</strong>
        </div>
      `;
        } else {
            resultado.innerHTML = `
        <div class="alert multi-select-feedback-error">
          <i class="fas fa-times-circle me-2"></i>
          Respuesta(s) Incorrecta(s): ¡Piénsalo bien! Trata de pensar en espacios pequeños o confinados.<br>
          <strong>Tus respuestas correctas son: ${correctas} de ${totalOpciones} (${porcentaje}%)</strong>
        </div>
      `;
        }

        resultado.classList.remove('d-none');

        // Mostrar botón reiniciar
        const btnReiniciarContainer = document.querySelector('.btn-reiniciar-container');
        const btnValidarContainer = document.querySelector('.btn-validar-container');
        const btnValidar = document.querySelector('.btn-validar-multiple');
        btnValidarContainer.classList.add('d-none');
        btnValidarContainer.classList.remove('d-flex');
        btnValidar.disabled = true;
        btnReiniciarContainer.classList.add('d-flex');
        btnReiniciarContainer.classList.remove('d-none');

        actividadCompletada = true;
    }

    function reiniciarActividad() {
        opcionesSeleccionadas = [];
        actividadCompletada = false;

        document.querySelectorAll('.opcion-multiple').forEach(opcion => {
            opcion.classList.remove('seleccionada', 'correcta', 'incorrecta');
            opcion.style.pointerEvents = 'auto';
        });

        document.getElementById('contador-selecciones').classList.add('d-none');
        document.getElementById('resultado-multiple').classList.add('d-none');

        // Ocultar ambos botones al reiniciar
        const btnValidarContainer = document.querySelector('.btn-validar-container');
        const btnReiniciarContainer = document.querySelector('.btn-reiniciar-container');
        const btnValidar = document.querySelector('.btn-validar-multiple');

        btnValidarContainer.classList.add('d-none');
        btnValidarContainer.classList.remove('d-flex');
        btnReiniciarContainer.classList.add('d-none');
        btnReiniciarContainer.classList.remove('d-flex');
        btnValidar.disabled = true;
    }

    // Event listeners
    document.getElementById('actividad-container').addEventListener('click', function (event) {
        if (event.target.classList.contains('opcion-multiple') && !actividadCompletada) {
            const valor = event.target.getAttribute('data-valor');

            if (opcionesSeleccionadas.includes(valor)) {
                // Deseleccionar
                opcionesSeleccionadas = opcionesSeleccionadas.filter(v => v !== valor);
                event.target.classList.remove('seleccionada');
            } else if (opcionesSeleccionadas.length < totalOpciones) {
                // Seleccionar
                opcionesSeleccionadas.push(valor);
                event.target.classList.add('seleccionada');
            }

            actualizarContador();
        }

        if ((event.target.classList.contains('btn-validar-multiple') || event.target.closest('.btn-validar-multiple')) && opcionesSeleccionadas.length === totalOpciones) {
            // Ocultar inmediatamente el botón validar
            const btnValidarContainer = document.querySelector('.btn-validar-container');
            btnValidarContainer.classList.add('d-none');
            btnValidarContainer.classList.remove('d-flex');

            // Ejecutar validación después de un pequeño delay
            setTimeout(() => {
                validarRespuestas();
            }, 10);
        }

        if (event.target.classList.contains('btn-reiniciar-multiple') || event.target.closest('.btn-reiniciar-multiple')) {
            reiniciarActividad();
        }
    });
}
