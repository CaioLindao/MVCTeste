$(() => {
  //' VARIÁVEIS
  const searchbar = $("#searchArea");
  const searchtag = $(".searchTag");
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

  searchtag.on("click", async function (e) {
    try {
      $(searchbar).val(e.target.innerHTML);
      await doneTyping();
      document.getElementById("videos-header").scrollIntoView();
    } catch (error) {
      console.log(error);
    }
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
      });

      let videos = $("#videos");
      videos.empty();

      for (let i = 0; i < result.length; i++) {
        let render = await renderCards(result[i]);
        $(videos).append(render);
      }

      $(window).trigger("resize");
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

      for (let i = 0; i < data.tags.length; i++) {
        var tag = data.tags.sort()[i];

        if (i != 0) {
          tag = tag.unshift(" ");
        }

        tags.push(tag);
      }

      render.children[2].children[0].innerHTML = tags;

      return render;
    } catch (error) {
      console.error("E: ", error);
    }
  }
});
