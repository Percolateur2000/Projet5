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

// affichage des elements dans le DOM
for (let x = 0; x < cart.length; x++) {
    for (let y = 0; y < kanapData.length; y++){
        if ( cart[x].ProductID === kanapData[y]._id) {
    document.getElementById("cart__items").insertAdjacentHTML("beforeend",
    `<article class="cart__item" data-id="${kanapData[y]._id}" data-color="${cart[x].color}">
            <div class="cart__item__img">
            <img src="${kanapData[y].imageUrl}" alt="${kanapData[y].altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${kanapData[y].description}</h2>
            <p>Couleur : ${cart[x].color}</p>
            <p>Prix unitaire : ${kanapData[y].price} €</p>
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
        </article>`)}
    }
}

// ecouter les changement de quantité 
let checkChange = document.querySelectorAll(".itemQuantity");
checkChange.forEach( elem => {
    elem.addEventListener("input", 
    function() {
        let cart = getCart()
        tempCart = { 
            ProductID: elem.closest('article').dataset.id,
            color: elem.closest('article').dataset.color,
            qty: parseInt(elem.closest('input').value)
            }
    for (let x = 0; x < cart.length; x++) {
        if (cart[x].ProductID === elem.closest('article').dataset.id && cart[x].color === elem.closest('article').dataset.color) {
            cart.splice(x, 1, tempCart)
            localStorage.setItem('Panier', JSON.stringify(cart))
            }}
        }
    )
})

// suppression d'un element + refresh de la page
let boutonDelete = document.querySelectorAll(".deleteItem");
for (let i = 0; i < boutonDelete.length; i++) {
    boutonDelete[i].addEventListener("click", function() {
        for (let x = 0; x < cart.length; x++) {
            if (cart[x].ProductID === boutonDelete[i].closest('article').dataset.id && cart[x].color === boutonDelete[i].closest('article').dataset.color) {
                let isExecuted = confirm("Voulez vous supprimer cet article du panier ?");
                if (isExecuted === true) {
                    cart.splice(x, 1)
                    localStorage.setItem('Panier', JSON.stringify(cart))
                    location.reload()}
                else {
                    return
                }
            }
        }
    })
}

//               <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>


