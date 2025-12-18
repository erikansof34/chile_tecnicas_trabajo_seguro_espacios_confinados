export function init() {
    var options = [
        { value: "", label: "Selecciona una opción" },
        { value: "option1", label: "Riesgo físico-químico" },
        { value: "option2", label: "Riesgo físico" },
        { value: "option3", label: "Riesgo Mecánico" },
        { value: "option4", label: "Riesgo químico" },
        { value: "option5", label: "Riesgo psicosocial" },
        { value: "option6", label: "Riesgo biológico" }
    ];
    var correctItems = {
        drop1: "option2",
        drop2: "option4",
        drop3: "option1",
        drop4: "option3",
        drop5: "option6",
        drop6: "option5"
    };
    var dropIds = ["drop1", "drop2", "drop3", "drop4", "drop5", "drop6"];
    var selections = { drop1: "", drop2: "", drop3: "", drop4: "", drop5: "", drop6: "" };
    var selectedCards = new Set();
    var isVerified = false;
    var correctCount = 0;
    var feedbackEl = document.getElementById("feedback-select-img");
    var scoreEl = document.getElementById("score-select-img");
    var btnValidate = document.getElementById("btn-validate-select-img");
    var btnReset = document.getElementById("btn-reset-select-img");
    var cards = Array.from(document.querySelectorAll(".card-actividad-select-img"));
    // Inicializar selects con opciones
    function buildOptions(keep) {
        var selectedValues = dropIds.map(function (id) { return selections[id] }).filter(Boolean);
        var html = '<option value="">Seleccione...</option>';
        options.slice(1).forEach(function (opt) {
            if (selectedValues.indexOf(opt.value) === -1 || opt.value === keep) {
                html += '<option value="' + opt.value + '">' + opt.label + '</option>';
            }
        });
        return html;
    }
    function refreshSelects() {
        var selects = document.querySelectorAll(".card-select-select-img");
        selects.forEach(function (sel) {
            var id = sel.getAttribute("data-drop-id");
            var keep = selections[id] || "";
            sel.innerHTML = buildOptions(keep);
            sel.value = selections[id] || "";
            sel.classList.toggle("bg-light", !!selections[id]);
            sel.style.backgroundColor = selections[id] ? "var(--light-purple)" : "#fff";
        });
    }
    function updateCardBg() {
        cards.forEach(function (card) {
            var id = card.getAttribute("data-drop-id");
            var front = card.querySelector(".card-front-select-img");
            front.classList.remove("bg-purple-personalizado-select-img", "bg-green-personalizado-select-img", "bg-orange-personalizado-select-img", "bg-red-personalizado-select-img");
            if (!isVerified) {
                if (selectedCards.has(id)) {
                    front.classList.add("bg-purple-personalizado-select-img");
                }
            } else {
                var percentage = (correctCount / dropIds.length) * 100;
                if (selections[id] === correctItems[id]) {
                    front.classList.add("bg-green-personalizado-select-img");
                } else if (percentage > 60) {
                    front.classList.add("bg-orange-personalizado-select-img");
                } else {
                    front.classList.add("bg-red-personalizado-select-img");
                }
            }
        });
    }
    function updateIcons() {
        cards.forEach(function (card) {
            var id = card.getAttribute("data-drop-id");
            var icon = card.querySelector(".validation-icon-select-img");
            if (!icon) return;
            if (isVerified) {
                icon.src = selections[id] === correctItems[id]
                    ? "../../assets/img/botones/checkAct.png"
                    : "../../assets/img/botones/xmarkAct.png";
                icon.classList.remove("d-none");
            } else {
                icon.classList.add("d-none");
            }
        });
    }
    function updateButtons() {
        var anySelected = dropIds.some(function (id) { return !!selections[id] });
        btnValidate.disabled = !anySelected || isVerified;
        btnValidate.classList.toggle("disabled-select-img", btnValidate.disabled);
        btnReset.disabled = !isVerified;
        btnReset.classList.toggle("disabled-select-img", btnReset.disabled);
    }
    document.querySelectorAll(".card-select-select-img").forEach(function (sel) {
        sel.innerHTML = buildOptions("");
        sel.addEventListener("change", function () {
            var id = this.getAttribute("data-drop-id");
            var val = this.value;
            selections[id] = val;
            if (val) selectedCards.add(id);
            refreshSelects();
            updateCardBg();
            updateButtons();
            if (feedbackEl) {
                feedbackEl.classList.add("d-none");
                feedbackEl.innerHTML = "";
            }
            if (scoreEl) {
                scoreEl.classList.add("d-none");
                scoreEl.innerHTML = "";
            }
        });
    });
    btnValidate.addEventListener("click", function () {
        var allSelected = dropIds.every(function (id) { return !!selections[id] });
        if (!allSelected) {
            if (feedbackEl) {
                feedbackEl.classList.remove("d-none");
                feedbackEl.innerHTML = '<div class=" multi-select-feedback-error"><i class="fas fa-times-circle me-2"></i>Debes seleccionar todos los elementos antes de validar.</div>';
            }
            return;
        }
        correctCount = dropIds.reduce(function (acc, id) { return acc + (selections[id] === correctItems[id] ? 1 : 0) }, 0);
        isVerified = true;
        updateIcons();
        updateCardBg();
        updateButtons();
        if (feedbackEl) {
            var pct = Math.round((correctCount / dropIds.length) * 100);
            var baseMsg = '<p class="bold-text-select-img">Tus respuestas correctas son: ' + correctCount + ' de ' + dropIds.length + ' (' + pct + '%).</p>';
            var msg = '';
            if (correctCount === dropIds.length) {
                msg = '<div class=" multi-select-feedback-success"><i class="fas fa-check-circle me-2"></i>Respuesta(s) correcta(s): ¡Muy bien! Todas las respuestas son correctas.' + baseMsg + '</div>';
            } else {
                msg = '<div class=" multi-select-feedback-error"><i class="fas fa-times-circle me-2"></i>Respuesta(s) Incorrecta(s): ¡Piénsalo bien! ¡Revisa muy bien la pregunta y vuelve a intentarlo!​' + baseMsg + '</div>';
            }
            feedbackEl.classList.remove("d-none");
            feedbackEl.innerHTML = msg;
        }
        if (scoreEl) { scoreEl.classList.add("d-none"); scoreEl.innerHTML = '' }
    });
    btnReset.addEventListener("click", function () {
        selections = { drop1: "", drop2: "", drop3: "", drop4: "", drop5: "", drop6: "" };
        selectedCards = new Set();
        isVerified = false;
        correctCount = 0;
        refreshSelects();
        // limpiar explicitamente los selects en DOM
        document.querySelectorAll(".card-select-select-img").forEach(function (sel) { sel.value = "" });
        updateIcons();
        updateCardBg();
        updateButtons();
        if (feedbackEl) { feedbackEl.classList.add("d-none"); feedbackEl.innerHTML = "" }
        if (scoreEl) { scoreEl.classList.add("d-none"); scoreEl.innerHTML = "" }
    });
    // Inicial
    refreshSelects();
    updateCardBg();
    updateButtons();
}
