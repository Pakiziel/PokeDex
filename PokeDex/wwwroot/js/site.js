"use strict";
(() => {

    const botonManipulacion = document.querySelector('.btn');

    const crearTarjetas = (pokemon) => {

        const contenedor = document.querySelector('.contenedorDeTarjetas');
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        tarjeta.classList.add('p-3');
        const cardImgTop = document.createElement('img');
        cardImgTop.classList.add('card-img-top');
        cardImgTop.setAttribute('alt', pokemon.name);
        cardImgTop.setAttribute('src', pokemon.sprites.front_default);
        tarjeta.append(cardImgTop);

        const tipos = document.createElement('ul');
        tipos.classList.add('list-group')
        tipos.classList.add('list-group-flush')

        for (const tipo of pokemon.types) {

            const response = tipo.type.name
            const pokeTipo = document.createElement('li');
            pokeTipo.classList.add('list-group-item');
            pokeTipo.textContent = response;
            tipos.append(pokeTipo);
            switch (response) {
                case "ground":
                    tarjeta.classList.add('earth');
                    break;
                case "water":
                    tarjeta.classList.add('water');
                    break;
                case "fire":
                    tarjeta.classList.add('fire');
                    break;
                case "normal":
                    tarjeta.classList.add('normal');
                    break;
                case "electric":
                    tarjeta.classList.add('electric');
                    break;
                case "bug":
                    tarjeta.classList.add('bug');
                    break;
                case "ghost":
                    tarjeta.classList.add('ghost');
                    break;
                case "psychic":
                    tarjeta.classList.add('psychic');
                    break;
                case "poison":
                    tarjeta.classList.add('poison');
                    break;
                case "ice":
                    tarjeta.classList.add('ice');
                    break;
                case "dragon":
                    tarjeta.classList.add('dragon');
                    break;
                case "fighting":
                    tarjeta.classList.add('fighting');
                    break;
                case "rock":
                    tarjeta.classList.add('rock');
                    break;
                case "fairy":
                    tarjeta.classList.add('fairy');
                    break;
                case "flying":
                    tarjeta.classList.add('flying');
                    break;
                case "bug":
                    tarjeta.classList.add('bug');
                    break;

            }

        }


        const cuerpoCarta = document.createElement('div');
        cuerpoCarta.classList.add('card-body')

        const tituloCarta = document.createElement('h5');
        tituloCarta.classList.add('card-title');
        tituloCarta.textContent = pokemon.name;

        cuerpoCarta.append(tituloCarta)
        tarjeta.append(cuerpoCarta);
        tarjeta.append(tipos);

        contenedor.append(tarjeta);

    }


    const alHacerClick = async (evento) => {
        const CajadeTexto = evento.target.parentNode.querySelector('input');
        if (CajadeTexto.value != '') {
            const response = await fetch('/Home/UnicoPokemon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(CajadeTexto.value)
            });

            const RespuestaServidor = await response.json();
            if (RespuestaServidor.pokemon == undefined) {
                Swal.fire({
                    icon: "error",
                    title: "❌Oops...",
                    text: "¡Haz alcanzado el número máximo de tarjetas!",
                    confirmButtonText: 'Aceptar',
                    footer: '<span class="rojo" >Este mensaje se cerrará automáticamente</span>',
                    backdrop: true,
                    timer: 5000,
                    timerProgressBar: true,
                    padding: '1rem',
                    showCloseButton: true,

                })
            } else {
                crearTarjetas(RespuestaServidor.pokemon);

            }
        }
    }

    botonManipulacion.addEventListener('click', alHacerClick, false);

})();