//' BIBLIOTECAS

const express = require("express");

//' CONTROLADORES

const dashboard_controller = require("../controllers/dashboard.js");
const {admin_logout} = require("../controllers/login.js");

// ' VARIÁVEIS

const router = express.Router();

// ' ROUTING

router.get("/", dashboard_controller.dashboard_get);
router.get("/card", dashboard_controller.dashboard_get_card);
router.get("/logout", admin_logout);

router.get("/:search", dashboard_controller.dashboard_get_search);

//' LIGAÇÃO COM APP

module.exports = router;