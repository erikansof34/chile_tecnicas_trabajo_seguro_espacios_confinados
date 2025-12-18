// JavaScript
export function init() {
    //SLIDER08
    let tarjetasMostradas_sld8_nivel = [];

    window.mostrarCard_sld8_nivel = function (letra) {
        let card = document.getElementById(`card-${letra}_sld8_nivel`);

        // Verifica si la tarjeta ya fue mostrada
        if (!tarjetasMostradas_sld8_nivel.includes(letra)) {
            tarjetasMostradas_sld8_nivel.push(letra);
            card.style.display = "block";
        }

        // Asigna el color de fondo y texto según el grado
        switch (letra) {
            case 'A':
                card.style.backgroundColor = "#FF0000";
                card.style.color = "#FFF";
                break;
            case 'B':
                card.style.backgroundColor = "#F5AC1A";
                card.style.color = "#FFF";
                break;
            case 'C':
                card.style.backgroundColor = "#064422";
                card.style.color = "#FFF";
                break;
        }
    };
}