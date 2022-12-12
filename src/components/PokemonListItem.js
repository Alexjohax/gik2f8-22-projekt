const PokemonListItem = (pokemon) => {
  let html = `
      <li id="${pokemon.id}" class="pokemon-list__item mb-2 mx-2 last:mb-0 p-3 text-indigo-800 
      last:border-b-0 border-b border-indigo-500 cursor-pointer flex justify-between items-center">
      <div class="flex-1">
      <p class="">${pokemon.name}</p>
      <img src="${pokemon.images.small}" width="150" height="200" />
      </div>
      <div class="flex-1">
      <form class="submitForm flex flex-col">
        <label for="comment">Lägg till en kommentar</label>
        <input class="border border-red-600" type="text" id="comment" name="comment" placeholder="Skriv något..." />
        <button class="comment-button">Add to collection</button>
      </form>
      </div>
      
      </li>
      `;

  return html;
};
