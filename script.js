document.addEventListener("DOMContentLoaded", () => {
  const checkoutDiv = document.getElementById("checkoutDiv");
  const cartListsDisplay = document.getElementById("cartListDisplay");
  const totalDisplay = document.getElementById("total-ammount");
  const cartEmptyDisplay = document.getElementById("empty-msg");
  const productCost = document.querySelector(".prduct-cost");
  const productsDisplay = document.getElementById("products");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const productsData = [
    { id: 1, name: "Blue Shirt", price: 49.99 },
    { id: 2, name: "Hat", price: 29.99 },
    { id: 3, name: "Computer", price: 39.99 },
  ];

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  productsData.forEach((ele) => {
    let div = document.createElement("div");
    div.classList =
      "bg-gray-400 mb-2 py-2 px-4 rounded-2xl flex justify-between items-center gap-4";
    div.innerHTML = `
      <span>${ele.name} - $${ele.price.toFixed(2)}</span>
        <button data-id="${
          ele.id
        }" class="addToCartBtn bg-yellow-500 py-1 px-4 rounded-2xl" >
              Add To Cart
            </button>
      `;
    productsDisplay.appendChild(div);
  });

  productsDisplay.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const button = e.target.closest("button");
      const productId = parseInt(button.getAttribute("data-id"));
      const matchedProduct = productsData.find((p) => p.id === productId);
      addToCart(matchedProduct);
      updateLocalStorage();
    }
  });

  cartListsDisplay.addEventListener("click", (e) => {
    if (e.target.id === "delete-btn") {
      const deleteId = parseInt(e.target.dataset.id);
      cart = cart.filter((p) => p.id !== deleteId);
      updateLocalStorage();
      renderCart();
    }
  });

  function addToCart(product) {
    const existingProduct = cart.find((p) => product.id === p.id);

    if (!existingProduct) {
      cart.push({ ...product, quantity: 1 });
      console.log("cart is new");
    } else {
      console.log("cart is already");
      existingProduct.quantity += 1;
    }
    updateLocalStorage();
    renderCart();
  }

  function renderCart() {
    cartListsDisplay.innerHTML = "";
    let totalCost = 0;

    if (cart.length > 0) {
      checkoutDiv.classList.remove("hidden");
      cartEmptyDisplay.classList.add("hidden");

      cart.forEach((p) => {
        totalCost += p.price * p.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList = "cartItem my-2 flex items-center justify-between";
        cartItem.innerHTML = `
        <span> ${p.name} - $${p.price} </span> <span>Qnt: ${p.quantity} <button id="delete-btn" data-id="${p.id}" class="bg-red-700 px-2 rounded-xl text-sm text-white">Delete</button></span>
        `;
        cartListsDisplay.classList.remove("hidden");
        cartListsDisplay.appendChild(cartItem);
      });
      totalDisplay.innerHTML = `$${totalCost.toFixed(2)}`;
    } else {
      checkoutDiv.classList.add("hidden");
      cartEmptyDisplay.classList.remove("hidden");
    }
  }

  checkoutBtn.addEventListener("click", () => {
    cart.length = 0;
    alert("Your Product Is Ready To Deliver");
    updateLocalStorage();
    renderCart();
  });
  renderCart();
});
