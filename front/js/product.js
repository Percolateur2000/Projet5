const kanapData = JSON.parse(sessionStorage.getItem("productData"));
let colors = document.getElementById('colors');


//associer la page aux données de l'api
let i = 0;
let url = new URL(window.location.href);
let id = url.searchParams.get("id");

// recherche de la bonne array de l'api en fonction de l'id de la page
while (id != (kanapData[i]._id) ) {
    i++ ;
}

let imgUrl = kanapData[i].imageUrl
let imgTxt = kanapData[i].altTxt
let kanapName = kanapData[i].name
let price = kanapData[i].price
let desc = kanapData[i].description
let quantite = parseInt(document.getElementById('quantity').value)

//remplacement du titre de la page
let title = document.querySelector('title')
title.innerText = kanapName

// ajout des elements html
document.querySelector('.item__img')
    .insertAdjacentHTML('afterbegin', `<img src="${imgUrl}" alt="${imgTxt}"></img>`);
document.getElementById('title')
    .insertAdjacentHTML('afterbegin', `${kanapName}`);
document.getElementById('price')
    .insertAdjacentHTML('afterbegin', `${price}`);
document.getElementById('description')
    .insertAdjacentHTML('afterbegin', `${desc}`);

// ajout des elements de la liste en fonction du nombre d'elements dispo    
let c = 0
for ( let color of kanapData[i].colors) {
    colors
        .insertAdjacentHTML('afterbegin', `<option value=${kanapData[i].colors[c]}>${kanapData[i].colors[c]}</option>`);
        c++;}

//surveillance du bouton "ajouter au panier" puis export des données dans le localStorage
let bouton = document.getElementById("addToCart")
bouton.addEventListener('click', validation)

// verifier si les elements choisis sont valables, puis ajouter au panier
function validation () {
    let quantite = parseInt(document.getElementById('quantity').value)
    if (!colors.value) {
        alert("Merci de choisir une couleur")
        return
    } 
    if (quantite <= 0 || quantite > 100) {
        alert("Merci de choisir le nombre d'articles")
        return
    } if (estEntier() === true) {
        isItemInCart()
    } else {
        alert("Merci de choisir un nombre d'articles cohérent")
    }
}

// verifier que le chiffre entré est un entier
function estEntier () {
    let quantite =  Number(document.getElementById('quantity').value)
    if (Number.isInteger(quantite)){
        return true
    }
    return false
}

//recuperer le panier existant ou renvoyer une array vide
function getCart(){
    let cartData = localStorage.getItem('Panier')
    if (!cartData) {
        return []
    } 
    try {
        return JSON.parse(cartData)
    } 
    catch{
        return []
    }
}

// ajouter du produit inexistant
function addProduct() {
    let kanapData = {
        ProductID : id,
        color : colors.value,
        qty : parseInt(document.getElementById('quantity').value)
    }
    let cart = getCart()
    cart.push(kanapData)
    localStorage.setItem('Panier', JSON.stringify(cart))
    validationAjout()
}


//verif si id + color existants, edition de la qté
function isItemInCart() {
    let cart = getCart()
    for (let x = 0; x < cart.length; x++) {
        if (cart[x].ProductID === id && cart[x].color === colors.value) {
            let newQty = parseInt(document.getElementById('quantity').value) + parseInt(cart[x].qty)
            let kanapUpdate = {
                ProductID : id,
                color : colors.value,
                qty : newQty
            }
            cart.splice(x, 1, kanapUpdate)
            localStorage.setItem('Panier', JSON.stringify(cart))
            return alert(`La quantité a bien été modifiée`)}
        }
    checkID()
}

// verifie si l'ID est presente dans le panier et groupe les kanap avec la meme ID
function checkID () {
    let cart = getCart()
    for (let x = 0; x < cart.length; x++) {
        if (cart[x].ProductID === id) {
        let kanapUpdate = {
            ProductID : id,
            color : colors.value,
            qty : parseInt(document.getElementById('quantity').value)
        }
            cart.splice(x, 0, kanapUpdate)
            localStorage.setItem('Panier', JSON.stringify(cart))
            validationAjout()
            return}}
    addProduct()
}

// petit message qui indique que les produits ont été ajoutés au panier
function validationAjout () {
    if (document.getElementById('quantity').value > 1) {
        alert(`${document.getElementById('quantity').value} ${kanapName} ${colors.value} ont été ajoutés au panier`)}
    else {
        alert(`${document.getElementById('quantity').value} ${kanapName} ${colors.value} a été ajouté au panier`)}
}