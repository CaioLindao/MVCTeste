//' BIBLIOTECAS

const express = require("express");
const sessions = require("express-session");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connect_mongo = require("connect-mongo");

//' VARIÁVEIS

const PORT = 8080;

const URI =
  "mongodb+srv://admin:admin@cluster0.ocqc0.mongodb.net/database01?retryWrites=true&w=majority";

const COOKIE_EXPIRE_TIME = 1000 * 60 * 60 * 24;

//' INICIA SERVIDOR

// Inicia o servidor express
const app = express();
// Liga o servidor express ao servidor HTTP
const http = require("http").Server(app);
// Liga o servidor Socket.io ao servidor HTTP
const io = require("socket.io")(http);

// Disponibiliza Socket.io para os controllers e routers
app.set("socketio", io);

app.set("view-engine", "ejs");

//' CONEXÃO COM O SOCKET.IO

io.on("connection", () => {
  console.log("User connected");
});

//' ACESSO À PASTA PUBLIC

app.use(express.static("public"));

//' CODIFICAÇÃO DO METODO POST

app.use(express.urlencoded({ extended: true }));

//' INCLUSÃO DAS SESSÕES

app.use(cookieParser());
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: COOKIE_EXPIRE_TIME },
    resave: false,
    store: connect_mongo.create({
      mongoUrl: URI,
      autoRemove: "interval",
      autoRemoveInterval: 10,
    }),
  })
);

//' ROUTES

const home_route = require("./routes/home");
const create_route = require("./routes/create");
const login_route = require("./routes/login");
const dashboard_route = require("./routes/dashboard");
const { Socket } = require("socket.io");

//' ROUTING

app.use("/home", home_route);
app.use("/create", create_route);
app.use("/login", login_route);
app.use("/dashboard", dashboard_route);
app.use("/", home_route);

//' CONEXÃO COM DB E INICIALIZAÇÃO DO SERVIDOR

mongoose
  .connect(URI)
  .then(() => {
    console.log("Sucessfully connected to mongoDB");
    const server = http.listen(PORT, () => {
      console.log("Server is running on port ", server.address().port);
    });
  })
  .catch((e) => {
    console.log(e);
  });
