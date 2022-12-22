const PokemonList = (list) => {
  let html = `<ul id="thelist" class="pokemon-list pixel-corners rounded-md border-2 border-blue-400 bg-white w-full mx-auto max-h-96 overflow-y-scroll">`;
  for (let i = 0; i < list.length; i++) {
    html += PokemonListItem(list[i]);
  }
  html += `</ul>`;

  return html;
};
