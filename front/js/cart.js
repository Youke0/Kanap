let arrayCart = localStorage.getItem("arrayCartLocalStorage")

console.log(arrayCart, typeof arrayCart)
JSON.parse(arrayCart)?.forEach(function (itemcart) {
    fetch("http://localhost:3000/api/products/" + itemcart.id)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (kanap) {
            let cartItem = document.createElement("article")
            cartItem.setAttribute("class", "cart__item")
            cartItem.setAttribute("data-id", itemcart.id)
            cartItem.setAttribute("data-color", itemcart.color)

            let cartItemImgDiv = document.createElement("div")
            cartItemImgDiv.setAttribute("class", "cart__item__img")
            cartItem.appendChild(cartItemImgDiv)

            let cartItemImg = document.createElement("img")
            cartItemImg.setAttribute("src", kanap.imageUrl)
            cartItemImg.setAttribute("alt", "Photographie d'un canapé")
            cartItemImgDiv.appendChild(cartItemImg)

            let cartItemContent = document.createElement("div")
            cartItemContent.setAttribute("class", "cart__item__content")
            cartItem.appendChild(cartItemContent)

            let cartItemContentDescription = document.createElement("div")
            cartItemContentDescription.setAttribute("class", "cart__item__content__description")
            cartItemContent.appendChild(cartItemContentDescription)

            let nomDuProduit = document.createElement("h2")
            nomDuProduit.innerText = kanap.name
            cartItemContentDescription.appendChild(nomDuProduit)

            let couleurDuProduit = document.createElement("p")
            couleurDuProduit.innerText = itemcart.color
            cartItemContentDescription.appendChild(couleurDuProduit)

            let prixDuProduit = document.createElement("p")
            prixDuProduit.innerText = kanap.price + " €"
            cartItemContentDescription.appendChild(prixDuProduit)

            let cartItemContentSettings = document.createElement("div")
            cartItemContentSettings.setAttribute("class", "cart__item__content__settings")
            cartItemContent.appendChild(cartItemContentSettings)

            let cartItemContentSettingsQuantity = document.createElement("div")
            cartItemContentSettingsQuantity.setAttribute("class", "cart__item__content__settings__quantity")
            cartItemContentSettings.appendChild(cartItemContentSettingsQuantity)

            let qté = document.createElement("p")
            qté.innerText = "Qté :"
            cartItemContentSettingsQuantity.appendChild(qté)

            let itemQuantity = document.createElement("input")
            itemQuantity.setAttribute("type", "number")
            itemQuantity.setAttribute("class", "itemQuantity")
            itemQuantity.setAttribute("name", "itemQuantity")
            itemQuantity.setAttribute("min", "1")
            itemQuantity.setAttribute("max", "100")
            itemQuantity.setAttribute("value", itemcart.quantity)
            cartItemContentSettingsQuantity.appendChild(itemQuantity)

            let cartItemContentSettingsDelete = document.createElement("div")
            cartItemContentSettingsDelete.setAttribute("class", "cart__item__content__settings__delete")
            cartItemContentSettings.appendChild(cartItemContentSettingsDelete)

            let deleteItem = document.createElement("p")
            deleteItem.setAttribute("class", "deleteItem")
            deleteItem.innerText = "Supprimer"
            cartItemContentSettings.appendChild(deleteItem)

            let sectionCartItems = document.getElementById("cart__items")
            sectionCartItems.appendChild(cartItem)

            calPriceAndQuantityTotal()

            itemQuantity.addEventListener('change', updatePriceAndQuantity)
            deleteItem.addEventListener('click', deleteItemFunction)
        })
        .catch(function (err) {
            let firstNameErrorMsg = document.getElementById("firstNameErrorMsg")
            firstNameErrorMsg.innerText = err
        });
})

function updatePriceAndQuantity(event) {
    let arrayCartLocalStorage = localStorage.getItem("arrayCartLocalStorage")
    arrayCartLocalStorage = JSON.parse(arrayCartLocalStorage)
    let idClicked = event.srcElement.closest("article").dataset.id
    arrayCartLocalStorage.forEach(function (itemCart) {
        if (itemCart.id === idClicked) {
            itemCart.quantity = parseInt(event.srcElement.value)
        }
    })
    localStorage.setItem("arrayCartLocalStorage", JSON.stringify(arrayCartLocalStorage))

    calPriceAndQuantityTotal()
}

