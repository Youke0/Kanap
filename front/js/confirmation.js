const params = window.location.href
const orderUrl = new URL(params)
const orderId = orderUrl.searchParams.get("id")

document.querySelector("#orderId").innerHTML = orderId

//On vide le localstorage afin de recommencer plus tard le processus d'achat sans surcharger le cache

localStorage.clear();
