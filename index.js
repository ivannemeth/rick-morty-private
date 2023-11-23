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
const maxPage = 42;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );

    if (response.ok) {
      // Success (Good Response)
      const data = await response.json();
      console.log("data", data);
      const characterArray = data.results;
      cardContainer.innerHTML = "";
      //console.log(characterArray);
      /*const characters = data.result.map((character) => {
        createCharacterCard(character);
        cardContainer.innerHTML = "";
        cardContainer.append(...characters);
      }); */
      characterArray.forEach((character) => {
        const characterCard = createCharacterCard(character);

        cardContainer.append(characterCard);
        //console.log(cardContainer);
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

function updatePagination() {
  pagination.textContent = `${page} / ${maxPage}`;
}

prevButton.addEventListener("click", (event) => {
  //console.log("working");
  if (page > 1) {
    page--;
    fetchCharacters();
    updatePagination();
  }
});

nextButton.addEventListener("click", (event) => {
  //console.log("working");
  if (page < maxPage) {
    page++;
    fetchCharacters();
    updatePagination();
  }
});

searchBar.addEventListener("input", (event) => {
  searchQuery = event.target.value;
  fetchCharacters(searchQuery);
});

fetchCharacters();
