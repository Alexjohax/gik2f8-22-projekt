let pokemonList = [];
const searchField = document.getElementById("searchField");
const loadingText = document.getElementById("loading");

window.addEventListener("load", () => {
  getAll().then((pokemons) => {
    //localStorage.setItem("pokeList", JSON.stringify(pokemons));
    console.log(pokemons);
    pokemonList = pokemons.data;
    console.log(pokemons.data);
    console.log(typeof pokemonList);
    searchField.classList.remove("hidden");
    loadingText.classList.add("hidden");
  });
});

const searchInput = document.getElementById("searchField");
searchInput.addEventListener("keyup", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const searchResults = pokemonList.filter(
    ({ name }) => name.toLowerCase().indexOf(searchTerm) >= 0
  );
  console.log(searchResults);
});

const button = document.getElementById("button");

button.addEventListener("click", () => {
  console.log(pokemonList[0]);
  pokemonList.filter(({ name }) => {
    console.log(name);
  });
});
