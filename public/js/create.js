$(() => {
  $("#form").on("submit", async (e) => {
    e.preventDefault();
    // Coleta os dados do formulário
    var url = $("#url").val();
    url = url.split("/");
    url = url[url.length - 1];
    // console.log(url);

    let form = {
      title: $("#title").val(),
      url,
      tags: $("#tags").val(),
    };

    try {
      const response = await $.post("/create/", form);
      if (jQuery.isEmptyObject(response)) {
        throw "não foi possível criar este vídeo";
      }
      helpText("vídeo criado com sucesso", 100);
      $("#form").trigger("reset");
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
      help.classList.add("text-success");
      break;

    default:
      help.classList.remove("text-success");
      help.classList.add("text-danger");
      break;
  }
};
