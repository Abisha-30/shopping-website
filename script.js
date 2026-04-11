let cart = [];

function addToCart(name, price) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }

    updateCart();
}

function removeItem(name) {
    cart = cart.filter(p => p.name !== name);
    updateCart();
}

function changeQty(name, change) {
    let item = cart.find(p => p.name === name);

    if (item) {
        item.qty += change;

        if (item.qty <= 0) {
            removeItem(name);
        }
    }

    updateCart();
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");

        li.innerHTML = `
            ${item.name} - ₹${item.price} x ${item.qty}
            <button onclick="changeQty('${item.name}', 1)">+</button>
            <button onclick="changeQty('${item.name}', -1)">-</button>
            <button onclick="removeItem('${item.name}')">Remove</button>
        `;

        cartItems.appendChild(li);

        total += item.price * item.qty;
    });

    document.getElementById("total").textContent = total;
}
