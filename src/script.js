let pokemonList;
const searchField = document.getElementById("searchField");
const searchFieldLabel = document.getElementById("searchFieldLabel");
console.log(searchFieldLabel.innerHTML);
searchField.setinnerHTML = "Loading...";

window.addEventListener("load", () => {
  getAll().then((pokemons) => {
    //localStorage.setItem("pokeList", JSON.stringify(pokemons));
    console.log(pokemons);
    pokemonList = pokemons;
    searchField.classList.remove("hidden");
  });
});

console.log(pokemonList);

const button = document.getElementById("button");

button.addEventListener("click", () => {
  console.log(pokemonList);
});
