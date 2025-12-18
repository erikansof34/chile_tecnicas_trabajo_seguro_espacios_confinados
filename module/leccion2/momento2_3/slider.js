export function init() {
    var items = [
        {
            id: "A", name: "Casco de Protección", audio: "./momento2_3/audio/casco_de_proteccion.mp3", image: "./momento2_3/img/casco_sldM2.webp", correctBoxId: "A", transcripcion: [
                { "end": 6.88, "start": 0, "text": "Casco de protección. El uso de cascos es esencial para proteger la cabeza de golpes o caídas" },
                { "end": 13.16, "start": 6.88, "text": "de objetos dentro del espacio confinado sobre todo en áreas con espacios reducidos y riesgos" },
                { "end": 13.84, "start": 13.16, "text": "mecánicos." }
            ]
        },
        {
            id: "H", name: "Botas", audio: "./momento2_3/audio/botas_con_punta_de_acero.mp3", image: "./momento2_3/img/botas_sldM2.webp", correctBoxId: "H", transcripcion: [
                { "end": 2.98, "start": 0, "text": "Botas con punta de acero y suela anti deslizante." },
                { "end": 9.4, "start": 3.44, "text": "Son esenciales para proteger los pies de caídas de objetos pesados, superficies resbaladizas," },
                { "end": 10.52, "start": 9.4, "text": "o pinchazos." }
            ]
        },
        {
            id: "C", name: "Arnés de Cuerpo Completo", audio: "./momento2_3/audio/arnes_de_cuerpo_completo.mp3", image: "./momento2_3/img/arnes_sldM2.webp", correctBoxId: "C", transcripcion: [
                { "end": 5.76, "start": 0, "text": "Arnes de cuerpo completo. Es fundamental para la entrada y salida en espacios confinados," },
                { "end": 12.04, "start": 6.14, "text": "especialmente si hay riesgo de caída o en áreas de difícil acceso. El Arnes debe estar" },
                { "end": 14.54, "start": 12.04, "text": "conectado a un sistema de anclaje seguro." }
            ]
        },
        {
            id: "D", name: "Overol", audio: "./momento2_3/audio/overoles_resistente_a_quimicos.mp3", image: "./momento2_3/img/overoles_resistentes_quimicos_sldM2.webp", correctBoxId: "D", transcripcion: [
                { "end": 2.84, "start": 0, "text": "Overoles y ignífugos o resistentes a químicos." },
                { "end": 9.42, "start": 3.62, "text": "Dependiendo de los riesgos específicos del espacio confinado, fuego, sustancias corrosivas" },
                { "end": 13.54, "start": 9.42, "text": "o tóxicas, el personal debe usar ropa de protección adecuada." }
            ]
        },
        {
            id: "B", name: "Tapones Auditivos", audio: "./momento2_3/audio/tapones_o_protectore_auditivos.mp3", image: "./momento2_3/img/protectores_auditivos_sldM2.webp", correctBoxId: "B", transcripcion: [
                { "end": 1.92, "start": 0, "text": "Tapones o protectores auditivos." },
                { "end": 7.9, "start": 2.74, "text": "Se utilizan en espacios confinados, donde los niveles de ruidos son elevados, para" },
                { "end": 10.38, "start": 7.9, "text": "prevenir daños auditivos a largo plazo." }
            ]
        },
        {
            id: "E", name: "Gafas de Seguridad", audio: "./momento2_3/audio/gafas_de_seguridad.mp3", image: "./momento2_3/img/gafas_seguridad_sldM2.webp", correctBoxId: "E", transcripcion: [
                { "end": 1.06, "start": 0, "text": "Gafas de seguridad." },
                { "end": 7.64, "start": 1.62, "text": "Se deben utilizar para proteger los ojos de partículas volátiles, sustancias químicas" },
                { "end": 8.68, "start": 7.64, "text": "o chispas." },
                { "end": 15.96, "start": 9.52, "text": "Las pantallas faciales son necesarias si existe riesgo de salpicaduras de sustancias químicas" },
                { "end": 18.98, "start": 15.96, "text": "o de proyecciones de partículas durante el trabajo." }
            ]
        },
        {
            id: "G", name: "Guantes Resistentes a Químicos", audio: "./momento2_3/audio/guantes_resistentes_a_quimicos.mp3", image: "./momento2_3/img/guantes_sldM2.webp", correctBoxId: "G", transcripcion: [
                { "end": 6.98, "start": 0, "text": "Guantes resistentes a químicos. Para manipular sustancias corrosivas o tóxicas, los guantes" },
                { "end": 8.34, "start": 6.98, "text": "de protección mecánica." },
                { "end": 14.8, "start": 9.06, "text": "En situaciones donde hay riesgo de cortes, abrasiones al manipular herramientas o superficies" },
                { "end": 15.26, "start": 14.8, "text": "rugosas." }
            ]
        },
        {
            id: "F", name: "Respirador Purificador de Aire", audio: "./momento2_3/audio/respiradores_purificadores_de_aire.mp3", image: "./momento2_3/img/respiradores_sldM2.webp", correctBoxId: "F", transcripcion: [
                { "end": 2.06, "start": 0, "text": "Respiradores purificadores de aire." },
                { "end": 7.26, "start": 2.84, "text": "Se utilizan en atmósferas donde los contaminantes están presentes," },
                { "end": 12.44, "start": 7.6, "text": "pero hay suficiente oxígeno al menos un 19.5%." },
                { "end": 19.56, "start": 13.12, "text": "Estos pueden ser respiradores con filtros de partículas o cartuchos para gases y vapores específicos." }
            ]
        }
    ];

    var droppedItems = {};
    var history = [];
    var palette = document.getElementById("epp-ddd-palette");
    var audioContainer = document.getElementById("epp-ddd-audio-container");
    var feedbackEl = document.getElementById("epp-ddd-feedback");
    var feedbackText = document.getElementById("epp-ddd-feedback-text");
    var undoBtn = document.getElementById("epp-ddd-undo");
    var resetBtn = document.getElementById("epp-ddd-reset");
    var layoutEl = document.querySelector(".epp-ddd-layout");
    var mobileContainer = document.getElementById("epp-ddd-mobile");
    var isMobile = window.matchMedia("(max-width: 992px)").matches;

    // Variables para la versión móvil
    var selectedByIndex = {};
    var mobileHistory = []; // Historial para móvil

    function renderPalette() {
        if (!palette) return;

        palette.innerHTML = "";
        items.forEach(function (item) {
            var alreadyDropped = Object.keys(droppedItems).some(function (boxId) {
                return droppedItems[boxId] && droppedItems[boxId].id === item.id
            });
            if (!alreadyDropped) {
                var img = document.createElement("img");
                img.className = "epp-ddd-palette-img";
                img.src = item.image;
                img.alt = item.name;
                img.draggable = true;
                img.addEventListener("dragstart", function (e) {
                    e.dataTransfer.setData("text/plain", item.id)
                });
                palette.appendChild(img);
            }
        });

        if (undoBtn) undoBtn.disabled = history.length === 0;
        if (resetBtn) resetBtn.disabled = Object.keys(droppedItems).length === 0;
    }

    function setFeedback(ok, text, audioSrc) {
        if (!feedbackText || !feedbackEl) return;

        feedbackText.textContent = "";
        feedbackEl.classList.remove("epp-ddd-feedback-ok", "epp-ddd-feedback-err");
        if (ok) {
            feedbackEl.classList.add("epp-ddd-feedback-ok")
        } else {
            feedbackEl.classList.add("epp-ddd-feedback-err")
        }

        feedbackText.textContent = text || "";

        // Mostrar u ocultar feedback
        var showFeedback = !!(text && text.length);
        if (showFeedback) {
            feedbackEl.style.display = "flex";

            // Mostrar controles si hay feedback
            var controls = document.querySelector(".epp-ddd-controls");
            if (controls) {
                controls.style.display = "flex";
            }
        } else {
            feedbackEl.style.display = "none";

            // Ocultar controles si no hay feedback (solo en escritorio)
            var controls = document.querySelector(".epp-ddd-controls");
            if (controls && !isMobile) {
                controls.style.display = "none";
            }
        }

        if (audioContainer) {
            if (ok && audioSrc) {
                var itAudio = items.find(function (i) { return i.audio === audioSrc });
                var transStr = itAudio && itAudio.transcripcion ? JSON.stringify(itAudio.transcripcion) : '[]';
                audioContainer.innerHTML =
                    '<div class="audio-center py-3">' +
                    '<audio class="audio-con-transcripcion" controls data-transcripcion=\'' + transStr + '\'>' +
                    '<source src="' + audioSrc + '" type="audio/mp3">' +
                    '</audio>' +
                    '<i class="transcription-toggle fas fa-closed-captioning audio-estilos"></i>' +
                    '</div>';
                if (typeof window !== "undefined" && window.initTranscripciones) {
                    window.initTranscripciones(audioContainer);
                }
            } else {
                audioContainer.innerHTML = "";
            }
        }

        if (layoutEl && !isMobile) {
            if (showFeedback) {
                layoutEl.classList.add("has-controls");
            } else {
                layoutEl.classList.remove("has-controls");
            }
        }

        // En móvil, hacer scroll suave al feedback
        if (isMobile && showFeedback) {
            setTimeout(function () {
                if (feedbackEl) {
                    feedbackEl.scrollIntoView({
                        behavior: 'smooth',
                        block: 'nearest'
                    });
                }
            }, 300);
        }
    }

    function isItemCorrect(itemId, targetId) {
        var it = items.find(function (i) { return i.id === itemId });
        return it && it.correctBoxId === targetId;
    }

    function updateDropzoneUI(zoneEl) {
        var targetId = zoneEl.getAttribute("data-id");
        var item = droppedItems[targetId];

        zoneEl.classList.remove("epp-ddd-correct", "epp-ddd-incorrect");
        zoneEl.innerHTML = "";

        if (item) {
            var img = document.createElement("img");
            img.className = "epp-ddd-item-img";
            img.src = item.image;
            img.alt = item.name;
            zoneEl.appendChild(img);

            var mark = document.createElement("img");
            mark.className = "epp-ddd-mark";
            mark.src = isItemCorrect(item.id, targetId) ?
                "../../assets/img/botones/checkAct.png" :
                "../../assets/img/botones/xmarkAct.png";
            mark.alt = isItemCorrect(item.id, targetId) ? "Correcto" : "Incorrecto";
            zoneEl.appendChild(mark);

            zoneEl.classList.add(isItemCorrect(item.id, targetId) ?
                "epp-ddd-correct" : "epp-ddd-incorrect");
        } else {
            var span = document.createElement("span");
            span.className = "epp-ddd-placeholder";
            span.textContent = "Arrastre aquí " + targetId;
            zoneEl.appendChild(span);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        var targetId = this.getAttribute("data-id");
        var itemId = e.dataTransfer.getData("text/plain");
        var draggedItem = items.find(function (it) { return it.id === itemId });

        if (!draggedItem) return;

        var existingBoxId = null;
        Object.keys(droppedItems).forEach(function (boxId) {
            if (droppedItems[boxId] && droppedItems[boxId].id === draggedItem.id) {
                existingBoxId = boxId
            }
        });

        if (existingBoxId) {
            delete droppedItems[existingBoxId]
        }

        if (!droppedItems[targetId]) {
            droppedItems[targetId] = draggedItem;
            var correct = draggedItem.correctBoxId === targetId;

            updateDropzoneUI(this);
            renderPalette();

            history.push({ action: correct ? "add" : "incorrect", item: draggedItem, to: targetId });

            if (correct) {
                setFeedback(true,
                    "Relación correcta: ¡Muy bien! Identificaste este ítem correctamente. Ahora escucha el siguiente audio:",
                    draggedItem.audio);
            } else {
                setFeedback(false,
                    "Relación incorrecta: ¡Piénsalo bien! El ítem no corresponde a este elemento de protección personal, vuelve a intentarlo.",
                    null);
            }
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function attachDropEvents() {
        var zones = document.querySelectorAll(".epp-ddd-dropzone");
        zones.forEach(function (z) {
            z.addEventListener("drop", handleDrop);
            z.addEventListener("dragover", handleDragOver);
            updateDropzoneUI(z);
        });
    }

    // FUNCIONES PARA LA VERSIÓN MÓVIL
    function buildOptions(keep) {
        var selected = Object.values(selectedByIndex).filter(Boolean);
        var html = '<option value="">Seleccione...</option>';
        var orderIds = ["E", "F", "G", "A", "C", "H", "B", "D"];
        orderIds.forEach(function (id) {
            var opt = items.find(function (it) { return it.id === id });
            if (opt && (selected.indexOf(opt.id) === -1 || opt.id === keep)) {
                html += '<option value="' + opt.id + '">' + opt.name + '</option>';
            }
        });
        return html;
    }

    function refreshMobileSelects() {
        var selects = mobileContainer.querySelectorAll(".epp-ddd-card-select");
        selects.forEach(function (sel) {
            var idx = parseInt(sel.getAttribute("data-idx"), 10);
            var keep = selectedByIndex[idx] || "";
            var val = sel.value;

            sel.innerHTML = buildOptions(keep);
            sel.value = val;
        });
    }

    function handleMobileSelectChange() {
        var val = this.value;
        var idx = parseInt(this.getAttribute("data-idx"), 10);
        var oldValue = selectedByIndex[idx];

        // Si hay un valor anterior, lo guardamos en el historial antes de cambiarlo
        if (oldValue) {
            mobileHistory.push({ idx: idx, oldValue: oldValue, newValue: val });
        } else if (val) {
            mobileHistory.push({ idx: idx, oldValue: "", newValue: val });
        }

        if (val) {
            selectedByIndex[idx] = val;
        } else {
            delete selectedByIndex[idx];
        }

        // Buscar el item correspondiente
        var item = items[idx];
        if (!item) return;

        var correct = val === item.id;

        // Actualizar el estado del botón Deshacer
        if (undoBtn) {
            undoBtn.disabled = mobileHistory.length === 0;
        }

        if (correct) {
            setFeedback(true,
                "Relación correcta: ¡Muy bien! Identificaste este ítem correctamente. Ahora escucha el siguiente audio:",
                item.audio);
            var card = this.parentElement;
            var mark = card.querySelector(".epp-ddd-mark");
            if (mark) {
                mark.src = "../../assets/img/botones/checkAct.png";
                mark.alt = "Correcto";
                mark.style.display = "block";
            }
        } else {
            setFeedback(false,
                "Relación incorrecta: ¡Piénsalo bien! El ítem no corresponde a este elemento de protección personal, vuelve a intentarlo.",
                null);
            var card = this.parentElement;
            var mark = card.querySelector(".epp-ddd-mark");
            if (mark) {
                if (val) {
                    mark.src = "../../assets/img/botones/xmarkAct.png";
                    mark.alt = "Incorrecto";
                    mark.style.display = "block";
                } else {
                    mark.style.display = "none";
                }
            }
        }

        refreshMobileSelects();
    }

    function renderMobile() {
        if (!mobileContainer) return;

        mobileContainer.innerHTML = "";
        selectedByIndex = {};
        mobileHistory = [];

        items.forEach(function (item, idx) {
            var card = document.createElement("div");
            card.className = "epp-ddd-card";

            var img = document.createElement("img");
            img.className = "epp-ddd-card-img";
            img.src = item.image;
            img.alt = item.name;

            var mark = document.createElement("img");
            mark.className = "epp-ddd-mark";
            mark.style.display = "none";

            var select = document.createElement("select");
            select.className = "epp-ddd-card-select";
            select.setAttribute("data-idx", String(idx));
            select.innerHTML = buildOptions("");
            select.addEventListener("change", handleMobileSelectChange);

            card.appendChild(img);
            card.appendChild(mark);
            card.appendChild(select);
            mobileContainer.appendChild(card);
        });
    }

    // FUNCIÓN PARA DESHACER EN MÓVIL
    function handleMobileUndo() {
        if (mobileHistory.length === 0) return;

        var lastAction = mobileHistory[mobileHistory.length - 1];
        var idx = lastAction.idx;

        // Restaurar el valor anterior
        var select = mobileContainer.querySelector('.epp-ddd-card-select[data-idx="' + idx + '"]');
        if (select) {
            select.value = lastAction.oldValue;

            // Actualizar selectedByIndex
            if (lastAction.oldValue) {
                selectedByIndex[idx] = lastAction.oldValue;
            } else {
                delete selectedByIndex[idx];
            }

            // Disparar el evento change para actualizar la interfaz
            select.dispatchEvent(new Event('change'));
        }

        // Eliminar del historial
        mobileHistory.pop();

        // Actualizar estado del botón Deshacer
        if (undoBtn) {
            undoBtn.disabled = mobileHistory.length === 0;
        }

        // Limpiar feedback
        setFeedback(false, "", null);
    }

    // FUNCIÓN PARA REINICIAR EN MÓVIL
    function handleMobileReset() {
        selectedByIndex = {};
        mobileHistory = [];

        // Limpiar todos los selects
        var selects = mobileContainer.querySelectorAll(".epp-ddd-card-select");
        selects.forEach(function (select) {
            select.value = "";

            // Ocultar marcas
            var card = select.parentElement;
            var mark = card.querySelector(".epp-ddd-mark");
            if (mark) {
                mark.style.display = "none";
            }
        });

        // Actualizar estado de los botones
        if (undoBtn) undoBtn.disabled = true;
        if (resetBtn) resetBtn.disabled = false;

        // Limpiar feedback
        setFeedback(false, "", null);

        // Re-renderizar para actualizar opciones
        renderMobile();
    }

    // EVENT LISTENERS
    if (undoBtn) {
        undoBtn.addEventListener("click", function () {
            if (isMobile) {
                // Versión móvil
                handleMobileUndo();
            } else {
                // Versión escritorio
                if (history.length === 0) return;

                var last = history[history.length - 1];
                delete droppedItems[last.to];

                var zone = document.querySelector('.epp-ddd-dropzone[data-id="' + last.to + '"]');
                if (zone) updateDropzoneUI(zone);

                renderPalette();
                history = history.slice(0, -1);
                setFeedback(false, "", null);
            }
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            if (isMobile) {
                // Versión móvil
                handleMobileReset();
            } else {
                // Versión escritorio
                droppedItems = {};
                history = [];

                document.querySelectorAll(".epp-ddd-dropzone").forEach(updateDropzoneUI);
                renderPalette();
                setFeedback(false, "", null);

                if (layoutEl) layoutEl.classList.remove("has-controls");
            }
        });
    }

    // INICIALIZACIÓN
    if (isMobile) {
        // En móvil, renderizar la versión con selects
        renderMobile();
        // Mostrar controles en móvil
        var controls = document.querySelector(".epp-ddd-controls");
        if (controls) {
            controls.style.display = "flex";
        }
        // Inicializar estado de botones
        if (undoBtn) undoBtn.disabled = true;
        if (resetBtn) resetBtn.disabled = false;
    } else {
        // En escritorio, usar drag & drop
        attachDropEvents();
        renderPalette();
        // Ocultar controles inicialmente
        var controls = document.querySelector(".epp-ddd-controls");
        if (controls) {
            controls.style.display = "none";
        }
    }

    setFeedback(false, "", null);


}
