//' BIBLIOTECAS

const express = require("express");

//' CONTROLADORES

const home_controller = require("../controllers/home.js");

// ' VARIÁVEIS

const router = express.Router();

// ' ROUTING

router.get("/", home_controller.home_get);
router.get("/card", home_controller.home_get_card);

router.get("/:search", home_controller.home_get_search);

//' LIGAÇÃO COM APP

module.exports = router;
