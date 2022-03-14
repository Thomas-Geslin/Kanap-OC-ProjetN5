/* Lignes permettant de récupérer l'id de confirmation */
let url = window.location.href;
let urlRequest = new URL(url);
let orderId = urlRequest.searchParams.get("orderId");

/* Lignes remplissant l'id de confirmation dans le DOM */
document
    .getElementById('orderId')
    .innerHTML = orderId;