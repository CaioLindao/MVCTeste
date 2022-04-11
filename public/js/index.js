$(() => {
  //' VARIÁVEIS
  var page = 1;
  let button = $("#verMais");
  const template = $(".card-template")[0].innerHTML;

  //' FUNÇÕES
  $(button).on("click", async () => {
    let response = await $.ajax({
      type: "get",
      url: `/m/${page}`,
    });

    $(button).detach();

    let videos = $("#videos");
    await response.forEach(async (video) => {
      let render = await renderCards(video);
      $(videos).append(render);
    });

    $(window).trigger("resize");
    $(videos).append(button);

    page++;
  });

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
