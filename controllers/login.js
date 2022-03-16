//' BIBLIOTECAS

const bcrypt = require("bcrypt");
const { redirect } = require("express/lib/response");

//' MODEL

const Admin_model = require("../models/admin");

//' FUNÇÕES DO CONTROLLER

const admin_create = async (req, res) => {
  try {
    Admin_model.create({
      login: "caio",
      password: "$2b$10$/1mv0W7.zG87lb4BWNAqreeRDyFfapEF/byIgi1pxuVVZ4kVTqNkO",
    });
    res.redirect("/home");
  } catch (error) {
    throw error;
  }
};

const admin_list = async (req, res) => {
  let find = await Admin_model.find();
  try {
    if (req.session.userid != undefined) {
      res.redirect("/dashboard");
    } else {
      res.render("login.ejs", { data: find });
    }
  } catch (error) {
    console.log(error);
  }
};

const admin_login = async (req, res) => {
  let { login, password } = req.body;
  console.log(login, password);

  const admin = await Admin_model.findOne({ login });

  if (!admin) {
    // Caso não haja nenhum administrador com o login
    res.json({ message: "login incorreto", status: 422 });
    return;
  }

  // Compara a senha do administrador
  let auth = await bcrypt.compare(password, admin.password);
  if (!auth) {
    // Caso não seja a senha correta
    res.json({ message: "senha incorreta", status: 422 });
    return;
  }

  // Caso o login esteja correto
  req.session.userid = login;
  res.json({ message: "entrando...", status: 100 });
};

const admin_logout = (req, res) => {
  if (req.session.userid) {
    req.session.destroy();
  }
  res.redirect("/home");
};
//' CONECTA COM A ROUTE LOGIN

module.exports = {
  admin_create,
  admin_list,
  admin_login,
  admin_logout,
};
