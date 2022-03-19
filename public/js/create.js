$(() => {
  $("#form").on("submit", async (e) => {
    e.preventDefault();
    // Coleta os dados do formulário
    let form = {
      title: $("#title").val(),
      url: $("#url").val(),
      tags: $("#tags").val(),
    };

    try {
      const response = await $.post("/create/", form);
      if (jQuery.isEmptyObject(response)) {
        throw "Campo vazio";
      }
    } catch (error) {
      helpText(error);
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
