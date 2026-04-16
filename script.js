// --- LOGIN FUNCTION ---
function loginUser() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        window.location.href = "shop.html";
    } else {
        document.getElementById("login-msg").textContent = "Invalid login!";
    }
    return false;
}

// --- PRODUCT LIST ---
const products = [
    { name: "Selfie stick", price: 1200 },
    { name: "Watch", price: 800 },
    { name: "Laptop", price: 45000 },
    { name: "Phone", price: 15000 },
    { name: "Headphones", price: 2000 },
    { name: "Bag", price: 600 },
    { name: "Remote car", price: 1000 },
    { name: "Camera", price: 25000 },
    { name: "Tablet", price: 20000 },
    { name: "Book", price: 300 },
    { name: "Sunglasses", price: 700 },
    { name: "Keyboard", price: 1500 },
    { name: "Mouse", price: 800 },
    { name: "Speaker", price: 3500 },
    { name: "Smartwatch", price: 5000 },
    { name: "fan", price: 1200 },
    { name: "Remote", price: 1000 },
    { name: "refrigerator", price: 2500 },
    { name: "TV", price: 40000 }
    // Add more items here
];

// --- LOAD PRODUCTS ---
function loadProducts() {
    displayProducts(products);
}

function displayProducts(list) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    list.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add</button>
        `;
        productList.appendChild(div);
    });
}

// --- SEARCH FUNCTION ---
function searchItems() {
    const query = document.getElementById("search-box").value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    displayProducts(filtered);
}

// --- CART LOGIC ---
let cart = [];
let total = 0;

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;
    cartItems.innerHTML = "";

    cart.forEach((product, index) => {
        const li = document.createElement("li");
        li.textContent = `${product.item} - ₹${product.price}`;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.onclick = () => removeFromCart(index);

        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    const totalElement = document.getElementById("total");
    if (totalElement) totalElement.textContent = total;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCart();
}

// --- CHECKOUT LOGIC ---
function checkout() {
    window.location.href = "checkout.html";
}

function showOrderSummary() {
    const summary = document.getElementById("order-summary");
    if (!summary) return;

    summary.innerHTML = "<h2>Order Summary</h2>";
    cart.forEach(product => {
        const p = document.createElement("p");
        p.textContent = `${product.item} - ₹${product.price}`;
        summary.appendChild(p);
    });

    const totalP = document.createElement("p");
    totalP.textContent = "Total: ₹" + total;
    summary.appendChild(totalP);
}

function placeOrder() {
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (address && phone) {
        document.getElementById("order-msg").textContent =
            "✅ Order placed successfully! Items will be delivered to " + address;
    } else {
        document.getElementById("order-msg").textContent =
            "Please fill in all details.";
    }
    return false;
}
