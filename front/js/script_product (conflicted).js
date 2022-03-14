/* Fonction récupérant l'id du produit */
function getId (Id) {
const productUrl = window.location.href;
let newUrl = new URL(productUrl);
let productId = newUrl.searchParams.get("id");
return Id = productId
}


/* Fonction récupérant les infos du produit avec son id */
const APIurl = "http://localhost:3000/api/products/" + getId();

function requestAPI () {
    fetch(APIurl)
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        productIntegration(value.name, value.description, value.price, value.imageUrl, value.altTxt);
        // Trouver un moyen de le déplacer for dans la fonction productIntegration
        for (let color of value.colors) {
            // intégration des couleurs
            let productColors = document.createElement('option');
            colorsBloc.appendChild(productColors);
            productColors.setAttribute('value', color);
            productColors.innerText = color;
            }
      })
      .catch(function(err) {
        console.log(err)
      });
    };

document.addEventListener('DOMContentLoaded', requestAPI);


/* Fonction intégrant les éléments du produit au DOM */
const titleBloc = document.getElementById('title');
const priceBloc = document.getElementById('price');
const descriptionBloc = document.getElementById('description');
const imgGet = document.getElementsByClassName('item__img');
const imgBloc = imgGet[0];
const colorsBloc = document.getElementById('colors');

function productIntegration (title, description, price, img, alt) {
    // intégration du titre
    titleBloc.innerHTML = title;
    // intégration de la description
    descriptionBloc.innerHTML = description;
    // intégration du prix
    priceBloc.innerHTML = price;
    // intégration de l'image
    let productImg = document.createElement('img');
    imgBloc.appendChild(productImg);
    productImg.setAttribute('src', img);
    productImg.setAttribute('alt', alt);
} 


/* Fonction stockant les infos du produit quand on l'ajoute au panier */
function addProduct() {
  let productId = getId();
  let productQuantity = document.getElementById('quantity').value;
  let productPrice = document.querySelector('#price').innerText;
  let productName = titleBloc.innerText;
  let productImgUrl = document.querySelector('.item__img img').src;
  let productImgAlt = document.querySelector('.item__img img').alt;
  let colorSelect = colorsBloc.value;

  // Cette ligne va chercher notre tableau des produits dans le localStorage, ou en crée un si il n'existe pas
  let oldProducts = JSON.parse(localStorage.getItem('productsArray')) || [];

  // Crée l'objet avec les infos du nouveau produit
  let newProduct = {
    'productId': productId,
    'productColor': colorSelect,
    'productQuantity': productQuantity,
    'productPrice': productPrice,
    'productName': productName,
    'productImage': productImgUrl,
    'productAltTxt': productImgAlt
  };

  if (productQuantity == 0) {
    alert('Merci de sélectionner une quantité')
  } else if (colorSelect == "") {
    alert('Merci de sélectionner une couleur')
  } else if (localStorage.length === 0){
    oldProducts.push(newProduct);
    localStorage.setItem('productsArray', JSON.stringify(oldProducts));
    console.log('1er else');
  } else if (newProduct.productId === productId) 
  /*{
    // Fonction agissant différemment si le mm produit as déjà été ajouté au panier
    for (let prd of oldProducts) {
      let id = prd.productId;
      let color = prd.productColor;
      if (id === productId && color === colorSelect) {
        // Change juste la quantité si le mm produit est déjà dans le panier
        let index = oldProducts.indexOf(prd);
        let product = oldProducts.at(index);
        product.productQuantity = parseInt(product.productQuantity) + parseInt(productQuantity);
        oldProducts.splice(index, 1, product);
        localStorage.setItem('productsArray', JSON.stringify(oldProducts));
        console.log('2e else');
      } else {
        // Ajoute le produit au panier si il s'agit d'une nouvelle couleur
        oldProducts.push(newProduct);
        localStorage.setItem('productsArray', JSON.stringify(oldProducts)); 
        console.log('3e else')
      }*/
    }
  }
}

// Ligne ajoutant les infos du produit au localStorage lorsqu'on clique sur "Ajouter au panier"
document
    .getElementById('addToCart')
    .addEventListener('click', addProduct);