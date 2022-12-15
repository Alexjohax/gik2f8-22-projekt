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
  renderPokemon();
  console.log(pokemonList[0]);
  pokemonList.filter(({ name }) => {
    console.log(name);
  });
});

/* Renderar pokemons på modalens div, slideshow */
function renderPokemon() {
  api.getAll().then((pokemons) => {
    const modal = document.getElementById("slideshow");
    pokemons.forEach((pokemon) => {
      modal.insertAdjacentHTML(
        "beforeend",
        `<div class="flex flex-col gap-2 mx-3">
      <p>${pokemon.name}</p>
      <img src="${pokemon.image}" alt="${pokemon.name}" width="300" height="500" />
      </div>`
      );
    });

    /// test för slider
    /* Sätter slick slider på div med namnet slideshow */
    $(document).ready(function () {
      $(".slideshow").slick({
        centerMode: true,
        centerPadding: "60px",
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "40px",
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: "40px",
              slidesToShow: 1,
            },
          },
        ],
      });
    });
  });
}
//Logik för modal
const modal = document.getElementById("modal");
const modalBtn = document.getElementById("modalBtn");
const closeBtn = document.getElementById("closeBtn");
