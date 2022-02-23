//' BIBLIOTECAS

const express = require('express');

//' CONTROLADORES

const create_controller = require("../controllers/create.js");

//' VARIÁVEIS

const router = express.Router();

//' ROUTING

router.get("/", create_controller.create_get);
router.post("/", create_controller.create_post);
router.delete("/:id", create_controller.create_delete);

//' CONECTA COM O APP

module.exports = router;