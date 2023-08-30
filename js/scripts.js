document.addEventListener('DOMContentLoaded', function () {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  const pokemonList = document.getElementById('pokemonList');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalHeight = document.getElementById('modalHeight');
  const closeButton = document.getElementById('closeButton');

  // Fetch Pokémon data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.results.forEach((pokemon, index) => {
        // Calculate the Pokémon number and format it as "Number: #001"
        const pokemonNumber = `#` + (index + 1).toString().padStart(3, '0');

        // Create a Pokémon card for each entry with Bootstrap classes and inline styles
        const card = document.createElement('div');
        card.classList.add('card', 'col-md-2', 'custom-card');
        card.style.width = '100%';
        card.style.marginBottom = '20px';
        card.style.backgroundColor = 'white';
        card.style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2)';
        card.style.transition = 'transform 0.2s';
        card.style.cursor = 'pointer';
        card.style.textAlign = 'center';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'center';
        card.style.borderRadius = '5px';
        card.style.margin = '10px';

        card.innerHTML = `
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png" alt="${pokemon.name}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title text-capitalize">${pokemon.name}</h5>
            <p class="card-text">${pokemonNumber}</p> <!-- Display Pokémon number -->
          </div>
        `;

        // Display Pokémon details in the modal when a card is clicked
        card.addEventListener('click', async () => {
          // Select the modal elements
          const modalTitle = document.getElementById('modalTitle');
          const modalImage = document.getElementById('modalImage');
          const modalHeight = document.getElementById('modalHeight');

          // Update modal content
          const capitalizedPokemonName =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          modalTitle.textContent = capitalizedPokemonName; // Capitalize the name
          modalTitle.classList.add('text-center'); // Center the name
          modalImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`;
          modalImage.style.width = '300px'; // Increase the image size

          // Fetch the actual height data from the Pokémon API
          const heightResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${index + 1}`
          );
          const heightData = await heightResponse.json();
          const pokemonHeight = heightData.height * 10; // Convert height from decimeters to centimeters

          modalHeight.textContent = `Height: ${pokemonHeight} cm`;

          // Center modal content
          modalImage.style.display = 'block';
          modalImage.style.margin = '0 auto';
          modalHeight.style.textAlign = 'center';

          modal.style.display = 'block';
        });

        pokemonList.appendChild(card);
      });
    });

  // Close the modal when the close button is clicked
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close the modal when clicking outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Close the modal with the 'Esc' key
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
    }
  });

  const backButton = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      backButton.style.display = 'block';
    } else {
      backButton.style.display = 'none';
    }
  });

  // Scroll to the top when the button is clicked
  backButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
