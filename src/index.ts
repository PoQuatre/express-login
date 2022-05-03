import "dotenv/config";

import express from "express";
import { engine } from "express-handlebars";
import mongoose from "mongoose";
import morgan from "morgan";

if (!process.env.MONGO_URL) {
  throw new Error("The environment variable `MONGO_URL` was not set!");
}

mongoose.connect(process.env.MONGO_URL);

const PORT = process.env.PORT || 3000;
const app = express();

app.engine("hbs", engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(express.static("public"));
app.use(morgan("common"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`The server is now listening on http://localhost:${PORT}`);
});
