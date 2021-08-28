import express from "express";
import File from "./src/model/File";

const app = express();

const PORT: string | number = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});

server.on("error", (error) => console.log("Error en servidor", error));

let counter = {
  visits: {
    items: 0,
    item: 0,
  },
};

let file = new File("products");

app.get("/items", async (req, res) => {
  counter.visits.items++;
  try {
    const items = await file.read();
    res.json({ items, qty: items.length });
  } catch (error) {
    res.json({ error: "There was an error" });
  }
});

app.get("/item-random", async (req, res) => {
  counter.visits.item++;
  try {
    const items = await file.read();
    res.json({ item: items[Math.floor(Math.random() * items.length)] });
  } catch (error) {
    res.json({ error: "There was an error" });
  }
});

app.get("/visits", (req, res) => {
  res.json(counter);
});

app.get("/visitas", (req, res) => {
  res.json({ error: "Did you mean /visits?" });
});
