let nroPagina = 1;
let favoritofinal = [];

function mostrarPeliculas(nroPagina) {
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=e051ec73ad25e09ba5621fd8e19e9cbc&language=es&page=${nroPagina}`;
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data.results))
        .catch(error => console.log(error))

    const mostrarData = (data) => {
        console.log(data)
        let body = ""
        var resultados = document.getElementById('sec_peliculas');
        for (var i = 0; i < data.length; i++) {
            body += `<div class="contenedorPeliculas" > 
            <img src="https://image.tmdb.org/t/p/w500/${data[i].poster_path}">
            <h3> ${data[i].title} </h3>
            <p><b>Código:</b> ${data[i].id}<br>
            <b>Título original:</b> ${data[i].original_title}<br>
            <b>Idioma original:</b> ${data[i].original_language}<br>
            <b>Año:</b> ${data[i].release_date}<br>
            <div id="contPeliculas-boton">
            <button id="agregarPelicula" onclick="GuardarFavorito(${nroPagina},${i})">Agregar a Favoritos</button>
            </div>
            </div>`
        }
        resultados.innerHTML = body
    }
}



mostrarPeliculas(1)

function btnAnterior() {
    if (nroPagina > 1) {
        nroPagina -= 1
        mostrarPeliculas(nroPagina)
    } else {
        nroPagina -= 1
        mostrarPeliculas(nroPagina)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(nroPagina)
}

function btnSiguiente() {
    nroPagina += 1
    mostrarPeliculas(nroPagina)
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(nroPagina)
}


function GuardarFavorito(nroPagina, info) {

    mensajes = document.getElementById('sec-messages')
    let body = ""
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=efd50a2e67c9aad12da707e41cdf0736&language=es&page=${nroPagina}`;
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data.results))
        .catch(error => console.log(error))

    const mostrarData = (data) => {

        //console.log(data[info])
        var favoritos = data[info]
        var favoritoString = JSON.stringify(favoritos);

        let contador = 0
        let favorities = localStorage.getItem("Favoritos");
        favorities = "[" + favorities + "]"
        //console.log(favoritoString)
        console.log(favorities)
        if (favorities != "[null]") {
            favorities = JSON.parse(favorities);
            for (var i = 0; i < favorities.length; i++) {
                if (favoritos.id == favorities[i].id) {
                    contador = 1
                    console.log("Repetido")
                    body += `<p id="warning">La Película ingresada ya se encuentra almacenada</p>`
                    mensajes.innerHTML = body
                }
            }
            if (contador == 0) {
                favoritofinal.push(favoritoString)
                localStorage.setItem("Favoritos", favoritofinal);
                body += `<p id="success">Película agregada con éxito</p>`
                mensajes.innerHTML = body
            }


        } else {
            favoritofinal.push(favoritoString)
            localStorage.setItem("Favoritos", favoritofinal);
            body += `<p id="success">Película agregada con éxito</p>`
            mensajes.innerHTML = body
        }
    }

}

function Agregarfavorito() {

    mensajes = document.getElementById('sec-messages')
    var codigo = document.getElementById("codigo").value;
    var favoritoString = []
    let contador = 0
    let bandera = 0


    let body = ""
    let url = `https://api.themoviedb.org/3/movie/popular?api_key=efd50a2e67c9aad12da707e41cdf0736&language=es&page=${nroPagina}`;
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data.results))
        .catch(error => console.log(error))

    const mostrarData = (data) => {


        let favorities = localStorage.getItem("Favoritos");
        favorities = "[" + favorities + "]"
        //console.log(favoritoString)
        //console.log(favorities)
        if (favorities != "[null]") {
            favorities = JSON.parse(favorities);

            //Verifica que existe en la pagina
            for (var i = 0; i < data.length; i++) {
                if (codigo == data[i].id) {
                    favoritoString = data[i]
                    bandera = 1
                    console.log(bandera)
                    break
                }
            }

            //Verifica si esta en el local storage
            for (var i = 0; i < favorities.length; i++) {
                if (codigo == favorities[i].id) {
                    contador = 1
                    console.log("Repetido")
                    body += `<p id="warning">La Película ingresada ya se encuentra almacenada</p>`
                    mensajes.innerHTML = body
                    break
                }
            }

            if (contador == 0 && bandera == 1) {
                favoritoString = JSON.stringify(favoritoString)
                favoritofinal.push(favoritoString)
                localStorage.setItem("Favoritos", favoritofinal);
                body += `<p id="success">Película agregada con éxito</p>`
                mensajes.innerHTML = body
                console.log("Agregado exitosamente")
            }

            if (bandera == 0) {
                console.log("Noexiste")
                body += `<p id="error">Error: La Película seleccionada no se encuentra en la API o se produjo un error al consultar</p>`
                mensajes.innerHTML = body
            }
        } else {
            //Verifica que existe en la pagina
            for (var i = 0; i < data.length; i++) {
                if (codigo == data[i].id) {
                    console.log(data[i])
                    favoritoString = data[i]
                    console.log(favoritoString)
                    bandera = 1
                    break
                }
            }

            if (bandera == 1) {
                console.log("Primera entrada")
                //console.log(favoritoString)
                //favoritoString = JSON.parse.favoritoString
                //console.log (favoritoString)
                favoritoString = JSON.stringify(favoritoString)
                favoritofinal.push(favoritoString)
                localStorage.setItem("Favoritos", favoritofinal);
                body += `<p id="success">Película agregada con éxito</p>`
                mensajes.innerHTML = body
            } else {
                console.log("Noexiste")
                body += `<p id="error">Error: La Película seleccionada no se encuentra en la API o se produjo un error al consultar</p>`
                mensajes.innerHTML = body
            }
        }
    }
}







//funciona
/*function GuardarFavorito(nroPagina,info){
    let url = https://api.themoviedb.org/3/movie/popular?api_key=efd50a2e67c9aad12da707e41cdf0736&language=es&page=${nroPagina};
        fetch(url)
            .then( response => response.json() )
            .then( data => mostrarData(data.results) )
            .catch( error => console.log(error) )

        const mostrarData = (data) => {

            console.log(data[info])
            var favoritos = data[info] 
            var favoritoString = JSON.stringify(favoritos);
            favoritofinal.push(favoritoString)
            localStorage.setItem("Favoritos", favoritofinal);
            console.log(favoritofinal)
*/