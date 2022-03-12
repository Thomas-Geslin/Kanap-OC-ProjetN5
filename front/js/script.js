/* Fonction permettant de récupérer infos de l'API */
const URL = "http://localhost:3000/api/products";
const item = document.getElementById('items');

function requestAPI () {
fetch(URL)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);
    for (let product of value) {
      createCard(product.name, product.description, product.imageUrl, product.altTxt, product._id);  
    }
  })
  .catch(function(err) {
    console.log(err)
  });
};

// ligne permettant de lancer la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', requestAPI);


/* Fonction créant une carte pour chaque canapé */
function createCard (name, description, image, altTxt, id) {
    // Crée la carte
    let newBox = document.createElement('a');
    newBox.setAttribute('href', './product.html?id=' + id);
    item.appendChild(newBox);
    let newArticle = document.createElement('article');
    newBox.appendChild(newArticle);
    // Ajoute l'image
    let newImg = document.createElement('img');
    newArticle.appendChild(newImg);
    newImg.setAttribute('src', image);
    newImg.setAttribute('alt', altTxt);
    // Ajoute le titre
    let newTitle = document.createElement('h3');
    newArticle.appendChild(newTitle);
    newTitle.innerHTML = name;
    // Ajoute la description
    let newDescription = document.createElement('p');
    newArticle.appendChild(newDescription);
    newDescription.innerHTML = description;
}