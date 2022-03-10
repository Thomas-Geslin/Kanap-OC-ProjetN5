
// fonction permettant de récupérer infos de l'API
const URL = "http://localhost:3000/api/products";
let item = document.getElementById('items');

function requestAPI () {
fetch(URL)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
    for (let product of value) {
        createCard(product.name, product.description, product.imageUrl, product.altTxt);  
    }
  })
  .catch(function(err) {
    console.log(err)
  });
};

// fonction créant une carte pour chaque canapé
function createCard (name, description, image, altTxt) {
    let newBox = document.createElement('a');
    newBox.setAttribute('href', '#');
    item.appendChild(newBox);
    let newArticle = document.createElement('article');
    newBox.appendChild(newArticle);
    let newImg = document.createElement('img');
    newArticle.appendChild(newImg);
    newImg.setAttribute('src', image);
    newImg.setAttribute('alt', altTxt);
    let newTitle = document.createElement('h3');
    newArticle.appendChild(newTitle);
    newTitle.innerHTML = name;
    let newDescription = document.createElement('p');
    newArticle.appendChild(newDescription);
    newDescription.innerHTML = description;
}

// ligne permettant de lancer la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', requestAPI);

