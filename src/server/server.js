const express = require("express");
const app = express();
const fs = require("fs/promises");

const PORT = 5000;

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
  });

app.get("/collection", async (req, res) => {
  try {
    const tasks = await fs.readFile("./collection.json");
    res.send(JSON.parse(tasks));
  } catch (error) {
    res.status(500).send({ error });
  }
});

app.post("/collection", async (req, res) => {
  try {
    const pokemon = req.body;

    const listBuffer = await fs.readFile("./collection.json");
    const currentPokemons = JSON.parse(listBuffer);
    let maxPokemonId = 1;
    if (currentPokemons && currentPokemons.length > 0) {
      maxPokemonId = currentPokemons.reduce(
        (maxId, currentElement) =>
          currentElement.id > maxId ? currentElement.id : maxId,
        maxPokemonId
      );
    }
    const newPokemon = { id: maxPokemonId + 1, ...pokemon };
    const newList = currentPokemons
      ? [...currentPokemons, newPokemon]
      : [newPokemon];

    await fs.writeFile("./collection.json", JSON.stringify(newList));
    res.send(newPokemon);
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.delete("/collection/:id", async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id;
    const listBuffer = await fs.readFile("./collection.json");
    const currentCollection = JSON.parse(listBuffer);
    if (currentCollection.length > 0) {
      await fs.writeFile(
        "./collection.json",
        JSON.stringify(currentCollection.filter((task) => task.id != id))
      );
      res.send({ message: `Uppgift med id ${id} togs bort` });
    } else {
      res.status(404).send({ error: "Ingen uppgift att ta bort" });
    }
  } catch (error) {
    res.status(500).send({ error: error.stack });
  }
});

app.listen(PORT, () => console.log("Server running on http://localhost:5000"));
