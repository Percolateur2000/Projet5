const kanapData = JSON.parse(sessionStorage.getItem("productData"));

//associer la page aux données de l'api
let i = 0;
let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.toString();

// recherche de la bonne array en fonction de l'id de la page
while (id != (kanapData[i]._id + '=') ) {
    i++ ;
    var pageID = i;
};

// ajout des elements html
document.querySelector('.item__img')
    .insertAdjacentHTML('afterbegin', `<img src="${kanapData[i].imageUrl}" alt="${kanapData[i].altTxt}"></img>`);
document.getElementById('title')
    .insertAdjacentHTML('afterbegin', `${kanapData[i].name}`);
document.getElementById('price')
    .insertAdjacentHTML('afterbegin', `${kanapData[i].price}`);
document.getElementById('description')
    .insertAdjacentHTML('afterbegin', `${kanapData[i].description}`);

// ajout des elements de la liste en fonction du nombre d'elements dispo    
let c = 0
for ( let color of kanapData[i].colors) {
    document.getElementById('colors')
        .insertAdjacentHTML('afterbegin', `<option value=${kanapData[i].colors[c]}>${kanapData[i].colors[c]}</option>`);
        c++;
}
