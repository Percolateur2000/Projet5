
// recuperation de l'api et stockage dans sessionStorage
function fetchApi() {fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => sessionStorage.setItem("productData", JSON.stringify(data)))
}

window.addEventListener('load', fetchApi())

const kanapData = JSON.parse(sessionStorage.getItem("productData"));

// insert des elements en html dans le dom
let i = 0;
for (let element of kanapData) {
  document.getElementById('items')
  .insertAdjacentHTML('beforeend',
  `<a href="./product.html?${kanapData[i]._id}"><article><img src="${kanapData[i].imageUrl}" alt="${kanapData[i].altTxt}"><h3 class="productName">${kanapData[i].name}</h3><p class="productDescription">${kanapData[i].description}</p></article></a>`);
  i++
}


/* <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> */