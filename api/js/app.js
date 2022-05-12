window.addEventListener("load", () => {
    cargarPeliculas()
});

let pagina = 1;

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

btnAnterior.addEventListener("click",()=>{
    if(pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

btnSiguiente.addEventListener("click",()=>{
    if(pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

const cargarPeliculas = async () => {
    try{
        const respuesta = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=191528030c357419329af1198edbcb24&language=es-MX&page='+pagina)
        console.log(respuesta.status);
        let peliculas = "";
        if(respuesta.status === 200){
            const datos = await respuesta.json();
            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="pelicula">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `
            });
        }else if (respuesta.status===401){console.log("no tiene la api_key correcta");}
        else if (respuesta.status===404){console.log("Lo buscado no esta disponible");}
        else {console.log("error desconocido no sabemos de donde viene");}
        document.getElementById("contenedor").innerHTML=peliculas;
    } catch (error) {
        console.log(error.message);
    }
}