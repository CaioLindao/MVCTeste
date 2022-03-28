//' BIBLIOTECAS

const mongoose = require("mongoose");

//' SCHEMA

const Schema = mongoose.Schema;

const homeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

//' CONECTA COM CONTROLLER HOME E CREATE
// Exporta a classe Home
// O primeiro parâmetro da chamada abaixo é o nome da coleção no mongoDB (Sempre colocar no singular)
const Home = mongoose.model("Video", homeSchema);
module.exports = Home;
