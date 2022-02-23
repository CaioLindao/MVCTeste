//' BIBLIOTECAS

const express = require("express")

//' CONTROLADORES

const admin_controller = require("../controllers/login");

//' VARIÁVEIS

const router = express.Router();

//' ROTAS

router.get("/", admin_controller.admin_list)
router.post("/", admin_controller.admin_login)
router.get("/logout", admin_controller.admin_logout)

//' CONEXÃO COM APP

module.exports = router;