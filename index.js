let banner = document.createElement("div");
body.appendChild(banner);
banner.id = "banner";
banner.innerHTML = "Produsul dumneavoastră a fost adăugat în coș";

let prod = [];

window.onload = () => {
  displayAllProducts();
};

function displayAllProducts() {
  fetch("https://magazin-online-magazin.firebaseio.com/products.json")
    .then(response => {
      return response.json();
    })
    .then(products => {
      var productsEntries = Object.entries(products);
      for (var i = 0; i < productsEntries.length; i++) {
        prod.push({
          id: productsEntries[i][0],
          prod: productsEntries[i][1]
        });
      }
      displayProducts();
    });
}

function displayProducts() {
  for (let i = 0; i < prod.length; i++) {
    let body = document.getElementById("body");
    let productContainer = document.createElement("div");
    body.appendChild(productContainer);
    productContainer.id = "productContainer";

    let imageProduct = document.createElement("img");
    imageProduct.src = prod[i].prod.img;
    productContainer.appendChild(imageProduct);

    let pDiv = document.createElement('div');
    pDiv.id = "pDiv";
    productContainer.appendChild(pDiv);

    let nameProduct = document.createElement("p");
    nameProduct.innerHTML = prod[i].prod.name;
    pDiv.appendChild(nameProduct);

    let priceProduct = document.createElement("p");
    priceProduct.innerHTML = prod[i].prod.price + " Lei";
    productContainer.appendChild(priceProduct);

    let detailsBtn = document.createElement("button");
    detailsBtn.innerHTML = "Detalii";
    productContainer.appendChild(detailsBtn);

    detailsBtn.addEventListener("click", () => {
      window.location.replace(`detalii.html?productId=${prod[i].id}`);
    });

    let buyBtn = document.createElement("button");
    buyBtn.innerHTML = "Adaugă în coș";
    buyBtn.id = prod[i].id;
    productContainer.appendChild(buyBtn);
    buyBtn.addEventListener("click", (event) => {
      addProductToCart(event)
        banner.style.visibility = "visible";
        setTimeout(() => {
          banner.style.visibility = "hidden";
        }, 1000)
    });

    function addProductToCart() {
      addToCart({
           id: prod[i].id,
            img: prod[i].prod.img,
            price: prod[i].prod.price,
            name: prod[i].prod.name,
            qty: 1,
            totalProductQuantity: prod[i].prod.quantity
          });
      
  }
}
}