const addToCartEventListeners = () => {
  document.querySelectorAll(".add_to_cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const code = e.target.getAttribute("data-code");
      const product = data.find((item) => item.code === code);
      if (product) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItem = cart.find((item) => item.code === product.code);
        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
      }
    });
  });
};

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartNumberElement = document.querySelector(".open_cart_number");
  if (cartNumberElement) {
    cartNumberElement.textContent = totalItems;
  } else {
    console.error("Element .open_cart_number not found!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
