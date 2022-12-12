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
  renderList(searchResults);
});

const renderList = (list) => {
  const existingElement = document.getElementById("thelist");
  const root = document.getElementById("root");

  if (existingElement) {
    existingElement.remove();
  }

  list.length > 0 &&
    searchField.value &&
    root.insertAdjacentHTML("beforeend", PokemonList(list));

  const forms = document.querySelectorAll(".submitForm");
  console.log(forms);
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(e.target[0].value);
    });
  });
};

const button = document.getElementById("button");

button.addEventListener("click", () => {
  console.log(pokemonList[0]);
  pokemonList.filter(({ name }) => {
    console.log(name);
  });
});
