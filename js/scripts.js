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
        // Create a Pokémon card for each entry
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png" alt="${pokemon.name}">
                  <h3>${pokemon.name}</h3>
              `;
        card.addEventListener('click', () => {
          // Display Pokémon details in the modal when a card is clicked
          modalTitle.textContent = `${pokemon.name}`;
          modalImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`;
          modalHeight.textContent = `Height: ${Math.floor(
            Math.random() * 100
          )} cm`; // Replace with actual data
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
});

const backButton = document.getElementById('back-to-top');

// Show or hide the button based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backButton.style.display = 'block';
  } else {
    backButton.style.display = 'none';
  }
});

// Scroll to the top when the button is clicked
backButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to top
});
