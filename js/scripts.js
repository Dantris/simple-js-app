const pokemonRepository = (function () {
  const pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['grass', 'poison'],
    },
    {
      name: 'Charizard',
      height: 1.7,
      types: ['fire', 'flying'],
    },
    {
      name: 'Squirtle',
      height: 1,
      types: ['water'],
    },
    {
      name: 'Cubone',
      height: 0.4,
      types: ['Ground'],
    },
  ];

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
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Types: ${pokemon.types.join(', ')}`);
  }

  return {
    getAll: getAll,
    add: add,
    findByName: findByName,
    addListItem: addListItem,
  };
})();

const specialHeightThreshold = 1;

// Adding a new Pokémon
pokemonRepository.add({
  name: 'Pikachu',
  height: 0.4,
  types: ['electric'],
});

const pokemonList = pokemonRepository.getAll();
const pokemonListElement = document.querySelector('.pokemon-list');

// Loop through the Pokémon list and create buttons
pokemonList.forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
