let socket = io();
$(async () => {
  var socketId;

  await socket.on("connected", (response) => {
    socketId = response;
    alert(socketId);
  });

  $("#form").on("submit", (e) => {
    e.preventDefault();
    // Coleta os dados do formulário
    let form = {
      login: $("#login").val(),
      password: $("#password").val(),
      socketId,
    };

    $.post("http://localhost:8080/login/", form);
  });

  socket.on("login", (response) => {
    helpText(response.message, response.code);
    window.location.href = "/dashboard";
  });
  socket.on("badLogin", (response) => {
    helpText(response.message, response.code);
  });
});

// const isValid = (data) => {
//     if (data.login == '') {
//         return { result: false, status: 400, message: "Por favor, insira um login válido." };
//     }
//     if (data.password == '') {
//         return { result: false, status: 400, message: "Por favor, insira uma senha válida." }
//     }

//     return { result: true, status: 100, message: "Carregando..." };
// }

const helpText = (text, status) => {
  var help = document.getElementById("help-text");
  help.innerText = text;

  switch (status) {
    case 100:
      help.classList.remove("text-danger");
      help.classList.remove("text-success");
      help.classList.add("text-secondary");
      break;

    default:
      help.classList.remove("text-secondary");
      help.classList.remove("text-success");
      help.classList.add("text-danger");
      break;
  }
};

// window.addEventListener("load", () => {
//     submit = document.getElementById("submit");
//     window.addEventListener("submit", (e) => {

//         e.preventDefault();

// const form = document.getElementById("form");
// const formData = new FormData(form);
// const data = new URLSearchParams(formData).toString()
// const dataJSON = {
//     login: formData.get("login"),
//     password: formData.get("password")
// }

// const validation = isValid(dataJSON);

// if (validation.result) {
//     helpText(validation.message, validation.status)

//     const ajax = new XMLHttpRequest();

//     ajax.open("POST", "/login", true);
//     ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

//     ajax.send(data)

//     ajax.onreadystatechange = () => {
//         if (ajax.readyState == 4) {
//             var data = ajax.responseText;
//             if (data.status == 200) {
//                 window.location.href = data.redirect;
//             } else {
//                 helpText(data.message, 401);
//             }
//         }
//     }

// } else {
//     helpText(validation.message, validation.status)
// }
//     })
// })
