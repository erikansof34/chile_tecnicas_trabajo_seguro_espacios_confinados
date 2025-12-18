export function init() {
  // Actividad Si/No con descubrimiento de imagen
  let preguntaActual = 1;
  let respuestasUsuario = {};
  let resultados = {};
  let quizCompletado = false;
  const totalPreguntas = 3;
  const respuestasCorrectas = {"1": false, "2": true, "3": true};
  const imagenes = [
    "./momento1_5/img/pieza_1_espacios_confinados.webp",
    "./momento1_5/img/pieza_2_espacios_confinados.webp", 
    "./momento1_5/img/pieza_3_espacios_confinados.webp"
  ];

  function mostrarImagenSeccion(numeroPregunta, esCorrecta) {
    const section = document.getElementById(`section-${numeroPregunta - 1}`);
    
    if (esCorrecta) {
      section.innerHTML = `
        <div class="image-wrapper">
          <img src="${imagenes[numeroPregunta - 1]}" alt="Imagen ${numeroPregunta}" class="section-image">
          <img src="../../assets/img/botones/checkAct.png" alt="Correcto" class="check-icon">
        </div>
      `;
    } else {
      section.innerHTML = `
        <div class="error-section">
          <img src="../../assets/img/botones/xmarkAct.png" alt="Incorrecto" class="error-icon">
          <p class="error-text">No seleccionaste bien la pregunta, no puedes ver la imagen.</p>
        </div>
      `;
    }
  }

  function actualizarImagenContainer() {
    const discoverMessage = document.getElementById('discover-message');
    const imageSections = document.getElementById('image-sections');
    const fullImageContainer = document.getElementById('full-image-container');
    const imageContainer = document.getElementById('image-container');
    
    const preguntasRespondidas = Object.keys(resultados).length;
    
    if (preguntasRespondidas > 0) {
      discoverMessage.classList.add('d-none');
      imageSections.classList.remove('d-none');
    }
    
    if (quizCompletado) {
      const todasCorrectas = Object.values(resultados).every(r => r === true);
      if (todasCorrectas) {
        imageSections.classList.add('d-none');
        fullImageContainer.classList.remove('d-none');
        imageContainer.classList.add('success');
      } else {
        imageContainer.classList.add('error');
      }
    }
  }

  function validarPregunta(numeroPregunta) {
    const preguntaElement = document.querySelector(`[data-pregunta="${numeroPregunta}"]`);
    const opcionSeleccionada = preguntaElement.querySelector('.opcion-respuesta.seleccionada_alertas');
    const mensajeError = document.getElementById(`mensaje_error_${numeroPregunta}`);
    const resultadoAlertas = document.getElementById(`resultado_alertas_${numeroPregunta}`);
    const btnValidar = preguntaElement.querySelector('.btn-validar');
    const btnSiguienteContainer = preguntaElement.querySelector('.btn-siguiente-container');

    if (!opcionSeleccionada) {
      mensajeError.classList.remove('d-none');
      mensajeError.innerHTML = '<div class="alert multi-select-feedback-warning"><i class="fas fa-info-circle me-2"></i>Debes seleccionar una opción antes de validar.</div>';
      resultadoAlertas.classList.add('d-none');
      return;
    }

    mensajeError.classList.add('d-none');
    const respuestaUsuario = opcionSeleccionada.getAttribute('data-valor') === 'true';
    respuestasUsuario[numeroPregunta] = respuestaUsuario;
    const esCorrecta = respuestasUsuario[numeroPregunta] === respuestasCorrectas[numeroPregunta];
    resultados[numeroPregunta] = esCorrecta;

    preguntaElement.querySelectorAll('.opcion-respuesta').forEach((opcion) => {
      opcion.style.pointerEvents = 'none';
      opcion.classList.remove('act');
    });

    if (esCorrecta) {
      opcionSeleccionada.classList.add('true');
    } else {
      opcionSeleccionada.classList.add('false');
    }

    // Mostrar imagen de la sección
    mostrarImagenSeccion(numeroPregunta, esCorrecta);
    actualizarImagenContainer();

    if (btnValidar) btnValidar.classList.add('d-none');

    if (numeroPregunta === totalPreguntas) {
      mostrarResumenFinal();
    } else {
      if (esCorrecta) {
        resultadoAlertas.innerHTML = '<div class="alert multi-select-feedback-success"><i class="fas fa-check-circle me-2"></i>¡Correcto! Tu respuesta es acertada.</div>';
      } else {
        resultadoAlertas.innerHTML = '<div class="alert multi-select-feedback-error"><i class="fas fa-times-circle me-2"></i>Incorrecto. La opción seleccionada no es la correcta.</div>';
      }
      resultadoAlertas.classList.remove('d-none');

      if (btnSiguienteContainer) {
        btnSiguienteContainer.classList.remove('d-none');
        const btnSiguiente = btnSiguienteContainer.querySelector('button');
        if (btnSiguiente) btnSiguiente.classList.remove('d-none');
      }
    }
  }

  function mostrarPregunta(numeroPregunta) {
    document.querySelectorAll('.preguntas-sino').forEach((pregunta) => pregunta.classList.add('d-none'));
    const preguntaElement = document.querySelector(`[data-pregunta="${numeroPregunta}"]`);
    if (preguntaElement) {
      preguntaElement.classList.remove('d-none');
    }
  }

  function mostrarResumenFinal() {
    document.querySelectorAll('.preguntas-sino').forEach((pregunta) => pregunta.classList.add('d-none'));
    
    const respuestasCorrectas_count = Object.values(resultados).filter((resultado) => resultado === true).length;
    const porcentaje = Math.round((respuestasCorrectas_count / totalPreguntas) * 100);
    
    const correctas = [];
    const incorrectas = [];
    
    for (let i = 1; i <= totalPreguntas; i++) {
      if (resultados[i]) {
        correctas.push(i);
      } else {
        incorrectas.push(i);
      }
    }
    
    let resumenHTML = '';
    if (correctas.length > 0) {
      resumenHTML += `<div class="preguntas-correctas mb-2">
        <i class="fas fa-check-circle me-2"></i>Preguntas respondidas correctamente: ${correctas.map(p => `Pregunta ${p}`).join(', ')}
      </div>`;
    }
    if (incorrectas.length > 0) {
      resumenHTML += `<div class="preguntas-incorrectas mb-2">
        <i class="fas fa-times-circle me-2"></i>Preguntas respondidas incorrectamente: ${incorrectas.map(p => `Pregunta ${p}`).join(', ')}
      </div>`;
    }
    
    document.getElementById('resumen-preguntas').innerHTML = resumenHTML;
    
    let feedbackClass, feedbackText;
    if (respuestasCorrectas_count === totalPreguntas) {
      feedbackClass = 'multi-select-feedback-success';
      feedbackText = '¡Muy bien! ¡¡Has contestado correctamente las 3 preguntas clave, SI ES UN ESPACIO CONFINADO!!';
    } else {
      feedbackClass = 'multi-select-feedback-error';
      feedbackText = '¡Piénsalo bien! Deben cumplirse estas 3 condiciones para que se trate de un ESPACIO CONFINADO';
    }
    
    document.getElementById('feedback-final').innerHTML = `
      <div class="${feedbackClass}">
        ${feedbackText}<br>
        <strong>Tus respuestas correctas son: ${respuestasCorrectas_count} de ${totalPreguntas} (${porcentaje}%)</strong>
      </div>
    `;
    
    document.getElementById('resultado-final-sino').classList.remove('d-none');
    quizCompletado = true;
    actualizarImagenContainer();
  }

  function reiniciarActividad() {
    preguntaActual = 1;
    respuestasUsuario = {};
    resultados = {};
    quizCompletado = false;
    
    document.querySelectorAll('.opcion-respuesta').forEach((opcion) => {
      opcion.classList.remove('seleccionada_alertas', 'act', 'true', 'false');
      opcion.style.pointerEvents = 'auto';
    });
    
    document.querySelectorAll('[id^="mensaje_error_"]').forEach((elemento) => elemento.classList.add('d-none'));
    document.querySelectorAll('[id^="resultado_alertas_"]').forEach((elemento) => elemento.classList.add('d-none'));
    
    // Ocultar todos los botones correctamente
    document.querySelectorAll('.btn-validar').forEach((btn) => btn.classList.add('d-none'));
    document.querySelectorAll('.btn-siguiente-container').forEach((container) => {
      container.classList.add('d-none');
      const btnSiguiente = container.querySelector('button');
      if (btnSiguiente) btnSiguiente.classList.add('d-none');
    });
    
    document.getElementById('resultado-final-sino').classList.add('d-none');
    
    // Resetear imágenes
    document.getElementById('discover-message').classList.remove('d-none');
    document.getElementById('image-sections').classList.add('d-none');
    document.getElementById('full-image-container').classList.add('d-none');
    document.getElementById('image-container').classList.remove('success', 'error');
    
    for (let i = 0; i < 3; i++) {
      document.getElementById(`section-${i}`).innerHTML = '';
    }
    
    mostrarPregunta(1);
  }

  // Event listeners
  document.getElementById('preguntas-sino-container').addEventListener('click', function (event) {
    if (event.target.classList.contains('opcion-respuesta')) {
      const preguntaContainer = event.target.closest('.preguntas-sino');
      const opciones = preguntaContainer.querySelectorAll('.opcion-respuesta');
      opciones.forEach((opt) => opt.classList.remove('seleccionada_alertas', 'act'));
      event.target.classList.add('seleccionada_alertas', 'act');
      
      // Mostrar botón validar
      const btnValidar = preguntaContainer.querySelector('.btn-validar');
      if (btnValidar) btnValidar.classList.remove('d-none');
    }
    
    if (event.target.classList.contains('btn-validar') || event.target.closest('.btn-validar')) {
      const btn = event.target.classList.contains('btn-validar') ? event.target : event.target.closest('.btn-validar');
      const numeroPregunta = parseInt(btn.getAttribute('data-pregunta'));
      validarPregunta(numeroPregunta);
    }
    
    if (event.target.hasAttribute('data-siguiente') || event.target.closest('[data-siguiente]')) {
      const btn = event.target.hasAttribute('data-siguiente') ? event.target : event.target.closest('[data-siguiente]');
      const siguientePregunta = parseInt(btn.getAttribute('data-siguiente'));
      preguntaActual = siguientePregunta;
      mostrarPregunta(siguientePregunta);
    }
    
    if (event.target.classList.contains('btn-reiniciar-sino') || event.target.closest('.btn-reiniciar-sino')) {
      reiniciarActividad();
    }
  });

  // Inicializar
  mostrarPregunta(1);
}