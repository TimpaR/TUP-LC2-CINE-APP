let nroPagina = 1
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
            <button id="agregarPelicula">Agregar a Favoritos</button>
        </div>
        </div>`
        }
        resultados.innerHTML = body
    }
}

mostrarPeliculas(1)

function btnAnterior(nroPagina) {
    if (nroPagina > 1) {
        nroPagina -= 1
        mostrarPeliculas(nroPagina)
    } else {
        nroPagina -= 1
        mostrarPeliculas(nroPagina)
    }
    console.log(nroPagina)
}

function btnSiguiente() {
    nroPagina += 1
    mostrarPeliculas(nroPagina)
    console.log(nroPagina)
}