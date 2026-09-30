const products = [

  ["Red Apple", "🍎", "Fruits", 180, "kg"],
  ["Green Pineapple", "🍍", "Fruits", 60, "piece"],
  ["Rani Pineapple", "🍍", "Fruits", 80, "piece"],
  ["Fauji Apple", "🍎", "Fruits", 160, "kg"],
  ["Delicious Apple", "🍎", "Fruits", 200, "kg"],
  ["Kashmiri Apple", "🍎", "Fruits", 140, "kg"],
  ["Golden Apple", "🍏", "Fruits", 220, "kg"],
  ["Orange", "🍊", "Fruits", 80, "kg"],
  ["Mini Orange", "🍊", "Fruits", 100, "kg"],

  ["Kiwi Small", "🥝", "Fruits", 50, "piece"],
  ["Golden Kiwi", "🥝", "Fruits", 100, "piece"],
  ["Bedana", "🔴", "Fruits", 180, "kg"],
  ["Papita", "🥭", "Fruits", 60, "kg"],
  ["Parisiman Fruits", "🍊", "Fruits", 180, "kg"],
  ["Dragon Fruit", "🐉", "Fruits", 120, "piece"],
  ["Aloo Bukhara", "🟣", "Fruits", 180, "kg"],

  ["Dry Fruit", "🥜", "Dry Fruits", 250, "packet"],

  ["Gift Wali Tokri", "🎁", "Gift", 499, "basket"],

  ["Aalu", "🥔", "Vegetables", 40, "kg"],
  ["Pyaj", "🧅", "Vegetables", 50, "kg"],
  ["Tamatar", "🍅", "Vegetables", 40, "kg"],
  ["Khira", "🥒", "Vegetables", 50, "kg"],
  ["Muli", "🤍", "Vegetables", 40, "kg"],
  ["Nimbu", "🍋", "Vegetables", 120, "kg"],
  ["Dhaniya", "🌿", "Vegetables", 20, "bunch"],
  ["Mircha", "🌶️", "Vegetables", 80, "kg"],
  ["Adrak", "🫚", "Vegetables", 120, "kg"],
  ["Shimla Mirch", "🫑", "Vegetables", 80, "kg"],
  ["Gajar", "🥕", "Vegetables", 60, "kg"],
  ["Beet", "🫜", "Vegetables", 55, "kg"]

];


let activeCategory = "All";
let cart = [];


// ================= PRODUCTS =================

function renderProducts() {

  const searchText =
    document
      .getElementById("search")
      .value
      .toLowerCase();


  const filteredProducts =
    products.filter(product => {

      const categoryMatch =
        activeCategory === "All" ||
        product[2] === activeCategory;

      const searchMatch =
        product[0]
          .toLowerCase()
          .includes(searchText);

      return categoryMatch && searchMatch;

    });


  const productGrid =
    document.getElementById("productGrid");


  if (filteredProducts.length === 0) {

    productGrid.innerHTML =
      `<div class="empty">
        No products found.
      </div>`;

    return;

  }


  productGrid.innerHTML =
    filteredProducts.map(product => {

      return `

        <article class="product">

          <div class="product-img">
            ${product[1]}
          </div>

          <div class="product-info">

            <h3>
              ${product[0]}
            </h3>

            <p>
              ${product[2]}
            </p>

            <div class="product-row">

              <span class="price">
                ₹${product[3]}/${product[4]}
              </span>

              <button
                class="add"
                onclick='addToCart(${JSON.stringify(product[0])})'>

                + Add

              </button>

            </div>

          </div>

        </article>

      `;

    }).join("");

}


// ================= FILTER =================

function filterProducts(category) {

  activeCategory = category;


  document
    .querySelectorAll(".filters button")
    .forEach(button => {

      button.classList.toggle(
        "active",
        button.textContent.trim() === category
      );

    });


  renderProducts();


  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

}


// ================= ADD CART =================

function addToCart(name) {

  const product =
    products.find(
      product => product[0] === name
    );


  if (!product) return;


  const existing =
    cart.find(
      item => item.name === name
    );


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({

      name: product[0],

      price: product[3],

      unit: product[4],

      quantity: 1

    });

  }


  updateCart();

  openCart();

}


// ================= QUANTITY =================

function changeQuantity(index, amount) {

  cart[index].quantity += amount;


  if (cart[index].quantity <= 0) {

    cart.splice(index, 1);

  }


  updateCart();

}


// ================= UPDATE CART =================

function updateCart() {

  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  const totalPrice =
    cart.reduce(
      (total, item) =>
        total +
        item.price *
        item.quantity,
      0
    );


  document
    .getElementById("cartCount")
    .textContent = totalItems;


  document
    .getElementById("cartTotal")
    .textContent =
      "₹" +
      totalPrice.toLocaleString("en-IN");


  const cartItems =
    document.getElementById(
      "cartItems"
    );


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty">

        Your cart is empty 🍎

      </div>

    `;

    return;

  }


  cartItems.innerHTML =
    cart.map((item,index) => `

      <div class="cart-item">

        <div>

          <b>
            ${item.name}
          </b>

          <br>

          <small>
            ₹${item.price}/${item.unit}
          </small>

          <br>

          <small>
            Subtotal:
            ₹${item.price * item.quantity}
          </small>

        </div>


        <div class="qty">

          <button
            onclick="changeQuantity(${index},-1)">
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            onclick="changeQuantity(${index},1)">
            +
          </button>

        </div>

      </div>

    `).join("");

}


// ================= CART OPEN =================

function openCart() {

  document
    .getElementById("overlay")
    .classList.add("show");

  updateCart();

}


// ================= CART CLOSE =================

function closeCart(event) {

  if (
    !event ||
    event.target.id === "overlay"
  ) {

    document
      .getElementById("overlay")
      .classList.remove("show");

  }

}


// ================= WHATSAPP ORDER =================

function checkout() {

  if (cart.length === 0) {

    alert(
      "Please add products to your cart first."
    );

    return;

  }


  let message =
    "🍎 *Safak Fruit Shop Order*%0A%0A";


  cart.forEach(item => {

    message +=
      "• " +
      item.name +
      " × " +
      item.quantity +
      " " +
      item.unit +
      " = ₹" +
      (item.price * item.quantity) +
      "%0A";

  });


  const total =
    cart.reduce(
      (sum,item) =>
        sum +
        item.price *
        item.quantity,
      0
    );


  message +=
    "%0A💰 *Total: ₹" +
    total +
    "*";


  message +=
    "%0A%0A📍 Please send your delivery address.";


  const whatsappURL =
    "https://wa.me/918873142751?text=" +
    message;


  window.open(
    whatsappURL,
    "_blank"
  );

}


// ================= START =================

renderProducts();
updateCart();