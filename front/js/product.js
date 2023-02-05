//Utilisation de l'URL Search Params
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

//Requête de l'API
fetch("http://localhost:3000/api/products/" + id)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
  })
  /*La fonction kanap récupère les élements de l'API
  pour les afficher sur la page du produit en question*/
  .then(function (kanap) {
    let photoKanap = document.createElement("img")
    photoKanap.setAttribute("src", kanap.imageUrl)
    let itemImg = document.getElementsByClassName("item__img")[0]
    itemImg.appendChild(photoKanap)

    document.getElementById("title").innerText = kanap.name

    document.getElementById("price").innerText = kanap.price

    document.getElementById("description").innerText = kanap.description

    kanap.colors.forEach(color => {
      let colorSelect = document.createElement("option")
      colorSelect.innerText = color
      colorSelect.setAttribute("value", color)
      document.getElementById("colors").appendChild(colorSelect)
    })


  })
  .catch(function (err) {
    // Une erreur est survenue
  });

/*La fonction addCart qui nous permet d'ajouter un produit au panier 
(sur la page du produit en question)*/
let addCart = document.getElementById("addToCart");
addCart.addEventListener("click", function () {

  let arrayCart = localStorage.getItem("arrayCartLocalStorage")

  let objetCart = {
    "id": id,
    "quantity": parseInt(document.getElementById("quantity").value),
    "color": document.getElementById("colors").value
  }

  if (objetCart.color == null || objetCart.color === "" || objetCart.quantity == null || objetCart.quantity == 0) {
    alert("Veuilez choisir une couleur et une quantité pour votre article s'il vous plaît")
    return
  }

  else if (objetCart.quantity > 100 || objetCart.quantity <= 0) {
    alert("Vous ne pouvez choisir une quantité du même article qu'entre 1 et 100")
    return
  }

  else if (arrayCart == null) {
    arrayCart = [objetCart]
  }

  else {
    arrayCart = JSON.parse(arrayCart)
    let hasQuantityIncreased = false
    arrayCart.forEach(function (itemCart) {
      if (itemCart.id === objetCart.id && itemCart.color === objetCart.color) {
        hasQuantityIncreased = true
        itemCart.quantity = itemCart.quantity + objetCart.quantity
      }
    })

    //Ajouter les nouveaux éléments si la quantité a été modifiée ---

    if (hasQuantityIncreased === false) {
      arrayCart.push(objetCart)
    }
  }

  //Créer l'item arrayCartLocalStorage dans le Local Stor. et le transformer en JSON ---

  localStorage.setItem("arrayCartLocalStorage", JSON.stringify(arrayCart));

  //Renvoi sur la page panier une fois qu'un article, sa couleur et sa quantité ont été sélectionnés ---

  window.location.href = "cart.html"

})