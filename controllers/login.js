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

const admin_login = async (req, res) => {};

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
