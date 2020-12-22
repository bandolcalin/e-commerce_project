let banner = document.createElement("div");
body.appendChild(banner);
banner.id = "banner";
banner.innerHTML = "Produsul dumneavoastră a fost adăugat în coș";

function getParamfromURL(queryParam) {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    return urlParams.get(queryParam);
}

window.onload = () => {
    showProductDetails();
}

function showProductDetails() {
    let productId = getParamfromURL("productId");
    if (productId) {
        loadDetails(productId);
    } else {
        document.getElementById("test").innerHTML = "Produsul cautat nu a fost gasit!";
    }
}

function loadDetails(productId) {

    fetch(`https://magazin-online-magazin.firebaseio.com/products/${productId}.json`)
        .then(response => {
            return response.json();
        })
        .then(prod => {

            let detailsBody = document.createElement('div');
            detailsBody.id = "detailsBody";
            body.appendChild(detailsBody);



            let productImg = document.createElement('img');
            productImg.src = prod.img;
            detailsBody.appendChild(productImg);

            let productName = document.createElement('p');
            productName.id = "product-name";
            productName.innerHTML = prod.name;
            detailsBody.appendChild(productName);

            let productPrice = document.createElement('p');
            productPrice.innerHTML = prod.price + " Lei";
            detailsBody.appendChild(productPrice);

            let buyBtn = document.createElement('button');
            buyBtn.innerHTML = "Adaugă în coș";
            buyBtn.id = prod;
            detailsBody.appendChild(buyBtn);

            buyBtn.addEventListener('click', () => addToCart({
                id: productId,
                img: prod.img,
                price: prod.price,
                name: prod.name,
                qty: 1,
                totalProductQuantity: prod.quantity
            }));

            // let descriptionSeparator = document.createElement('p');
            // descriptionSeparator.innerHTML = 'Descriere produs';
            // detailsBody.appendChild(descriptionSeparator);
            // descriptionSeparator.id = 'description-separator';

            // let hr = document.createElement('hr');
            // hr.id = 'rounded';
            // detailsBody.appendChild(hr);

            let productDescription = document.createElement('p');
            productDescription.innerHTML = prod.description;
            detailsBody.appendChild(productDescription);
            productDescription.id = 'product-description';
        });
};