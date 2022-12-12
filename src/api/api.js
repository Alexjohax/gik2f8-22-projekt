// https://api.pokemontcg.io/v2/cards/
const url = "https://api.pokemontcg.io/v2/cards/";

async function getAll() {
  const response = await fetch(url)
    .then((response) => response.json())
    .catch((e) => console.log(e));
  return response;
}
