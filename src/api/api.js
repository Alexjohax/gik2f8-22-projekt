// https://api.pokemontcg.io/v2/cards/
const url = "https://api.pokemontcg.io/v2/cards/";

async function getAll() {
  const response = await fetch(url)
    .then((response) => response.json())
    .catch((e) => console.log(e));
  return response;
}

class Api {
  url = "";

  constructor(url) {
    this.url = url;
  }

  create(data) {
    const JSONData = JSON.stringify(data);
    console.log(`Sending ${JSONData} to ${this.url}`);

    const request = new Request(this.url, {
      method: "POST",
      body: JSONData,
      headers: {
        "content-type": "application/json",
      },
    });

    return fetch(request)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  getAll() {
    return fetch(this.url)
      .then((result) => result.json())
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  remove(id) {
    console.log(`Removing ${id} from ${this.url}`);

    return fetch(`${this.url}/${id}`, {
      method: "DELETE",
    })
      .then((result) => result)
      .catch((err) => console.log(err));
  }
}
