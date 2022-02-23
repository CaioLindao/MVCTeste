//' MODELS

const Dashboard_model = require("../models/home");

//' BIBLIOTECAS

const path = require("path");
const { redirect } = require("express/lib/response");

//' FUNÇÕES DO CONTROLLER

const dashboard_get = (req, res) => {
    Dashboard_model.find()
        .then((found) => {
            if (req.session.userid) {
                console.log(req.session)
                res.render("index.ejs", { data: found, admin: req.session });
            } else {
                res.redirect("/home");
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

const dashboard_get_search = (req, res) => {
    var search = req.params.search;

    var obj = new RegExp(search, "i");
    Dashboard_model.find({ title: obj })
        .then((found) => {
            res.json(found)
        })
}

const dashboard_get_card = (req, res) => {
    res.render("./templates/card.ejs", { video: undefined, admin: false })
}

//' LIGAÇÃO COM ROUTER HOME
module.exports = {
    dashboard_get,
    dashboard_get_search,
    dashboard_get_card
}