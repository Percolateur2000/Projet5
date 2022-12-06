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
let name = kanapData[i].name
let price = kanapData[i].price
let desc = kanapData[i].description
let quantite = document.getElementById('quantity').value

//remplacement du titre de la page


// ajout des elements html
document.querySelector('.item__img')
    .insertAdjacentHTML('afterbegin', `<img src="${imgUrl}" alt="${imgTxt}"></img>`);
document.getElementById('title')
    .insertAdjacentHTML('afterbegin', `${name}`);
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
    if (!colors.value) {
        alert("Merci de choisir une couleur")
        return
    } 
    if (quantite <= 0 || quantite > 100) {
        alert("Merci de choisir le nombre d'articles")
        return
    } if (estEntier() === true) {
        addToCart()
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

// creer ou recuperer le cart[]
function addToCart() {
    //if (id + couleur) {
        // edit panier
    //}
    // else {
    addProduct()
    //}
    }


// verifier si l'id + color existe => faire qty + nouvelle qty, puis supprimer index array et renvoyer la nouvelle
// sinon ajouter l'array
function addProduct() {
    let kanapData = {
        ProductID : id,
        color : colors.value,
        qty : document.getElementById('quantity').value
    }
    let cart = getCart()
    cart.push(kanapData)
    localStorage.setItem('Panier', JSON.stringify(cart))
    if (document.getElementById('quantity').value > 1) {
        alert(`${document.getElementById('quantity').value} ${name} ${colors.value} ont été ajoutés au panier`)}
    else {
        alert(`${document.getElementById('quantity').value} ${name} ${colors.value} a été ajouté au panier`)}
    }


