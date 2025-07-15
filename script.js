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

  function addToCart(product) {
    cart.push(product);
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
        totalCost += p.price;
        const cartItem = document.createElement("div");
        cartItem.innerHTML = `
        ${p.name} - $${p.price}
        `;
        console.log(cartItem);
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
