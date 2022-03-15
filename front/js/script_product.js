/* Fonction récupérant l'id du produit */
function getId () {
  const productUrl = window.location.href;
  let newUrl = new URL(productUrl);
  let productId = newUrl.searchParams.get("id");
  return productId;
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
      productIntegration(value.name, value.description, value.price, value.imageUrl, value.altTxt, value.colors);
    })
    .catch(function(err) {
      console.log(err)
    });
}

document.addEventListener('DOMContentLoaded', requestAPI);


/* Fonction intégrant les éléments du produit au DOM */
const titleBloc = document.getElementById('title');
const priceBloc = document.getElementById('price');
const descriptionBloc = document.getElementById('description');
const imgGet = document.getElementsByClassName('item__img');
const imgBloc = imgGet[0];
const colorsBloc = document.getElementById('colors');

function productIntegration (title, description, price, img, alt, colors) {
  // intégration du titre
  titleBloc.innerText = title;
  // intégration de la description
  descriptionBloc.innerText = description;
  // intégration du prix
  priceBloc.innerText = price;
  // intégration de l'image
  let productImg = document.createElement('img');
  imgBloc.appendChild(productImg);
  productImg.setAttribute('src', img);
  productImg.setAttribute('alt', alt);
  // intégration des couleurs
  for (let color of colors) {
    let productColors = document.createElement('option');
    colorsBloc.appendChild(productColors);
    productColors.setAttribute('value', color);
    productColors.innerText = color;
  }
} 


/*Fonction récupèrant les infos du produit à ajouter au panier */
async function infosProduct() {
  let productId = getId();
  let productQuantity = document.getElementById('quantity').value;
  let productColor = colorsBloc.value;
  let productPrice = document.querySelector('#price').innerText;
  let productName = titleBloc.innerText;
  let productImgUrl = document.querySelector('.item__img img').src;
  let productImgAlt = document.querySelector('.item__img img').alt;

  // Crée l'objet avec les infos du nouveau produit
  let newProduct = {
  'productId': productId,
  'productColor': productColor,
  'productQuantity': productQuantity,
  'productPrice': productPrice,
  'productName': productName,
  'productImage': productImgUrl,
  'productAltTxt': productImgAlt
  };
  return newProduct;
}


/* Fonction stockant les infos du produit quand on l'ajoute au panier */
async function addProduct() {
  let infos = await infosProduct();

  // Cette ligne va chercher notre tableau des produits dans le localStorage, ou en crée un si il n'existe pas
  let oldProducts = JSON.parse(localStorage.getItem('productsArray')) || [];

  // Bloque l'ajout au panier si il n'y a pas de qty sélectionnée
  if (infos.productQuantity == 0) {
    alert('Merci de sélectionner une quantité !')
  // Bloque l'ajout au panier si il n'y as pas de couleur sélectionnée
  } else if (infos.productColor == "") {
    alert('Merci de sélectionner une couleur !')
  // Si c'est le premier produit qu'on ajoute, le stocke sans vérifier
  } else if (oldProducts.length === 0){
    oldProducts.push(infos);
    localStorage.setItem('productsArray', JSON.stringify(oldProducts));
    alert('Votre produit a bien été ajouté au panier !')
    // Sinon on vérifie si il est déjà présent dans le panier
  } else {
    let verif = true;
    oldProducts.forEach(function(p) {
    // Si il y est déjà on change juste la quantité
    if (p.productId === infos.productId && p.productColor === infos.productColor) {
      verif = false;
      p.productQuantity = parseInt(p.productQuantity) + parseInt(infos.productQuantity);
      alert('La quantité a bien été modifiée !');
    }
  })
    // Si il n'y est pas on l'ajoute
    if (verif) {
      oldProducts.push(infos);
      alert('Votre produit a bien été ajouté au panier !');
  }
    localStorage.setItem('productsArray', JSON.stringify(oldProducts));
  }
}

// Ligne ajoutant les infos du produit au localStorage lorsqu'on clique sur "Ajouter au panier"
document
    .getElementById('addToCart')
    .addEventListener('click', addProduct);