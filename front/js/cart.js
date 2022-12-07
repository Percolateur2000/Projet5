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

let cart = getCart();
let kanapData = JSON.parse(sessionStorage.getItem("productData"));

for (let x = 0; x < cart.length; x++) {
    for (let y = 0; y < kanapData.length; y++){
        if ( cart[x].ProductID === kanapData[y]._id) {
    document.getElementById("cart__items").insertAdjacentHTML("beforeend",
    `<article class="cart__item" data-id="${kanapData[y]._id}" data-color="${kanapData[y].color}">
            <div class="cart__item__img">
            <img src="${kanapData[y].imageUrl}" alt="${kanapData[y].altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${kanapData[y].description}</h2>
            <p>${cart[x].color}</p>
            <p>${kanapData[y].price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[x].qty}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
            </div>
        </div>
        </article>`)}}}
        