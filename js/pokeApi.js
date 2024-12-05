const API_ALBUM = "https://pokeapi.co/api/v2/pokemon";

function getAlbum(api) {
    fetch(api).then((response) => response.json())
        .then(async (json) => {
            await fillData(json.results), pagination(json);
        })
        .catch((error) => {
            console.log(error, "Error consumiendo la API");
        })
}

async function fillData(results) {
    let cards = "";
    for (let i = 0; i < 20; i++) {
        try {
            //acceder a los detalles de cada pokemon
            const response = await fetch(results[i].url);
            const pokemon = await response.json();

            cards += `<div class= "col">
            <div class= "card h-100" style= "width: 12rem;">
            <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="img-personaje">
            <h2 class="card-title" > ${pokemon.name} </h2>
            <div class="card-body">
            <h5 class="card-title">Altura: ${pokemon.height}</h5>
            <h5 class="card-title">Peso: ${pokemon.weight}</h5>
            <h5 class="card-title">Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</h5>
            </div>
            </div>
            </div>
            `
        } catch (error) {
            console.log(`Error al obtener los datos para ${results[i]} :`,error)
        }
    }
    document.getElementById("dataAlbum").innerHTML = cards;

}

function pagination(json) {

    let prevDisabled = "";
    let nextDisabled = "";

    if (!json.previous) {
        prevDisabled = "disabled";
    }
    if (!json.next) {
        nextDisabled = "disabled";

    }

    let html = `
  <li class="page-item ${prevDisabled}"><a  class="page-link" onclick="getAlbum('${json.previous}')" >prev</a></li>
  <li class="page-item ${nextDisabled}"><a  class="page-link" onclick="getAlbum('${json.next}')" >next</a></li>
  `;

    document.getElementById("pagination").innerHTML = html;
}

getAlbum(API_ALBUM)
