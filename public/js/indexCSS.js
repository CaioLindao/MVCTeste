$(() => {
  // Muda o tamanho do texto do header para se adaptar ao tamanho da tela
  const headerWelcome = $("#header-welcome");
  $(headerWelcome).fitText(0.55);
  // Muda o tamanho do texto do subtitulo para se adaptar ao tamanho da tela
  const headerSubtitle = $("#header-subtitle");
  $(headerSubtitle).fitText(1.6);
});
