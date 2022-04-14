//' BIBLIOTECAS

const ejs = require("ejs");

//' MODELS

const Home_model = require("../models/home");

//' FUNÇÕES DO CONTROLLER

const home_get = async (req, res) => {
  let find = await Home_model.find();
  let allTags = await Home_model.find({}, "tags");
  let searchByTags = new Array();

  allTags.forEach((video) => {
    video["tags"].forEach((tag) => {
      if (!searchByTags.includes(tag) && searchByTags.length <= 10) {
        searchByTags.push(tag);
      }
    });
  });

  try {
    let data = [];

    find.forEach((video, index) => {
      if (index <= 4) {
        let title = video.title;
        let url = video.url;
        let tags = video.tags;
        data.push({ title, url, tags });
      }
    });

    res.render("index.ejs", { data, admin: false, searchByTags });
  } catch (error) {
    res.render("index.ejs", { data: false, admin: false, searchByTags });
  }
};

const home_get_more = async (req, res) => {
  let find = await Home_model.find();
  let page = req.params.page;

  find = find.splice(5 * page, 5);

  let data = [];

  find.forEach((video, index) => {
    if (index <= 4) {
      let title = video.title;
      let url = video.url;
      let tags = video.tags;
      data.push({ title, url, tags });
    }
  });

  res.send(data);
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
    res.status(404).send("Nenhum vídeo encontrado");
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
  home_get_more,
};
