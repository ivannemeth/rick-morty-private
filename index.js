import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");

    if (response.ok) {
      // Success (Good Response)
      const data = await response.json();
      console.log(data.results);
      /*const characters = data.result.map((character) => {
        createCharacterCard(character);
        cardContainer.innerHTML = "";
        cardContainer.append(...characters);
      }); */
      data.results.forEach((character) => {
        const characterCard = createCharacterCard(character);
        // cardContainer.innerHTML = "";
        cardContainer.append(characterCard);
        console.log(cardContainer);
      });
    } else {
      // Failure (Bad Response)
      console.error("Bad Response");
    }
  } catch (error) {
    // Failure (Network error, etc)
    console.error("An Error occurred");
  }
}

fetchCharacters();
