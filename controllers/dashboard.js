//' MODELS

const Dashboard_model = require("../models/home");

//' FUNÇÕES DO CONTROLLER

const dashboard_get = async (req, res) => {
  try {
    const found = await Dashboard_model.find();
    if (req.session.userid) {
      res.render("index.ejs", { data: found, admin: req.session });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const dashboard_get_search = (req, res) => {
  var search = req.params.search;

  var obj = new RegExp(search, "i");
  Dashboard_model.find({ title: obj }).then((found) => {
    res.json(found);
  });
};

const dashboard_get_card = (req, res) => {
  res.render("./templates/card.ejs", { video: undefined, admin: false });
};

//' LIGAÇÃO COM ROUTER HOME
module.exports = {
  dashboard_get,
  dashboard_get_search,
  dashboard_get_card,
};
