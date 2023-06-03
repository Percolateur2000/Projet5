function getCart() {
    let cartData = localStorage.getItem('Panier')
    if (!cartData) {
        return []
    }
    try {
        return JSON.parse(cartData)
    }
    catch {
        return []
    }
}

let cart = getCart();
let kanapData = JSON.parse(sessionStorage.getItem("productData"));
let qtyTotal = document.getElementById('totalQuantity');
let prixTotal = document.getElementById('totalPrice');
let kanapPrice = []


// affichage des elements dans le DOM
for (let x = 0; x < cart.length; x++) {
    for (let y = 0; y < kanapData.length; y++) {
        if (cart[x].ProductID === kanapData[y]._id) {
            document.getElementById("cart__items").insertAdjacentHTML("beforeend",
                `<article class="cart__item" data-id="${kanapData[y]._id}" data-color="${cart[x].color}">
            <div class="cart__item__img">
            <img src="${kanapData[y].imageUrl}" alt="${kanapData[y].altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${kanapData[y].name}</h2>
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
        </article>`)
            kanapPrice.push(kanapData[y].price)
        }
    }
}

// ecouter les changement de quantité 
let checkChange = document.querySelectorAll(".itemQuantity");
checkChange.forEach(elem => {
    elem.addEventListener("input", () => {
        if (parseInt(elem.closest('input').value) < 0 || parseInt(elem.closest('input').value) > 100 ) {
            alert('Merci de verifier la quantité')
            return
        }
        else {
        let cart = getCart()
        tempCart = {
            ProductID: elem.closest('article').dataset.id,
            color: elem.closest('article').dataset.color,
            qty: parseInt(elem.closest('input').value)
        }
        for (let x = 0; x < cart.length; x++) {
            if (cart[x].ProductID === elem.closest('article').dataset.id && cart[x].color === elem.closest('article').dataset.color) {
                cart.splice(x, 1, tempCart);
                localStorage.setItem('Panier', JSON.stringify(cart));
            }
        }
    }})
})

// suppression d'un element + refresh de la page
let boutonDelete = document.querySelectorAll(".deleteItem");
for (let i = 0; i < boutonDelete.length; i++) {
    boutonDelete[i].addEventListener("click", () => {
        for (let x = 0; x < cart.length; x++) {
            if (cart[x].ProductID === boutonDelete[i].closest('article').dataset.id && cart[x].color === boutonDelete[i].closest('article').dataset.color) {
                let isExecuted = confirm("Voulez vous supprimer cet article du panier ?");
                if (isExecuted === true) {
                    cart.splice(x, 1)
                    localStorage.setItem('Panier', JSON.stringify(cart))
                    location.reload()
                };
            }
        }
    })
}

// calcul du total d'items
let articleTotal = () => {
    let total = 0
    let cart = getCart();
    for (let i = 0; i < cart.length; i++) {
        total = total + cart[i].qty
    }
    return total
}

// calcul du total du prix
let totalPrix = () => {
    let cart = getCart();
    let total = 0
    for (let i = 0; i < kanapPrice.length; i++) {
        total = total + (kanapPrice[i] * cart[i].qty)
    }
    return total
}

//affichage des quantités et prix actualiés à chaque changement
let newQty = document.querySelectorAll(".itemQuantity");
for (let i = 0; i < newQty.length; i++) {
    newQty[i].addEventListener("change", () => {
        qtyTotal.innerText = articleTotal();
        prixTotal.innerText = totalPrix();
    }
    )
}

qtyTotal.innerText = articleTotal()
prixTotal.innerText = totalPrix()
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let address = document.getElementById('address')
let city = document.getElementById('city')
let email = document.getElementById('email')
let bouton = document.getElementById('order')

// verification des infos client
bouton.addEventListener('click', regCheck)

// regEx verification
function regCheck(click) {
    if ((/\d/).test(firstName.value) === true || firstName.value === "") {
        click.preventDefault()
        msgError('firstNameErrorMsg');
        return
    }
    else msgOk('firstNameErrorMsg');
    if ((/\d/).test(lastName.value) === true || lastName.value === "") {
        click.preventDefault()
        msgError('lastNameErrorMsg');
        return
    }
    else msgOk('lastNameErrorMsg');
    if ((/^(?=.{2,40}$)(?:\w+[_+-.,!@#$%^&*();/|<>"]\w+)*$/).test(address.value) === true || address.value === "") {
        click.preventDefault()
        msgError('addressErrorMsg');
        return
    }
    else msgOk('addressErrorMsg');
    if ((/^(?=.{2,20}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/).test(city.value) === false || city.value === "") {
        click.preventDefault()
        msgError('cityErrorMsg');
        return
    }
    else msgOk('cityErrorMsg');
    if ((/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?=.{2,6}$)(?:\w+[.][a-zA-Z]+)*$/).test(email.value) === false || email.value === "") {
        click.preventDefault()
        msgError('emailErrorMsg');
        return
    }
    else {
        click.preventDefault()
        msgOk('emailErrorMsg')
    };
    if (articleTotal() <= 0) {
        alert('Votre panier est vide')
        return
    }
    let isComplete = confirm("Etes vous sûr(e) de vouloir valider votre panier avec ces informations ?");
    if (isComplete === true) {
        click.preventDefault();
        panierFinal();
    } else
        click.preventDefault();
}

// message d'erreur en fonction de l'emplacement de la saisie
function msgError(location) {
    document.getElementById(location).innerText = "Verifier votre saisie"
}

// message ok en fonction de l'emplacement de la saisie
function msgOk(location) {
    document.getElementById(location).innerText = ""
}

//creation du fichier à envoyer
function panierFinal() {
    let kanapLs = getCart()
    let newKanapLs = kanapLs.map((id) => {
        return id.ProductID
    }
    )
    let user = {
        contact: {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
        },
        products: newKanapLs
    }
    fetch("http://localhost:3000/api/products/order", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            Accept: 'application/json; charset=UTF-8',
            'Content-Type': 'application/json'
        }
    })
        .then((response) => { return response.json() })
        .then((data) => {
            location.href = `confirmation.html?id=${data.orderId}`
        })
        .catch(() => {
            alert(`Une erreur est survenue`)
        })
}