
// ================= LOGIN =================
function loginUser() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    // ADMIN LOGIN
    if (role === "admin") {
        if (user === "admin" && pass === "1234") {
            localStorage.setItem("role", "admin");
            window.location.href = "shop.html";
        } else {
            document.getElementById("login-msg").textContent = "Invalid Admin!";
        }
    }

    // CUSTOMER LOGIN
    else {
        const savedUser = localStorage.getItem("user");
        const savedPass = localStorage.getItem("pass");

        if (user === savedUser && pass === savedPass) {
            localStorage.setItem("role", "customer");
            localStorage.setItem("customerName", user);
            window.location.href = "shop.html";
        } else {
            document.getElementById("login-msg").textContent = "Invalid Customer!";
        }
    }

    return false;
}

// ================= SIGNUP =================
function signupUser() {
    const user = document.getElementById("newUser").value;
    const pass = document.getElementById("newPass").value;

    localStorage.setItem("user", user);
    localStorage.setItem("pass", pass);

    document.getElementById("signup-msg").textContent =
        "✅ Signup successful! Go to Login.";
    return false;
}

// ================= PRODUCTS (50+) =================
const products = [
    { name: "Laptop", price: 55000 },
    { name: "Gaming Laptop", price: 85000 },
    { name: "Smartphone", price: 18000 },
    { name: "iPhone", price: 75000 },
    { name: "Tablet", price: 22000 },
    { name: "Smart TV", price: 40000 },
    { name: "LED TV", price: 30000 },
    { name: "Android TV Box", price: 3500 },

    { name: "Headphones", price: 2500 },
    { name: "Wireless Headphones", price: 4000 },
    { name: "Earbuds", price: 2000 },
    { name: "Bluetooth Speaker", price: 3500 },
    { name: "Soundbar", price: 8000 },
    { name: "Home Theatre", price: 15000 },

    { name: "Smartwatch", price: 6000 },
    { name: "Fitness Band", price: 3000 },

    { name: "Mouse", price: 800 },
    { name: "Wireless Mouse", price: 1200 },
    { name: "Keyboard", price: 1500 },
    { name: "Mechanical Keyboard", price: 5000 },
    { name: "Monitor", price: 12000 },
    { name: "Gaming Monitor", price: 20000 },

    { name: "Printer", price: 9000 },
    { name: "Scanner", price: 7000 },

    { name: "Camera", price: 45000 },
    { name: "DSLR Camera", price: 65000 },
    { name: "Webcam", price: 2000 },

    { name: "Power Bank", price: 1200 },
    { name: "Fast Charger", price: 800 },
    { name: "Wireless Charger", price: 1500 },

    { name: "USB Cable", price: 300 },
    { name: "USB Flash Drive", price: 600 },
    { name: "External Hard Disk", price: 5000 },
    { name: "SSD", price: 7000 },

    { name: "Router", price: 2000 },
    { name: "WiFi Extender", price: 2500 },

    { name: "Gaming Console", price: 30000 },
    { name: "VR Headset", price: 25000 },
    { name: "Game Controller", price: 3000 },

    { name: "Projector", price: 25000 },
    { name: "Mini Projector", price: 10000 },

    { name: "Microphone", price: 3000 },
    { name: "Studio Microphone", price: 8000 },

    { name: "Electric Kettle", price: 1500 },
    { name: "Induction Stove", price: 3000 },
    { name: "Air Fryer", price: 7000 },
    { name: "Mixer Grinder", price: 5000 },

    { name: "Refrigerator", price: 25000 },
    { name: "Washing Machine", price: 20000 },
    { name: "Air Conditioner", price: 35000 },
    { name: "Ceiling Fan", price: 2500 },

    { name: "Smart Bulb", price: 800 },
    { name: "LED Strip Lights", price: 1200 },
    { name: "CCTV Camera", price: 4000 },
    { name: "Doorbell Camera", price: 5000 }
];

// ================= LOAD PRODUCTS =================
function loadProducts() {
    displayProducts(products);
}

function displayProducts(list) {
    const productList = document.getElementById("product-list");
    if (!productList) return;

    productList.innerHTML = "";

    list.forEach(p => {
        const div = document.createElement("div");
        div.className = "product";

        div.innerHTML = `
            <h3>📱 ${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart('${p.name}', ${p.price})">Add</button>
        `;

        productList.appendChild(div);
    });
}

// ================= SEARCH =================
function searchItems() {
    const q = document.getElementById("search-box").value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(q)
    );
    displayProducts(filtered);
}

// ================= CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    if (!cartItems) return;

    cartItems.innerHTML = "";

    cart.forEach((p, i) => {
        const li = document.createElement("li");
        li.textContent = `${p.item} - ₹${p.price}`;

        const btn = document.createElement("button");
        btn.textContent = "❌";
        btn.onclick = () => removeFromCart(i);

        li.appendChild(btn);
        cartItems.appendChild(li);
    });

    document.getElementById("total").textContent = total;
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// ================= CHECKOUT =================
function checkout() {
    window.location.href = "checkout.html";
}

function showOrderSummary() {
    const summary = document.getElementById("order-summary");
    if (!summary) return;

    summary.innerHTML = "<h2>Order Summary</h2>";

    cart.forEach(p => {
        const el = document.createElement("p");
        el.textContent = `${p.item} - ₹${p.price}`;
        summary.appendChild(el);
    });

    const totalEl = document.createElement("p");
    totalEl.textContent = "Total: ₹" + total;
    summary.appendChild(totalEl);
}

function placeOrder() {
    document.getElementById("order-msg").textContent =
        "✅ Order placed successfully!";

    localStorage.removeItem("cart");
    return false;
}
