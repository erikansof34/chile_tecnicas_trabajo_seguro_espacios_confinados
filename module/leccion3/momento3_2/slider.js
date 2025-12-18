export function init() {
    var items = { drop1: null, drop2: null, drop3: null };
    var validation = { drop1: null, drop2: null, drop3: null };
    var correctAnswers = { drop1: "option1", drop2: "option2", drop3: "option3" };
    var messageEl = document.getElementById("message-dragdrop-audio-v2");
    var btnValidate = document.getElementById("btn-validate-dragdrop-audio-v2");
    var btnReset = document.getElementById("btn-reset-dragdrop-audio-v2");
    var draggables = Array.from(document.querySelectorAll(".draggable-option-dragdrop-audio-v2"));
    var dropAreas = Array.from(document.querySelectorAll(".drop-area-dragdrop-audio-v2"));
    var currentAudio = null;
    var isMobile = window.matchMedia("(max-width: 48rem)").matches;
    var selectedOptions = { drop1: "", drop2: "", drop3: "" };

    function renderDraggables() {
        var used = Object.values(items).filter(Boolean);
        draggables.forEach(function (drag) {
            var id = drag.getAttribute("data-id");
            if (used.indexOf(id) !== -1) {
                drag.classList.add("hidden-keep-space-dragdrop-audio-v2");
            } else {
                drag.classList.remove("hidden-keep-space-dragdrop-audio-v2");
            }
        });
    }

    function updateButtons() {
        if (isMobile) {
            var anySelected = Object.values(selectedOptions).some(function (v) { return v !== "" });
            var allSelected = Object.values(selectedOptions).every(function (v) { return v !== "" });
            btnReset.disabled = !anySelected;
            btnReset.classList.toggle("disabled-dragdrop-audio-v2", btnReset.disabled);
            btnValidate.disabled = !allSelected;
            btnValidate.classList.toggle("disabled-dragdrop-audio-v2", btnValidate.disabled);
        } else {
            var anyDropped = Object.values(items).some(function (v) { return v !== null });
            var allDropped = Object.values(items).every(function (v) { return v !== null });
            btnReset.disabled = !anyDropped;
            btnReset.classList.toggle("disabled-dragdrop-audio-v2", btnReset.disabled);
            btnValidate.disabled = !allDropped;
            btnValidate.classList.toggle("disabled-dragdrop-audio-v2", btnValidate.disabled);
        }
    }

    function setMessage(text, ok) {
        if (!text) {
            messageEl.classList.add("d-none");
            messageEl.textContent = "";
            return;
        }
        messageEl.classList.remove("d-none");
        messageEl.classList.remove("message-success-dragdrop-audio-v2", "message-error-dragdrop-audio-v2");
        messageEl.classList.add(ok ? "message-success-dragdrop-audio-v2" : "message-error-dragdrop-audio-v2");
        messageEl.innerHTML = text;
    }

    function renderDrops() {
        dropAreas.forEach(function (area) {
            var dropId = area.getAttribute("data-drop-id");
            var content = area.querySelector(".drop-content-dragdrop-audio-v2");
            var img = area.querySelector(".verification-image-dragdrop-audio-v2");
            area.classList.remove("drop-area-filled-dragdrop-audio-v2", "drop-area-correct-dragdrop-audio-v2", "drop-area-incorrect-dragdrop-audio-v2");
            if (!isMobile && items[dropId]) {
                var label = draggables.find(function (d) { return d.getAttribute("data-id") === items[dropId] }).textContent;
                content.textContent = label;
                area.classList.add("drop-area-filled-dragdrop-audio-v2");
            } else {
                content.textContent = "";
            }
            if (!isMobile && validation[dropId] !== null) {
                if (validation[dropId]) {
                    area.classList.add("drop-area-correct-dragdrop-audio-v2");
                    img.src = "../../assets/img/botones/checkAct.png";
                    img.alt = "correcto";
                } else {
                    area.classList.add("drop-area-incorrect-dragdrop-audio-v2");
                    img.src = "../../assets/img/botones/xmarkAct.png";
                    img.alt = "incorrecto";
                }
                img.classList.remove("d-none");
            } else {
                img.classList.add("d-none");
                img.src = "";
                img.alt = "";
            }
            // sin colorear contenedor de audio (se mantiene solo el estado en el drop)
        });
        renderDraggables();
        updateButtons();
    }

    if (!isMobile) {
        draggables.forEach(function (drag) {
            drag.addEventListener("dragstart", function (e) {
                e.dataTransfer.setData("text/plain", drag.getAttribute("data-id"));
            });
        });
    }

    if (!isMobile) {
        dropAreas.forEach(function (area) {
            area.addEventListener("dragover", function (e) { e.preventDefault() });
            area.addEventListener("drop", function (e) {
                e.preventDefault();
                var id = e.dataTransfer.getData("text/plain");
                var dropId = area.getAttribute("data-drop-id");
                if (items[dropId]) return;
                if (Object.values(items).includes(id)) return;
                items[dropId] = id;
                setMessage("", true);
                renderDrops();
                renderDraggables();
            });
        });
    }

    document.querySelectorAll(".audio-con-transcripcion").forEach(function (audio) {
        audio.addEventListener("play", function () {
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }
            currentAudio = audio;
        });
    });

    btnValidate.addEventListener("click", function () {
        var totalCorrect = 0;
        if (isMobile) {
            Object.keys(selectedOptions).forEach(function (dropId) {
                var isOk = selectedOptions[dropId] === correctAnswers[dropId];
                if (isOk) totalCorrect++;
                var selectEl = document.querySelector('.select-dragdrop-audio-v2[data-drop-id="' + dropId + '"]');
                if (selectEl) {
                    selectEl.classList.remove("select-correct-dragdrop-audio-v2", "select-incorrect-dragdrop-audio-v2");
                    selectEl.classList.add(isOk ? "select-correct-dragdrop-audio-v2" : "select-incorrect-dragdrop-audio-v2");
                    var row = selectEl.closest(".row-dragdrop-audio-v2");
                    if (row) {
                        row.classList.remove("mobile-card-correct", "mobile-card-incorrect");
                        row.classList.add(isOk ? "mobile-card-correct" : "mobile-card-incorrect");
                        var icon = row.querySelector(".mobile-card-icon-dragdrop-audio-v2");
                        if (icon) {
                            icon.src = isOk ? "../../assets/img/botones/checkAct.png" : "../../assets/img/botones/xmarkAct.png";
                            icon.classList.remove("d-none");
                        }
                    }
                }
            });
        } else {
            Object.keys(items).forEach(function (dropId) {
                var isOk = items[dropId] === correctAnswers[dropId];
                validation[dropId] = isOk;
                if (isOk) totalCorrect++;
            });
        }
        var percentage = Math.round((totalCorrect / Object.keys(correctAnswers).length) * 100);
        var okAll = totalCorrect === Object.keys(correctAnswers).length;
        var text = (okAll
            ? '<div><strong>¡Muy bien!</strong> Estás listo para profundizar en los elementos de manejo de emergencias.</div>'
            : '<div><strong>¡Piénsalo bien!</strong> ¡Escucha nuevamente el audio y vuelve a intentarlo!</div>');
        text += '<div style="margin-top:.5rem">Tus respuestas correctas son: ' + totalCorrect + ' de 3 (' + percentage + '%).</div>';
        setMessage(text, okAll);
        renderDrops();
    });

    btnReset.addEventListener("click", function () {
        if (isMobile) {
            selectedOptions = { drop1: "", drop2: "", drop3: "" };
            Array.from(document.querySelectorAll(".select-dragdrop-audio-v2")).forEach(function (sel) {
                sel.value = "";
                sel.classList.remove("select-correct-dragdrop-audio-v2", "select-incorrect-dragdrop-audio-v2");
                renderSelectOptions(sel.getAttribute("data-drop-id"));
                var row = sel.closest(".row-dragdrop-audio-v2");
                if (row) {
                    row.classList.remove("mobile-card-correct", "mobile-card-incorrect");
                    var icon = row.querySelector(".mobile-card-icon-dragdrop-audio-v2");
                    if (icon) icon.classList.add("d-none");
                }
            });
        } else {
            items = { drop1: null, drop2: null, drop3: null };
            validation = { drop1: null, drop2: null, drop3: null };
        }
        setMessage("", true);
        if (currentAudio) { currentAudio.pause(); currentAudio.currentTime = 0; currentAudio = null }
        renderDrops();
        renderDraggables();
    });

    function renderSelectOptions(targetDrop) {
        var opts = ["", "option2", "option3", "option1"];
        var selected = Object.keys(selectedOptions).filter(function (k) { return k !== targetDrop }).map(function (k) { return selectedOptions[k] }).filter(Boolean);
        var sel = document.querySelector('.select-dragdrop-audio-v2[data-drop-id="' + targetDrop + '"]');
        if (!sel) return;
        var labels = { option1: "Procedimiento de rescate", option2: "Procediminento de evacuación", option3: "Plan para respuestas a emergencia" };
        var html = '<option value="">Seleccione...</option>';
        opts.slice(1).forEach(function (val) {
            if (selected.indexOf(val) === -1 || val === selectedOptions[targetDrop]) {
                html += '<option value="' + val + '">' + labels[val] + '</option>';
            }
        });
        sel.innerHTML = html;
        sel.value = selectedOptions[targetDrop] || "";
    }
    function setupMobile() {
        document.querySelectorAll(".row-dragdrop-audio-v2").forEach(function (row, idx) {
            var dropId = "drop" + (idx + 1);
            var itemsBox = row.querySelector(".items-dragdrop-audio-v2");
            if (itemsBox) itemsBox.classList.add("d-none");
            row.classList.add("mobile-card-dragdrop-audio-v2");
            var icon = row.querySelector(".mobile-card-icon-dragdrop-audio-v2");
            if (!icon) {
                icon = document.createElement("img");
                icon.className = "mobile-card-icon-dragdrop-audio-v2 d-none";
                row.appendChild(icon);
            }
            var existing = row.querySelector('.select-dragdrop-audio-v2[data-drop-id="' + dropId + '"]');
            if (!existing) {
                var sel = document.createElement("select");
                sel.className = "select-dragdrop-audio-v2";
                sel.setAttribute("data-drop-id", dropId);
                row.appendChild(sel);
                renderSelectOptions(dropId);
                sel.addEventListener("change", function () {
                    var id = this.getAttribute("data-drop-id");
                    selectedOptions[id] = this.value;
                    ['drop1', 'drop2', 'drop3'].forEach(function (d) { renderSelectOptions(d) });
                    updateButtons();
                    setMessage("", true);
                });
            } else {
                renderSelectOptions(dropId);
            }
        });
        updateButtons();
    }
    renderDrops();
    renderDraggables();
    if (isMobile) setupMobile();
}
