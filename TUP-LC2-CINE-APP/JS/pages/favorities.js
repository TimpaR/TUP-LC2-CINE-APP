function mostrarpeliculas() {
    var resultados = document.getElementById('sec_peliculas');
    var mensaje = document.getElementById("sec-messages")
    var body = ""
    let favorities = localStorage.getItem("Favoritos");
    favorities = "[" + favorities + "]"
    if (favorities != "[null]") {
        favorities = JSON.parse(favorities);
        console.log(favorities)
        for (var i = 0; i < favorities.length; i++) {
            let trailer1 = trailer(favorities[i].id)
            body += `<div class="contenedorPeliculas" > 
            <img src="https://image.tmdb.org/t/p/w500/${favorities[i].poster_path}">
            <h3> ${favorities[i].title} </h3>
            <p><b>Código:</b> ${favorities[i].id}<br>
            <b>Título original:</b> ${favorities[i].original_title}<br>
            <b>Idioma original:</b> ${favorities[i].original_language}<br>
            <b>Resumen:</b> ${favorities[i].overview}</p>
            <div id="contPeliculas-boton">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer1}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
               <div class="botones">
            <button id="agregarPelicula" onclick="quitarfavoritos(${i})">Quitar de Favoritos</button>
            </div>
            </div>`
        }

        resultados.innerHTML = body
    }
    else {
        body += `<p id="warning">No tiene peliculas seleccionadas en favoritos</p>`
        mensaje.innerHTML = body
    }

}
mostrarpeliculas()

function quitarfavoritos(i) {
    let favorities = localStorage.getItem("Favoritos");
    favorities = "[" + favorities + "]";
    favorities = JSON.parse(favorities);

    let favoritosnuevo = JSON.stringify(favorities); // Convertir a JSON una vez fuera del bucle
    let eliminar = JSON.stringify(favorities[i]);
    if (favorities.length != 1) {
        for (var j = 0; j < favorities.length; j++) {
            if (favorities[j] == favorities[i]) {
                if (j == 0) {
                    eliminar += ",";
                } else if (j == favorities.length - 1) {
                    eliminar = "," + eliminar;
                    console.log("Paso por aca2");
                } else {
                    eliminar = "," + eliminar;
                    console.log("Paso por aca3");
                }
            }
        }

        let favoritoultimo = favoritosnuevo.replace(eliminar, "");
        favoritoultimo = favoritoultimo.slice(1, -1);
        localStorage.setItem("Favoritos", favoritoultimo);


    } else {
        localStorage.removeItem("Favoritos");
    }

    location.reload();

}

function trailer(id) {
    let url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=efd50a2e67c9aad12da707e41cdf0736&language=en-US`;
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarData(data.results))
        .catch(error => console.log(error))

    const mostrarData = (data) => {
        console.log(data)

        for (var i = 0; i < data.length; i++){
            if (data[i].name == "Official Trailer") {
                
                return data[i].key
            }
        }


    }


}