$(() => {
  let videos = $("iframe");
  $(window).on("resize", () => {
    $.each($("iframe"), (index) => {
      let maxWidth = $(".video-container").innerWidth();
      $(videos[index]).attr("width", maxWidth);
      $(videos[index]).attr("height", maxWidth * 0.5625);
    });
  });
  $(window).trigger("resize");
});
