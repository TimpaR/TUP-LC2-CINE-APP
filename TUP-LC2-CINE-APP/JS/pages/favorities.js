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
            body += `<div class="contenedorPeliculas" > 
            <img src="https://image.tmdb.org/t/p/w500/${favorities[i].poster_path}">
            <h3> ${favorities[i].title} </h3>
            <p><b>Código:</b> ${favorities[i].id}<br>
            <b>Título original:</b> ${favorities[i].original_title}<br>
            <b>Idioma original:</b> ${favorities[i].original_language}<br>
            <b>Resumen:</b> ${favorities[i].overview}</p>
            <div id="contPeliculas-boton">
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
    if (favorities.length != 1){
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
        
        
    }else{
        localStorage.removeItem("Favoritos");
    }
    
    location.reload();

}
