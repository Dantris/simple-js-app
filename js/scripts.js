document.addEventListener('DOMContentLoaded', function () {
  const pokemonRepository = (function () {
    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
      return pokemonList;
    }

    function add(item) {
      if (typeof item === 'object') {
        pokemonList.push(item);
      } else {
        console.error('Invalid data type. Only objects can be added.');
      }
    }

    function findByName(name) {
      return pokemonList.filter(function (pokemon) {
        return pokemon.name.toLowerCase() === name.toLowerCase();
      });
    }

    function addListItem(pokemon) {
      const listItem = document.createElement('li');
      const button = document.createElement('button');

      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-primary');

      listItem.appendChild(button);
      document.querySelector('.pokemon-list').appendChild(listItem);

      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
    }

    function loadList() {
      return fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          data.results.forEach((item) => {
            const pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch((error) => {
          console.error('Error loading Pokémon list', error);
        });
    }

    function loadDetails(pokemon) {
      const url = pokemon.detailsUrl;
      return fetch(url)
        .then((response) => response.json())
        .then((data) => {
          pokemon.imgUrl = data.sprites.front_default;
          pokemon.height = data.height / 10;
        })
        .catch((error) => {
          console.error(`Error loading details for ${pokemon.name}`, error);
        });
    }

    function showDetails(pokemon) {
      loadDetails(pokemon)
        .then(() => {
          const modal = document.getElementById('modal');
          const modalTitle = document.querySelector('.modal-title');
          const modalHeight = document.querySelector('#modal-height');
          const modalImage = document.querySelector('#modal-image');

          modalTitle.textContent = `Name: ${pokemon.name}`;
          modalHeight.textContent = `Height: ${pokemon.height} meters`;
          modalImage.src = pokemon.imgUrl;

          $('#modal').modal('show');
        })
        .catch((error) => {
          console.error('Error loading Pokémon details', error);
        });
    }

    return {
      getAll: getAll,
      add: add,
      findByName: findByName,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
    };
  })();

  const pokemonListElement = document.querySelector('.pokemon-list');

  pokemonRepository.loadList().then(function () {
    const pokemonList = pokemonRepository.getAll();
    pokemonList.forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });

  // Close the modal with the 'Esc' key
  window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      $('#modal').modal('hide');
    }
  });
});
