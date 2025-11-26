"use strict";
(() => {

    const botonManipulacion = document.querySelector('.btn');

    const crearTarjetas = (pokemon) => {

        const contenedor = document.querySelector('.contenedorDeTarjetas');
        contenedor.innerHTML = '';
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
            crearTarjetas(RespuestaServidor.pokemon);
        }
    }

    botonManipulacion.addEventListener('click', alHacerClick, false);

})();