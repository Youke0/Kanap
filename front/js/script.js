//récupération de l'API
fetch("http://localhost:3000/api/products")
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  //création d'une fonction qui permet d'afficher les canapés sur la page d'accueil grâce à l'API
  .then(function (arrayKanap) {
    arrayKanap.forEach(kanap => {
      let linkKanap = document.createElement("a");
      linkKanap.setAttribute("href", "./product.html?id=" + kanap._id);

      let articleKanap = document.createElement("article");
      linkKanap.appendChild(articleKanap);

      let imageKanap = document.createElement("img");
      imageKanap.setAttribute("src", kanap.imageUrl);
      imageKanap.setAttribute("alt", kanap.altTxt)
      articleKanap.appendChild(imageKanap);

      let nameKanap = document.createElement("h3");
      nameKanap.classList.add("productName");
      nameKanap.innerText = kanap.name
      articleKanap.appendChild(nameKanap);

      let descriptionKanap = document.createElement("p");
      descriptionKanap.classList.add("productDescription");
      descriptionKanap.innerText = kanap.description;
      articleKanap.appendChild(descriptionKanap);


      const items = document.getElementById("items");
      items.appendChild(linkKanap);
    });
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
