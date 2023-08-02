let pokemonList = [
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

const specialHeightThreshold = 1;

for (let i = 0; i < pokemonList.length; i++) {
  const pokemon = pokemonList[i];
  const name = pokemon.name;
  const height = pokemon.height;
  document.write(`${name} (height: ${height})`);

  if (height > specialHeightThreshold) {
    document.write(" - Wow, that's big!");
  }

  document.write('<br>'); // Add a line break after each Pokémon entry
}
