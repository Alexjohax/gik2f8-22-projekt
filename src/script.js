let pokemonList;

window.addEventListener("load", () => {
  getAll().then((pokemons) => {
    localStorage.setItem("pokeList", JSON.stringify(pokemons));
    console.log(pokemons);
    pokemonList = pokemons;
  });
});

console.log(pokemonList);
