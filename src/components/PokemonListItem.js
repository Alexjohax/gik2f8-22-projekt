const PokemonListItem = (pokemon) => {
  let html = `
      <li id="${pokemon.id}" class="pokemon-list__item mb-2 mx-2 last:mb-0 p-3 text-indigo-800 
      last:border-b-0 border-b border-indigo-500 cursor-pointer flex justify-between items-center">
      <p>${pokemon.name}</p>
      <img src="${pokemon.images.small}" width="150" height="200" />
      <div>
      <form>
        <label for="comment">Lägg till en kommentar</label>
        <input type="text" id="comment" name="comment" placeholder="Skriv något..." />
        <button>Add to collection</button>
      </form>
      </div>
      
      </li>
      `;

  return html;
};
