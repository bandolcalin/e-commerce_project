function modify(id, quantity) {
    fetch(`https://magazin-online-magazin.firebaseio.com/products/${id}/quantity.json`, {
        method: 'PUT',
        mode: 'cors',
        body: quantity
    })
    .then(response => response.json())
};