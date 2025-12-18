export function init() {

  //--codigo dentro de la funcion init---//

  // Actividad Select
  const items = [{ "texto": "Se debe obtener un permiso de trabajo.", "categoria": "A la entrada..." }, { "texto": "Evacuar en caso de cambios en las condiciones atmosféricas.", "categoria": "A la salida..." }, { "texto": "Contar con un plan de salida siempre.", "categoria": "A la entrada..." }, { "texto": "Realizar una medición de los niveles de oxígeno.", "categoria": "A la entrada..." }, { "texto": "Todo el personal debe contar con los EPP adecuados.", "categoria": "A la entrada..." }, { "texto": "Verificar el estado del espacio confinado después de la operación.", "categoria": "A la salida..." }];
  const categorias = ["A la entrada...", "A la salida..."];
  let currentIndex = 0;
  let correctAnswers = 0;
  const draggableText = document.getElementById('draggableText');
  const feedback = document.getElementById('feedback');
  const progress = document.getElementById('progress');
  const correctCount = document.getElementById('correctCount');
  const resetBtn = document.getElementById('resetBtn');

  function showNextText() {
    if (currentIndex < items.length) {
      const current = items[currentIndex];
      draggableText.innerHTML = current.texto;
      draggableText.style.display = 'block';
      document.querySelectorAll('.category-btn').forEach(btn => btn.disabled = false);
    } else {
      draggableText.style.display = 'none';
      document.querySelectorAll('.category-btn').forEach(btn => btn.disabled = true);
      showFinalMessage();
    }
    updateProgress();
  }

  function updateProgress() {
    if (currentIndex < items.length) {
      progress.textContent = `${currentIndex + 1}/${items.length}`;
    } else {
      progress.textContent = `${items.length}/${items.length}`;
    }
    correctCount.textContent = correctAnswers;
  }

  function showFeedback(isCorrect) {
    feedback.className = `alert ${isCorrect ? 'alert-success' : 'alert-danger'} mb-3`;
    feedback.textContent = isCorrect ? '¡Correcto!' : 'Incorrecto.';
    feedback.classList.remove('d-none');
    setTimeout(() => feedback.classList.add('d-none'), 2000);
  }

  function showFinalMessage() {
    feedback.className = 'alert alert-info mb-3';
    feedback.textContent = `Actividad completada. Resultado: ${correctAnswers}/${items.length} correctas`;
    feedback.classList.remove('d-none');
  }

  function addToDroppedItems(item, category, isCorrect) {
    const container = document.getElementById(`${category}-items`);
    const itemDiv = document.createElement('div');
    itemDiv.className = `dropped-item p-2 mb-2 rounded ${isCorrect ? 'bg-success text-white' : 'bg-danger text-white'}`;
    itemDiv.textContent = item.texto;
    container.appendChild(itemDiv);
  }

  function handleAnswer(selectedCategory) {
    const currentItem = items[currentIndex];
    const isCorrect = selectedCategory === currentItem.categoria;

    if (isCorrect) correctAnswers++;

    showFeedback(isCorrect);
    addToDroppedItems(currentItem, selectedCategory, isCorrect);

    document.querySelectorAll('.category-btn').forEach(btn => btn.disabled = true);

    currentIndex++;
    setTimeout(() => showNextText(), 500);
  }

  function resetActivity() {
    currentIndex = 0;
    correctAnswers = 0;
    feedback.classList.add('d-none');
    categorias.forEach(cat => {
      document.getElementById(`${cat}-items`).innerHTML = '';
    });
    showNextText();
  }

  draggableText.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', currentIndex);
    draggableText.classList.add('dragging');
  });

  draggableText.addEventListener('dragend', () => {
    draggableText.classList.remove('dragging');
    document.querySelectorAll('.drop-area').forEach(area => area.classList.remove('drag-over'));
  });

  document.querySelectorAll('.drop-zone').forEach(zone => {
    const category = zone.getAttribute('data-category');
    const dropArea = zone.querySelector('.drop-area');

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      document.querySelectorAll('.drop-area').forEach(area => area.classList.remove('drag-over'));
      dropArea.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', (e) => {
      if (!zone.contains(e.relatedTarget)) {
        dropArea.classList.remove('drag-over');
      }
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.classList.remove('drag-over');
      const draggedIndex = parseInt(e.dataTransfer.getData('text/plain'));
      if (draggedIndex === currentIndex) {
        handleAnswer(category);
      }
    });
  });

  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      handleAnswer(category);
    });
  });

  resetBtn.addEventListener('click', resetActivity);
  showNextText();
}
