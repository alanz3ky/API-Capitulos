function createEpisodesContainer(){
    const episodesContainer  = document.createElement('div');
    episodesContainer.id = "episodes-container";
    episodesContainer.className = 'grid-container';
    document.body.appendChild(episodesContainer);
}

function fetchEpisodes() {
    const apiUrl = 'https://rickandmortyapi.com/api/episode/';
    let allEpisodes = [];
    let nextUrl = apiUrl;

    function fetchData(url) {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                allEpisodes = allEpisodes.concat(data.results);
                nextUrl = data.info.next;
                if (nextUrl) {
                    return fetchData(nextUrl);
                } else {
                    return allEpisodes;
                }
            });
    }

    fetchData(apiUrl).then(allEpisodes => {
        // Filtrar episodios impares
        const oddEpisodes = allEpisodes.filter(episode => {
            const episodeNumber = parseInt(episode.id, 10);
            return episodeNumber % 2 !== 0;
        });

        // Mostrar episodios en una cuadrícula
        const container = document.getElementById('episodes-container');
        oddEpisodes.forEach(episode => {
            const episodeCard = document.createElement('div');
            episodeCard.className = 'episode-card';

            const episodeTitle = document.createElement('h2');
            episodeTitle.textContent = episode.name;

            const episodeId = document.createElement('p');
            episodeId.textContent = `Episode Id: ${episode.id}`;

            const episodeCode = document.createElement('p');
            episodeCode.textContent = `Episode Code: ${episode.episode}`;

            const episodeCharactersCount = document.createElement('p');
            episodeCharactersCount.textContent = `Number of Characters: ${episode.characters.length}`;

            const episodeAirDate = document.createElement('p');
            episodeAirDate.textContent = `Air Date: ${episode.air_date}`;

            // Añadir evento click a la tarjeta del episodio
            episodeCard.addEventListener('click', () => {
                alert(`Episode: ${episode.name}\nEpisode Code: ${episode.episode}\nAir Date: ${episode.air_date}\nNumber of Characters: ${episode.characters.length}`);
            });
            
            // Añadir evento mouseover y mouseout para añadir información adicional
            episodeCard.addEventListener('mouseover', () => {
                episodeCard.style.backgroundColor = '#add8e6';

                const extraInfo = document.createElement('p');
                extraInfo.textContent = `This is additional info for episode: ${episode.name}`;
                extraInfo.className = 'extra-info';
                episodeCard.appendChild(extraInfo);

            });

            episodeCard.addEventListener('mouseout', () => {
                episodeCard.style.backgroundColor = '';
                const extraInfo = episodeCard.querySelector('.extra-info');
                if (extraInfo) {
                    episodeCard.removeChild(extraInfo);
                }

            });

            episodeCard.appendChild(episodeTitle);
            episodeCard.appendChild(episodeId);                    
            episodeCard.appendChild(episodeCode);
            episodeCard.appendChild(episodeCharactersCount);
            episodeCard.appendChild(episodeAirDate);

            container.appendChild(episodeCard);
        });
        // Añadir evento keydown para cambiar el color de fondo de las tarjetas
        document.addEventListener('keydown', (event) => {
            if (event.key === 'b') {
                document.querySelectorAll('.episode-card').forEach(card => {
                    card.style.backgroundColor = 'yellow';
                });
            }
        });
    }).catch(error => {
        console.error('Error fetching episodes:', error);
    });
}
createEpisodesContainer();
fetchEpisodes();