function calPriceAndQuantityTotal() {
    let totalQuantity = 0
    let totalPrice = 0
    let cartItems = document.getElementsByClassName("cart__item")
    Array.from(cartItems).forEach(function (cartitem) {
        let price = parseInt(cartitem.getElementsByClassName("cart__item__content__description")[0].children[2].innerText.split(' ')[0])
        let quantity = parseInt(cartitem.getElementsByClassName("itemQuantity")[0].value)
        totalQuantity += quantity
        totalPrice += price * quantity
    })

    let totalQuantityItem = document.getElementById("totalQuantity")
    totalQuantityItem.innerText = totalQuantity

    let totalPriceItem = document.getElementById("totalPrice")
    totalPriceItem.innerText = totalPrice
}

function deleteItemFunction(event) {
    let arrayCartLocalStorage = localStorage.getItem("arrayCartLocalStorage")
    arrayCartLocalStorage = JSON.parse(arrayCartLocalStorage)
    let idClicked = event.srcElement.closest("article").dataset.id
    arrayCartLocalStorage.forEach(function (itemCart, index) {
        if (itemCart.id === idClicked) {
            arrayCartLocalStorage.splice(index, 1)
        }
    })
    event.srcElement.closest("article").remove()
    localStorage.setItem("arrayCartLocalStorage", JSON.stringify(arrayCartLocalStorage))

    calPriceAndQuantityTotal()
}

document.getElementById("order").addEventListener('click', function (event) {
    event.preventDefault()
    let firstName = document.getElementById("firstName")
    if (firstName.value.length < 3) {
        document.getElementById("firstNameErrorMsg").innerText = "Veuillez renseigner au moins 3 caractères alphabétiques"
    } else {
        document.getElementById("firstNameErrorMsg").innerText = ""
    }
    let lastName = document.getElementById("lastName")
    if (lastName.value.length < 3) {
        document.getElementById("lastNameErrorMsg").innerText = "Veuillez renseigner au moins 3 caractères alphabétiques"
    } else {
        document.getElementById("lastNameErrorMsg").innerText = ""
    }
    let address = document.getElementById("address")
    if (address.value.length < 10) {
        document.getElementById("addressErrorMsg").innerText = "Veuillez renseigner au moins 10 caractères alphanumériques"
    } else {
        document.getElementById("addressErrorMsg").innerText = ""
    }
    let city = document.getElementById("city")
    if (city.value.length < 3) {
        document.getElementById("cityErrorMsg").innerText = "Veuillez renseigner au moins 3 caractères alphabétiques"
    } else {
        document.getElementById("cityErrorMsg").innerText = ""
    }
    let email = document.getElementById("email")
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        document.getElementById("emailErrorMsg").innerText = ""
    } else {
        document.getElementById("emailErrorMsg").innerText = "Veuillez renseigner une adresse email valide"
    }

    //Regex du formulaire sous forme de fonction
    function isFirstNameValid() {
        return firstName.value.length >= 3 && /^[a-zA-Z]+$/.test(firstName.value)
    }

    function isLastNameValid() {
        return lastName.value.length >= 3 && /^[a-zA-Z]+$/.test(lastName.value)
    }

    function isAdressValid() {
        return address.value.length >= 10 && /^[a-zA-Z0-9.!#$%&'*+/=?^_` {|}~-]+$/.test(address.value)
    }

    function isCityValid() {
        return city.value.length >= 3 && /^[a-zA-Z]+$/.test(city.value)
    }

    function isEmailValid() {
        return email.value.length >= 10 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z]+(?:\.[a-zA-Z]+)*$/.test(email.value)
    }


    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
    }

    let arrayCartLocalStorage = localStorage.getItem("arrayCartLocalStorage")
    arrayCartLocalStorage = JSON.parse(arrayCartLocalStorage)
    let products = []
    if (arrayCartLocalStorage?.length == 0) {
        alert("Vous ne pouvez pas envoyer de commande tant que votre panier est vide")
        return
    } else if (!isFirstNameValid() ||
        !isLastNameValid() ||
        !isAdressValid() ||
        !isCityValid() ||
        !isEmailValid()) {
        alert("Désolé, les informations que vous avez saisis ne sont pas valides. Vérifiez que vous avez renseigné correctement tous les champs du formulaire")
        return
    } else {
        arrayCartLocalStorage?.forEach(function (element) {
            products.push(element.id)
        })
    }

    fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact, products }),
    })
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (response) {
            window.location.href = "confirmation.html?id=" + response.orderId
        })

})