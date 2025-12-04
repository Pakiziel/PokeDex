"use strict";

(() => {

    const botonManipulacion = document.querySelector('.btn');
    const cambioFondo = document.querySelector(".botonPelea");

    let tarjetaExistente = 0;

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
                case "ground": tarjeta.classList.add('earth'); break;
                case "water": tarjeta.classList.add('water'); break;
                case "fire": tarjeta.classList.add('fire'); break;
                case "normal": tarjeta.classList.add('normal'); break;
                case "electric": tarjeta.classList.add('electric'); break;
                case "bug": tarjeta.classList.add('bug'); break;
                case "ghost": tarjeta.classList.add('ghost'); break;
                case "psychic": tarjeta.classList.add('psychic'); break;
                case "poison": tarjeta.classList.add('poison'); break;
                case "ice": tarjeta.classList.add('ice'); break;
                case "dragon": tarjeta.classList.add('dragon'); break;
                case "fighting": tarjeta.classList.add('fighting'); break;
                case "rock": tarjeta.classList.add('rock'); break;
                case "fairy": tarjeta.classList.add('fairy'); break;
                case "flying": tarjeta.classList.add('flying'); break;
            }
        }

        tarjetaExistente += 1;
        if (tarjetaExistente == 2) {
            const muestraBoton = document.querySelector(".botonPelea");
            muestraBoton.removeAttribute('hidden');
        }

        const cuerpoCarta = document.createElement('div');
        cuerpoCarta.classList.add('card-body')

        const tituloCarta = document.createElement('h5');
        tituloCarta.classList.add('card-title');
        tituloCarta.textContent = pokemon.name;

        cuerpoCarta.append(tituloCarta)
        tarjeta.append(cuerpoCarta);
        tarjeta.append(tipos);

        const botonCerrar = document.createElement('button');
        botonCerrar.addEventListener('click', cerrarTarjeta, false);
        botonCerrar.classList.add('button');
        botonCerrar.textContent = 'X';
        botonCerrar.classList.add('btn-cerrar');
        tarjeta.append(botonCerrar);

        contenedor.append(tarjeta);
    }

    const transicionFondo = async (evento) => {
        const transicion = document.querySelector('.row-2');
        transicion.style = 'left: 0%';
        evento.target.setAttribute('hidden', true);

        const esconder = document.querySelector('.form-group');
        esconder.setAttribute('hidden', true);

        const esconderTache = document.querySelectorAll('.btn-cerrar');
        esconderTache.forEach((tache) => tache.setAttribute('hidden', true));

        const contenedorPrincipal = document.querySelector('main');
        contenedorPrincipal.classList.add('modo-pelea');

        const contenedorCartas = document.querySelector('.contenedorDeTarjetas');
        contenedorCartas.style.width = "100 %";
        contenedorCartas.style.justifyContent = "space-between";
    }

    const cerrarTarjeta = async (evento) => {
        const botonCerrar = evento.target.parentNode;
        botonCerrar.remove();

        tarjetaExistente = tarjetaExistente - 1;
        const muestraBoton = document.querySelector(".botonPelea");
        muestraBoton.setAttribute("hidden", true);
    }

    const alHacerClick = async (evento) => {
        const CajadeTexto = evento.target.parentNode.querySelector('input');

        if (tarjetaExistente == 2) {
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
            });

        } else {
            if (CajadeTexto.value != '') {
                const response = await fetch('/Home/UnicoPokemon', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(CajadeTexto.value)
                });

                const RespuestaServidor = await response.json();

                if (RespuestaServidor.pokemon) {
                    crearTarjetas(RespuestaServidor.pokemon);
                } else {
                    console.log("Pokemon no encontrado");
                }
            }
        }
    }

    cambioFondo.addEventListener('click', transicionFondo)
    botonManipulacion.addEventListener('click', alHacerClick, false);

})();