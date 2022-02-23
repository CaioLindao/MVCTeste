//' MODELS

const Home_model = require("../models/home");

//' FUNÇÕES DO CONTROLLER

const home_get = async (req, res) => {
    let find = await Home_model.find();
    try {
        res.render("index.ejs", { data: find, admin: false });
    } catch (error) {
        res.render("index.ejs", { data: false, admin: false });
    }
}

const home_get_search = async (req, res) => {
    let search = req.params.search;

    let obj = new RegExp(search, "i");
    let found = await Home_model.find({ title: obj })
    
    try{
        if (found[0]==undefined) {
            throw (`Could not find any results that match "${search}"`);
        } else {
            res.json(found);
        }
    } catch (error) {
        console.log(error);
        res.json({});
    }
}

const home_get_card = (req, res) => {
    res.render("./templates/card.ejs", { video: undefined, admin: false })
}

//' LIGAÇÃO COM ROUTER HOME
module.exports = {
    home_get,
    home_get_search,
    home_get_card
}