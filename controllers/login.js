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
  let io = req.app.get("socketio");
  let socketId = req.body.socketId;

  console.log(socketId);

  const login = req.body.login;
  const password = req.body.password;

  // Validação de inputs
  if (!(login.length && password.length)) {
    io.to(socketId).emit("badLogin", { message: "Informe Login e Senha" });
    res.sendStatus(422);
  } else {
    // Caso os inputs estejam corretos, executa a tentativa de login
    let find = await Admin_model.find();

    try {
      // Relaciona os dados recebidos com os do database para efetuar o login
      find.forEach(async (admin) => {
        let comparison = await bcrypt.compare(password, admin.password);
        if (comparison) {
          if (login == admin.login) {
            // Salva a sessão no database
            req.session.userid = login;
            res.sendStatus(200);
            io.to(socketId).emit("login", {
              message: "Entrando...",
              code: 100,
            });
          }
        }
      });
      // Caso nenhum corresponda, retorna o resultado ao client
      io.to(socketId).emit("badLogin", {
        message: "Login ou Senha incorretos.",
      });
    } catch (error) {
      console.log(error);
      io.to(socketId).emit("badLogin", { message: "Erro de requisição." });
    }
  }
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
