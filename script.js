// --- LOGIN FUNCTION ---
// --- LOGIN ---
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
    { name: "Refrigerator", price: 1000 },
    { name: "Camera", price: 25000 },
    { name: "Tablet", price: 20000 },
    { name: "Book", price: 300 },
    { name: "Sunglasses", price: 700 },
    { name: "Keyboard", price: 1500 },
    { name: "Mouse", price: 800 },
    { name: "Speaker", price: 3500 },
    { name: "Smartwatch", price: 5000 },
    { name: "Fan", price: 1200 },
    { name: "TV", price: 40000 }
];

// --- LOAD PRODUCTS ---
function loadProducts() {
    displayProducts(products);
}

function displayProducts(list) {
    const productList = document.getElementById("product-list");
    if (!productList) return;

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

// --- SEARCH ---
function searchItems() {
    const query = document.getElementById("search-box").value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(query)
    );
    displayProducts(filtered);
}

// --- ADD TO CART (ONLY ONE VERSION) ---
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ name, price });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart");
}

// --- GO TO CHECKOUT ---
function checkout() {
    window.location.href = "checkout.html";
}

// --- LOAD CHECKOUT PAGE ---
function loadCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;
    const summary = document.getElementById("order-summary");

    if (!summary) return;

    summary.innerHTML = "";

    cart.forEach(item => {
        const p = document.createElement("p");
        p.textContent = `${item.name} - ₹${item.price}`;
        summary.appendChild(p);

        total += item.price;
    });

    document.getElementById("total").textContent = total;
}

// --- PLACE ORDER ---
function placeOrder() {
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;

    if (address && phone) {
        document.getElementById("order-msg").textContent =
            "✅ Order placed successfully!";

        localStorage.removeItem("cart"); // clear cart
    } else {
        document.getElementById("order-msg").textContent =
            "Please fill all details.";
    }
    return false;
}
