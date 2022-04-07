//' BIBLIOTECAS

const ejs = require("ejs");

//' MODELS

const Home_model = require("../models/home");

//' FUNÇÕES DO CONTROLLER

const home_get = async (req, res) => {
  let find = await Home_model.find();

  try {
    let data = [];

    find.forEach((video, index) => {
      if (index == 5) {
        return;
      }

      let title = video.title;
      let url = video.url;
      let tags = video.tags;
      data.push({ title, url, tags });
    });

    res.render("index.ejs", { data, admin: false });
  } catch (error) {
    res.render("index.ejs", { data: false, admin: false });
  }
};

const home_get_search = async (req, res) => {
  let search = req.params.search;

  // console.log(search);
  let obj = new RegExp(search, "i");
  let find = await Home_model.find({ $or: [{ title: obj }, { tags: obj }] });

  try {
    var data = [];

    find.forEach((video, index) => {
      if (index == 5) {
        return;
      }

      let title = video.title;
      let url = video.url;
      let tags = video.tags;
      data.push({ title, url, tags });
    });

    if (data[0] == undefined) {
      throw "No results found for " + search;
    } else {
      // console.log(data.length);
      res.json(data);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Nenhum vídeo encontrado");
  }
};

const home_get_card = (req, res) => {
  res.render("./templates/card.ejs", { video: undefined, admin: false });
};

//' LIGAÇÃO COM ROUTER HOME
module.exports = {
  home_get,
  home_get_search,
  home_get_card,
};
