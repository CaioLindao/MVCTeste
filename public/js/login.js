$(() => {
  $("#form").on("submit", async (e) => {
    e.preventDefault();
    // Coleta os dados do formulário
    let form = {
      login: $("#login").val(),
      password: $("#password").val(),
    };

    try {
      const response = await $.post("http://localhost:8080/login/", form);
      helpText(response.message, response.status);

      if (response.status == 100) {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(error);
    }
  });
});

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
