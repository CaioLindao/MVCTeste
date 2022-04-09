$(() => {
  //' VARIÁVEIS
  const searchbar = $("#searchArea");
  let typingTimer;
  const doneTypingInterval = 500;

  let search;
  let lastSearch = "empty";
  const template = $(".card-template")[0].innerHTML;

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
      if (search == lastSearch || search == "") {
        return;
      }

      // Envia a pesquisa ao backend
      let result = await $.ajax({
        type: "GET",
        url: `/s/${search}`,
        data: search,
        dataType: "json",
      });

      let videos = $("#videos");
      videos.empty();

      for (let i = 0; i < result.length; i++) {
        let render = await renderCards(result[i]);
        $(videos).append(render);
      }
    } catch (error) {
      let videos = $("#videos");
      videos.empty();
      $(
        videos
      )[0].innerHTML = `<div class="text-center">${error.responseText}<div>`;
    }
  }

  //' RENDERIZAÇÃO DOS RESULTADOS
  async function renderCards(data) {
    // Possibilita usar .unshift() em strings
    String.prototype.unshift = function (el) {
      let arr = [this];
      arr.unshift(el);
      return arr.join("");
    };

    try {
      const ytUrl = "https://www.youtube.com/embed/";

      let render = document.createElement("div");
      render.innerHTML = template;

      render.children[0].children[0].src = ytUrl + data.url;
      render.children[1].children[0].innerHTML = data.title;

      let tags = new Array();

      data.tags.forEach((tag, index) => {
        if (index != 0) {
          tag = tag.unshift(" ");
        }
        tags.push(tag);
      });

      render.children[2].children[0].innerHTML = tags;

      return render;
    } catch (error) {
      console.error("E: ", error);
    }
  }
});
