// scripts.js

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

  /* function findByName(name) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name.toLowerCase() === name.toLowerCase();
    });
  }*/

  return {
    getAll: getAll,
    add: add,
    // findByName: findByName,
  };
})();

const specialHeightThreshold = 1;

pokemonRepository.add({
  name: 'Pikachu',
  height: 0.4,
  types: ['electric'],
});

pokemonRepository.getAll().forEach(function (pokemon) {
  const name = pokemon.name;
  const height = pokemon.height;
  document.write(`${name} (height: ${height})`);

  if (height > specialHeightThreshold) {
    document.write(" - Wow, that's big!");
  }

  document.write('<br>');
});
