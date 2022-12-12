const PokemonListItem = (pokemon) => {
  let html = `
      <li id="${pokemon.id}" class="pokemon-list__item mb-2 mx-2 last:mb-0 p-3 text-indigo-800 
      last:border-b-0 border-b border-indigo-500 cursor-pointer flex justify-between items-center">
      <p>${pokemon.name}</p>
      <img src="${pokemon.images.small}" width="150" height="200" />
      </li>
      `;

  return html;
};
