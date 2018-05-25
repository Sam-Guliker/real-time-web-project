(function() {
  var socket = io();

  var app = {
    search: function() {
      const input = document.getElementsByName("hashtag")[0];
      const button = document.getElementsByName("button")[0];
      console.log(button);

      input.addEventListener("keyup", function() {
        const userValue = this.value;
      });

      button.addEventListener("click", function() {
        const userValue = input.value;
        socket.emit("search", userValue);
      });
    },
    create: function(cleanedData) {
      const main = document.querySelector("main");

      // dataArray.forEach(function(item) {
      // console.log(item)
      const article = document.createElement("article");
      const section = document.createElement("section");
      const h2 = document.createElement("h2");
      const p = document.createElement("p");
      const img = document.createElement("img");

      main.append(article);
      article.append(section);
      section.append(h2);
      section.append(img);
      article.append(p);

      h2.textContent = cleanedData.username;
      img.src = cleanedData.afbeelding;
      p.textContent = cleanedData.text;
    }
  };

  socket.on("search", function(data) {});
  socket.on("create", app.create);
  // socket.on('load_more', function (data){
  //     console.log(data)
  // })

  app.search();
  //  app.create()

  // app.loadMore()
})();
