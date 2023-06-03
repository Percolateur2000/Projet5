let i = 0;

// debut de la fonction une fois que le DOM est chargé
let start = () => {
  fetch("https://kanapi.gtnsimon.dev/api/products")
    .then((res) => res.json())
    .then((data) => {
      sessionStorage.setItem("productData", JSON.stringify(data));
      const kanapData = JSON.parse(sessionStorage.getItem("productData"));
      for (let element of kanapData) {
        document.getElementById('items')
          .insertAdjacentHTML('beforeend',
            `<a href="./product.html?id=${kanapData[i]._id}"><article><img src="${kanapData[i].imageUrl}" alt="${kanapData[i].altTxt}"><h3 class="productName">${kanapData[i].name}</h3><p class="productDescription">${kanapData[i].description}</p></article></a>`);
        i++
      }
    })
}

window.addEventListener('load', start)