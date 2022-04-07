//' MODELS

const Home_model = require("../models/home");

//' FUNÇÕES DO CONTROLLER

const create_get = (req, res) => {
  res.render("create.ejs", {});
};

const create_post = async (req, res) => {
  try {
    // Recebe os dados do formulário
    let { title, url, tags } = req.body;
    //   Verifica se há algum dado vazio
    if (!title || !url) {
      throw new Error("Empty title or url");
    }

    url = url.split("/");
    url = url[url.length - 1];

    let newtags = new Array();

    tags.split(";").forEach((tag) => {
      newtags.push(tag.trim().toLowerCase());
    });

    await Home_model.create({ title, url, tags: newtags });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.send(error);
  }

  //   res.redirect("/home");
};

const create_delete = async (req, res) => {
  if (req.session.userid == undefined) {
    console.log("Admin not logged in");
    res.sendStatus(403);
    return;
  }

  const id = req.params.id;
  await Home_model.findByIdAndDelete(id);
  try {
    let io = req.app.get("socketio");
    res.sendStatus(200);
    io.emit("delete", id);
  } catch (error) {
    console.log(error);
  }
};
//' CONECTA COM O ROUTER CREATE

module.exports = {
  create_get,
  create_post,
  create_delete,
};
