let pokemonList;
const searchField = document.getElementById("searchField");
const loadingText = document.getElementById("loading");

window.addEventListener("load", () => {
  getAll().then((pokemons) => {
    //localStorage.setItem("pokeList", JSON.stringify(pokemons));
    console.log(pokemons);
    pokemonList = pokemons;
    searchField.classList.remove("hidden");
    loadingText.classList.add("hidden");
  });
});

const searchInput = document.getElementById("searchField");
searchInput.addEventListener("keyup", (e) => {
  pokemonList.filter(({ name }) => {
    const searchTerm = e.target.value.toLowerCase();
    return name.toLowerCase().indexOf(searchTerm) >= 0;
  });
});

const button = document.getElementById("button");

button.addEventListener("click", () => {
  console.log(pokemonList);
});
