function addToCart(prod) {
    let cart = localStorage.getItem("userCart");

    if (!cart) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    const productToBeAdded = {
        id: prod.id,
        img: prod.img,
        price: prod.price,
        name: prod.name,
        qty: 1,
        totalProductQuantity: prod.totalProductQuantity
    };

    const existingProduct = cart.find(p => p.id === productToBeAdded.id);

    if (existingProduct) {
        cart = cart.filter(product => product.id !== productToBeAdded.id);

        productToBeAdded.qty = existingProduct.qty + 1;
    }

    cart.push(productToBeAdded);

    localStorage.setItem('userCart', JSON.stringify(cart));

    banner.style.visibility = "visible";

    setTimeout(() => {
        banner.style.visibility = "hidden";
    }, 1000)
}