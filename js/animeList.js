const API = "https://api.jikan.moe/v4/anime";
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("btn-search");

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
        searchAnime(searchTerm);
    }
});

function searchAnime(query) {
    const searchAPI = `${API}?q=${encodeURIComponent(query)}&limit=12`;
    fetch(searchAPI)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.data);
        })
        .catch((error) => {
            console.log(error, "Error buscando anime");
        });
}

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            console.log(json.data)
            fillData(json.data);
        })
        .catch((error) => {
            console.log(error, "Error consumiendo la API");
        });
}

function fillData(results) {
    let cards = results.map(anime => `
        <div class="col">
            <div class="card h-100">
                <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
                <div class="card-body">
                    <h5 class="card-title">${anime.title}</h5>
                    <p class="card-text">
                        <strong>Tipo:</strong> ${anime.type || 'N/A'}<br>
                        <strong>Estado:</strong> ${anime.status || 'N/A'}<br>
                        <strong>Episodios:</strong> ${anime.episodes || 'N/A'}<br>
                        <strong>Calificación:</strong> ${anime.score || 'N/A'}<br>
                        <strong>Géneros:</strong> ${anime.genres.map(genre => genre.name).join(', ') || 'N/A'}<br>
                        <strong>Año:</strong> ${anime.year || 'N/A'}<br>
                        <strong>Temporada:</strong> ${anime.season || 'N/A'}
                    </p>
                    <a href="${anime.url}" target="_blank" class="btn btn-primary">Más información</a>
                </div>
            </div>
        </div>
    `).join('');

    document.getElementById("dataAlbum").innerHTML = cards;
}

// Carga inicial
getAlbum(API);