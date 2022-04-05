$(() => {
  //' VARIÁVEIS
  const searchbar = $("#searchArea");
  var typingTimer;
  var doneTypingInterval = 500;

  let search;
  let lastSearch = "empty";

  //' PESQUISA
  searchbar.on("keyup", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  searchbar.on("keydown", function () {
    clearTimeout(typingTimer);
  });

  async function doneTyping() {
    try {
      // Atualiza o valor das varíaveis
      lastSearch = search;
      search = searchbar.val();

      // Caso a pesquisa não tenha mudado, recusa o envio
      if (search == lastSearch) {
        return;
      }

      // Envia a pesquisa ao backend
      let result = await $.ajax({
        type: "GET",
        url: `/${search}`,
        data: search,
        dataType: "json",
      });

      console.log(result);
    } catch (error) {
      console.log("E: ", error.responseText);
    }
  }

  //' RENDERIZAÇÃO DOS RESULTADOS
  async function renderCards(data) {
    try {
      let videos = $("#videos");
      videos.empty();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
});
