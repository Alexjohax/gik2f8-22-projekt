//window.onload = () => renderPokemon();
let pokemonList = [];
const searchField = document.getElementById("searchField");
const loadingText = document.getElementById("loading");

const api = new Api("http://localhost:5000/collection");

window.addEventListener("load", () => {
  getAll().then((pokemons) => {
    //localStorage.setItem("pokeList", JSON.stringify(pokemons));
    console.log(pokemons);
    pokemonList = pokemons.data;
    console.log(pokemons.data);
    console.log(typeof pokemonList);
    searchField.classList.remove("hidden");
    loadingText.classList.add("hidden");
    loader.classList.add("hidden");
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
      const name =
        e.target.parentNode.previousSibling.previousSibling.children[0]
          .innerHTML;
      const comment = e.target[0].value;
      const image =
        e.target.parentNode.previousSibling.previousSibling.children[1].src;

      //console.log(e.target[0].value);
      console.log(name, comment, image);
      saveTask(name, comment, image);
      //Hantera put till server här, skicka med value, id .
    });
  });
};

///test för api save osv
function saveTask(name, comment, image) {
  const task = {
    name: name,
    comment: comment,
    image: image,
  };
  api.create(task).then((task) => {
    if (task) {
      console.log(task);
    }
  });
}

const button = document.getElementById("button");

button.addEventListener("click", () => {
  const modal = document.getElementById("modal");
  //modal.classList.remove("hidden");
  renderPokemon();
  openModal(true);
});

/* Renderar pokemons på modalens div, slideshow */
function renderPokemon() {
  api.getAll().then((pokemons) => {
    //const modalContent = document.getElementById("modal-content");
    const slideshow = document.getElementById("slideshow");
    pokemons.forEach((pokemon) => {
      slideshow.insertAdjacentHTML(
        "beforeend",
        `<div class="pixel-border slide-item flex justify-evenly mx-auto flex-col basis-1/4 gap-2 px-10 py-10">
          <p class="flex justify-between text-xl uppercase font-bold">${pokemon.name}<i id="${pokemon.id}" class="far fa-trash-alt text-red-600 text-2xl hover:scale-125 hover:-translate-y-2 cursor-pointer"></i></p>
          <img src="${pokemon.image}" alt="${pokemon.name}" width="300" height="500" class="hover:scale-150 rounded-lg transition-all duration-300 hover:shadow-yellow-400 hover:shadow-2xl" />
          <p class="comment">${pokemon.comment}</p>
      </div>`
      );
      const removePokemonBtn = document.getElementById(pokemon.id);
      removePokemonBtn.addEventListener("click", (e) => {
        api.remove(e.target.id).then((data) => {
          slideshow.innerHTML = "";
          renderPokemon();
        });
      });
    });
  });
}
//Logik för modal
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById("closeBtn");

closeBtn.addEventListener("click", () => {
  //const slideshow = document.getElementById("slideshow");
  //modal.classList.add("hidden");
  openModal(false);
  slideshow.innerHTML = "";
  console.log("sliden: ", slideshow);
});
window.onclick = function (event) {
  if (event.target == modal) {
    //const slideshow = document.getElementById("slideshow");
    //modal.classList.add("hidden");
    openModal(false);
    slideshow.innerHTML = "";
  }
};

/// test

const modal_overlay = document.querySelector("#modal");
const modalContent = document.querySelector("#modal-content");

function openModal(value) {
  const modalCl = modalContent.classList;
  const overlayCl = modal_overlay;

  if (value) {
    overlayCl.classList.remove("hidden");
    setTimeout(() => {
      modalCl.remove("opacity-0");
      modalCl.remove("-translate-y-full");
      modalCl.remove("scale-150");
    }, 100);
  } else {
    modalCl.add("-translate-y-full");
    setTimeout(() => {
      modalCl.add("opacity-0");
      modalCl.add("scale-150");
    }, 100);
    setTimeout(() => overlayCl.classList.add("hidden"), 300);
  }
}
