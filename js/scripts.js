const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

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
    button.classList.add('pokemon-button');

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);

    button.addEventListener('click', function () {
      showDetails(pokemon); // Call showDetails here
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
        pokemon.height = data.height / 10; // Convert height to meters
      })
      .catch((error) => {
        console.error(`Error loading details for ${pokemon.name}`, error);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon)
      .then(() => {
        console.log(`Name: ${pokemon.name}`);
        console.log(`Height: ${pokemon.height}`);
        console.log(`Image URL: ${pokemon.imgUrl}`);
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

const specialHeightThreshold = 1;

const pokemonListElement = document.querySelector('.pokemon-list');

// Load the Pokémon list from the external source and then populate the list
pokemonRepository.loadList().then(function () {
  const pokemonList = pokemonRepository.getAll();
  pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
