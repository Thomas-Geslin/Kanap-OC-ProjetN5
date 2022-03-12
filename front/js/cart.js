/* Ligne récupérant les éléments du localStorage */
let productArray = JSON.parse(localStorage.getItem('productsArray'));


/* Fonction créant la carte du produit */
const getSection = document.getElementById('cart__items');

function cardArray (id, name, quantity, color, price, img, alt) {
    // Crée l'article
    let newArticle = document.createElement('article');
    newArticle.setAttribute('data-id', id);
    newArticle.setAttribute('data-color', color);
    newArticle.setAttribute('class', 'cart__item');
    getSection.appendChild(newArticle);
    // Crée les différentes div enfant
    let divImg = document.createElement('div');
    divImg.setAttribute('class', 'cart__item__img');
    newArticle.appendChild(divImg);
    // Crée div img
    let prdImg = document.createElement('img');
    prdImg.setAttribute('src', img);
    prdImg.setAttribute('alt', alt);
    divImg.appendChild(prdImg);
    let divContent = document.createElement('div');
    divContent.setAttribute('class', 'cart__item__content');
    newArticle.appendChild(divContent);
    // Crée div description
    let divDescription = document.createElement('div');
    divDescription.setAttribute('class', 'cart__item__content__description');
    divContent.appendChild(divDescription);
    let prdName = document.createElement('h2');
    prdName.innerText = name;
    divDescription.appendChild(prdName);
    let prdColor = document.createElement('p');
    prdColor.innerText = color;
    divDescription.appendChild(prdColor);
    let prdPrice = document.createElement('p');
    prdPrice.innerText = price + '€'; 
    divDescription.appendChild(prdPrice);
    // Crée div settings
    let divSettings = document.createElement('div');
    divSettings.setAttribute('class', 'cart__item__content__settings');
    divContent.appendChild(divSettings);
    // Crée div quantity
    let divQuantity = document.createElement('div');
    divQuantity.setAttribute('class', 'cart__item__content__settings__quantity');
    divSettings.appendChild(divQuantity);
    let qty = document.createElement('p');
    qty.innerText = 'Qté : ';
    divQuantity.appendChild(qty);
    let qtyInput = document.createElement('input');
    qtyInput.setAttribute('type', 'number');
    qtyInput.setAttribute('class', 'itemQuantity');
    qtyInput.setAttribute('name', 'itemQuantity');
    qtyInput.setAttribute('min', '1');
    qtyInput.setAttribute('max', '100');
    qtyInput.setAttribute('value', quantity);
    divQuantity.appendChild(qtyInput);
    // Crée div delete
    let divDelete = document.createElement('div');
    divDelete.setAttribute('class', 'cart__item__content__settings__delete');
    divSettings.appendChild(divDelete);
    let pDelete = document.createElement('p');
    pDelete.setAttribute('class', 'deleteItem');
    pDelete.innerText = 'Supprimer';
    divDelete.appendChild(pDelete);
}


/* Fonction intégrant les produits au DOM*/
for (let product of productArray) {
    let productId = product.productId;
    let productName = product.productName;
    let productQuantity = product.productQuantity;
    let productColor = product.productColor;
    let productPrice = product.productPrice;
    let productImg = product.productImage;
    let productAlt = product.productAltTxt;
    cardArray(productId, productName, productQuantity, productColor, productPrice, productImg, productAlt);
}


/* Fonction remplissant le prix totale */
let totalPrice = document.getElementById('totalPrice');

function totalPrc () {
    let priceSum = 0;
    if (productArray.length === 0) {
        totalPrice.innerHTML = '0';
    } else {
        for (let price of productArray) {
            let productsPrice = price.productPrice;
            let prix = parseInt(productsPrice, 10);
            priceSum += (prix * price.productQuantity);
            totalPrice.innerHTML = priceSum;
        }
    }
}
document.addEventListener('DOMContentLoaded', totalPrc);


/* Fonction remplissant la quantité totale */
let totalQuantity = document.getElementById('totalQuantity');

function totalQty () {
    let quantitySum = 0;
    if (productArray.length === 0) {
        totalQuantity.innerText = '0';
    } else {
        for (let quantity of productArray) {
            let productsQuantity = quantity.productQuantity;
            let quantityTotal = parseInt(productsQuantity, 10);
            quantitySum += quantityTotal;
            totalQuantity.innerHTML = quantitySum;
        }
    }
}
document.addEventListener('DOMContentLoaded', totalQty);


/* Fonction permettant de supprimer un article */
let deleteButton = document.getElementsByClassName('deleteItem');
let array = [];

for (let del of deleteButton) {
    array.push(del);
    del.addEventListener('click', function() {
        getProduct = del.closest('article');
        // Lignes permettant de récupérer l'index du produit et de le supprimer du localStorage
        let index = array.indexOf(del);
        productArray.splice(index, 1);
        localStorage.setItem('productsArray', JSON.stringify(productArray));
        // Ligne supprimant le produit du DOM
        getProduct.remove();
        totalQty();
        totalPrc();
    })
}


/* Fonction permettant de changer la quantité */
let quantityInput = document.getElementsByClassName('itemQuantity');
let arrayQty = [];

for (let qty of quantityInput) {
    arrayQty.push(qty);
    qty.addEventListener('change', function() {
        let index = arrayQty.indexOf(qty);
        let quantity = qty.value;
        // Récupère le produit dont on modifie la quantité dans l'array
        let product = productArray.at(index);
        // Transforme notre objet (produit) en array
        let getInfo = (Object.values(product));
        // Change la quantité de ce produit
        getInfo.splice(2, 1, quantity);
        // Rechange le statut de (produit) de array à objet
        let getObject = {
            'productId': getInfo.at(0),
            'productColor': getInfo.at(1),
            'productQuantity': getInfo.at(2),
            'productPrice': getInfo.at(3),
            'productName': getInfo.at(4),
            'productImage': getInfo.at(5),
            'productAltTXt': getInfo.at(6)
        };
        // Insère la nouvelle quantité dans le localStorage
        productArray.splice(index, 1, getObject);
        localStorage.setItem('productsArray', JSON.stringify(productArray));
        totalQty();
        totalPrc();
    })
}