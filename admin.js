let addProductContainer = document.createElement('div');

let form = document.getElementById('form-wrapper');
let nameInput = document.createElement('input');
let priceInput = document.createElement('input');
let descriptionInput = document.createElement('textarea');
let quantityInput = document.createElement('input');
let imgInput = document.createElement('input');

let name = document.createElement('p');
let price = document.createElement('p');
let description = document.createElement('p');
let quantity = document.createElement('p');
let image = document.createElement('p');

name.innerHTML = "Name of the product";
price.innerHTML = "Price of the product";
description.innerHTML = "Description of the product";
quantity.innerHTML = "Quantity of the product"
image.innerHTML = "Image source of the product";

nameInput.setAttribute("type", "text");
priceInput.setAttribute("type", "text");
descriptionInput.setAttribute("type", "text");
quantityInput.setAttribute("type", "text");
imgInput.setAttribute("type", "text");

addProductContainer.appendChild(name);
addProductContainer.appendChild(nameInput);
addProductContainer.appendChild(price);
addProductContainer.appendChild(priceInput);
addProductContainer.appendChild(description)
addProductContainer.appendChild(descriptionInput);
addProductContainer.appendChild(quantity);
addProductContainer.appendChild(quantityInput);
addProductContainer.appendChild(image);
addProductContainer.appendChild(imgInput);
addProductContainer.id.add = "addProductContainer";

form.appendChild(addProductContainer);

let button = document.createElement("button");
button.innerHTML = "Adauga produs";
addProductContainer.appendChild(button);

let buttonForm = document.createElement("button");
buttonForm.innerHTML = "Adauga produs";
body.appendChild(buttonForm);
buttonForm.id = "buttonForm";

button.addEventListener("click", addProduct);
buttonForm.addEventListener("click", () => {
    form.style.display = "flex"
    buttonForm.style. display = "none";
})

function addProduct() {
    fetch("https://magazin-online-magazin.firebaseio.com/products.json", {
        method: "POST",
        body: JSON.stringify({
            name: `${nameInput.value}`,
            price: `${priceInput.value}`,
            quantity: `${quantityInput.value}`,
            img: `${imgInput.value}`,
            description: `${descriptionInput.value}`,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .then(() => getAndDisplayProducts())
};

var prod = [];

window.onload = () => {getAndDisplayProducts()};

function getAndDisplayProducts() {
    fetch("https://magazin-online-magazin.firebaseio.com/products.json")
    .then(response => {
        return response.json();
    })
    .then(products => {
        prod = [];
        resetView();
        var productsEntries = Object.entries(products)
        for (var i = 0; i < productsEntries.length; i++) {
            prod.push({
                id: productsEntries[i][0],
                prod: productsEntries[i][1]
            });
        };
        displayProducts();
    });
};

function resetView() {
    // reset form
    // reset product list
    document.getElementById("content-wrapper").innerHTML = "";
};

function displayProducts() {

    for (let i = 0; i < prod.length; i++) {
        let body = document.getElementById('content-wrapper');
        let table = document.createElement('table');
        table.id.add = 'table';
        body.appendChild(table);
        console.log(prod)

        let imageProductTd = document.createElement('td');
        let imageProduct = document.createElement('img');
        imageProduct.src = prod[i].prod.img;
        table.appendChild(imageProductTd);
        imageProductTd.appendChild(imageProduct);

        let nameProduct = document.createElement('td');
        nameProduct.innerHTML = prod[i].prod.name;
        table.appendChild(nameProduct);

        let priceProduct = document.createElement('td');
        priceProduct.innerHTML = prod[i].prod.price + " Lei";
        let modifyPrice = document.createElement('input');
        modifyPrice.type = "number";
        modifyPrice.min = '0';
        modifyPrice.id = prod[i].id;
        priceProduct.appendChild(modifyPrice);
        let inputPrice = document.createElement('input');
        inputPrice.type = "submit";
        inputPrice.id = prod[i].id;
        priceProduct.appendChild(inputPrice);
        inputPrice.addEventListener('click', (event) => {
            let price = modifyPrice.value
            modifyPriceProduct(event.target.id,price)
        });
        modifyPrice.value = prod[i].prod.price;
        table.appendChild(priceProduct);

        let quantityProduct = document.createElement('td');
        quantityProduct.innerHTML = prod[i].prod.quantity;
        let modifyQuantity = document.createElement('input');
        modifyQuantity.type = "number";
        modifyQuantity.min = '0';
        quantityProduct.appendChild(modifyQuantity);
        let inputQuantity = document.createElement('input');
        inputQuantity.type = "submit";
        inputQuantity.id = prod[i].id;
        quantityProduct.appendChild(inputQuantity);
        inputQuantity.addEventListener('click', (event) => {
            let quantity = modifyQuantity.value
            modify(event.target.id,quantity).then(() => getAndDisplayProducts())
        });
        modifyQuantity.value = prod[i].prod.quantity;
        table.appendChild(quantityProduct);

        let Delete = document.createElement('td');
        let deleteBtn = document.createElement('span');
        deleteBtn.innerHTML = "Sterge";
        deleteBtn.id = prod[i].id;
        deleteBtn.classList = "deteleBtn";
        Delete.appendChild(deleteBtn);
        table.appendChild(Delete);

        deleteBtn.addEventListener('click', (event) => {
            deleteItem(event.target.id)
        });
    };
};

function modifyPriceProduct(id, price) {
    fetch('https://magazin-online-magazin.firebaseio.com/products/' + id + '/price/.json', {
        method: 'PUT',
        mode: 'cors',
        body: price
    })
    .then(response => response.json())
    .then(() => getAndDisplayProducts())
};

function deleteItem(id) {
    fetch('https://magazin-online-magazin.firebaseio.com/products/' + id + '/.json', {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(() => getAndDisplayProducts())
};