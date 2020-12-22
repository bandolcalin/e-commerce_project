let cartWrapper = document.getElementById("cart-wrapper");
let title = document.createElement('h1')
title.innerHTML = 'Shopping cart:';

cartWrapper.appendChild(title)

var totalPrice = 0;

let products = JSON.parse(localStorage.getItem("userCart")) || [];

for (let i = 0; i < products.length; i++) {

  let cartWrapper = document.getElementById("cart-wrapper");
  let shoppingList = document.createElement('table')
  let productFromTheList = document.createElement('td')

  let imgProduct = document.createElement('img')
  let nameProduct = document.createElement('p')
  let priceProduct = document.createElement('p')
  let quantityProduct = document.createElement('input');
  quantityProduct.type = 'number';
  quantityProduct.min = '1';
  quantityProduct.value = products[i].q;
  quantityProduct.addEventListener('click', update)

  let deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = "Sterge";
  deleteBtn.id = products[i].id;
  deleteBtn.addEventListener('click', (event) => {
    deleteItem(event)
  });

  imgP = localStorage.getItem('cartImg')
  nameP = localStorage.getItem('cartName')
  priceP = localStorage.getItem('cartPrice')

  imgProduct.src = products[i].img;
  nameProduct.innerHTML = products[i].name;
  priceProduct.innerHTML = products[i].price + " Lei";
  priceProduct.value = products[i].price;
  quantityProduct.value = products[i].qty;
  quantityProduct.id = products[i].id;


  productFromTheList.appendChild(imgProduct);
  productFromTheList.appendChild(nameProduct);
  productFromTheList.appendChild(priceProduct);
  productFromTheList.appendChild(quantityProduct);
  productFromTheList.appendChild(deleteBtn);
  cartWrapper.appendChild(shoppingList);
  cartWrapper.appendChild(productFromTheList);

  totalPrice += parseInt(quantityProduct.value * priceProduct.value);


  function update(event) {
    const cart = localStorage.getItem('userCart')
    const parsedCart = JSON.parse(cart)

    const matchedProduct = parsedCart.find((product) => {
      if (product.id === event.target.id) {
        return product;
      }
    });

    if (!matchedProduct) return;

    matchedProduct.qty = event.target.value;

    localStorage.setItem('userCart', JSON.stringify(parsedCart));

    window.location.reload();
  }
}

function deleteItem(element) {
  element = event.target.id;
  let parsedCart = JSON.parse(localStorage.getItem('userCart'));
  let index = parsedCart.findIndex(item => item.id === element);
  parsedCart.splice(index, 1);
  localStorage.setItem('userCart', JSON.stringify(parsedCart));
  window.location.reload();
}

let Total = document.getElementById('total');
let h2 = document.createElement('h2');
let transportTax = document.createElement('h2');
transportTax = 20;
h2.innerHTML = 'TOTAL: ' + totalPrice + ' Lei';
Total.appendChild(h2);
// Total.appendChild(transportTax);

let doneButton = document.createElement('button');
doneButton.innerHTML = "Trimite Comanda";
doneButton.addEventListener('click', checkout);
Total.appendChild(doneButton);

async function resolveAll(requestList) {
  await requestList.forEach(
    async func => { await func() }
  );
}

function checkout() {
  const userCart = JSON.parse(localStorage.getItem("userCart"));

  const modifiers = [];

  userCart.forEach(product => {
    if (product.qty > product.totalProductQuantity) {
      window.alert('Unul sau mai multe dintre produsele dumneavoastră selectate nu mai este pe stoc');
    } else {

    modifiers.push(
      () => modify(product.id, parseInt(product.totalProductQuantity - product.qty)))
  }});


  resolveAll(modifiers).then(() => {
    localStorage.setItem('userCart', JSON.stringify([]));
    window.location.reload();
  });
}


