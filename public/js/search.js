$(() => {
  const searchbar = $("#searchArea");
  var typingTimer;
  var doneTypingInterval = 500;

  searchbar.on("keyup", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  searchbar.on("keydown", function () {
    clearTimeout(typingTimer);
  });

  function doneTyping() {
    console.log(searchbar.val());
  }
});
// window.addEventListener("load", () => {
//     //' VARIÁVEIS
//     const searchbar = document.getElementById("searchbar");
//     const results = document.getElementById("searchresults")
//     var template = '';

//     //' RECEBE O HTML CARD
//     fetch("/card", {
//         method: "GET"
//     })
//         .then((response) => {
//             return response.text()
//         })
//         .then((html => {
//             template = html;
//         }))
//         .then(() => {
//             //' AO PESQUISAR
//             searchbar.addEventListener("input", () => {
//                 if (searchbar.value != '') {
//                     var endpoint = `/${searchbar.value}`;
//                     fetch(endpoint, {
//                         method: "GET"
//                     })
//                         .then((response) => {
//                             results.innerHTML = '';
//                             return response.json()
//                         })
//                         .then(json => {
//                             if (json[0] != undefined) {
//                                 json.forEach(video => {
//                                     createCard(video)
//                                 });
//                             } else {
//                                 createCard({ "error": "true" })
//                             }
//                         })
//                         .catch((e => { console.log(e) }))
//                 } else {
//                     // var ul = document.createElement("ul");
//                     // var collection = document.body.getElementsByTagName("ul");
//                     // var uls = Array.from(collection);
//                     // uls[0].remove();

//                     // document.body.appendChild(ul);
//                 }

//             })
//         })
//         .catch(e => { throw e })

//     //' CRIA A LISTA DE CARD A PARTIR DO JSON
//     const createCard = (json) => {
//         if (json.error != undefined) {
//             results.innerHTML = "Nenhum vídeo encontrado"
//             return;
//         }
//         results.innerHTML += template;

//         var button = document.createRange().createContextualFragment('<button class="btn btn-danger" id="<%=video.id %>">Delete</button>')

//         var cards = document.getElementsByClassName("card");
//         var lastcard = Array.from(cards)[cards.length - 1]
//         console.log(lastcard.children[0].children[1])

//         lastcard.children[0].children[0].appendChild(document.createTextNode(json.title));
//         lastcard.children[0].children[1].href = json.url;
//     }
// })
