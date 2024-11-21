function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelector(".open_cart_number").textContent = totalItems;
}

function addToCart(newItem) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.code === newItem.code);

  if (existingItem) {
    existingItem.quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

const btnLocation = document.getElementById("open_cart_btn");

btnLocation.addEventListener("click", () => {
  if (document.querySelector(".jqcart_layout")) return;

  const cartModal = document.createElement("div");
  cartModal.classList.add("jqcart_layout");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartDisplay() {
    const cartItemsList = cartModal.querySelector(".jqcart_tbody");
    const subtotal = cartModal.querySelector(".jqcart_subtotal strong");

    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = "<p>Ваша корзина пуста</p>";
      subtotal.textContent = "Итого: 0 тг";
      return;
    }

    let totalPrice = 0;

    cart.forEach((item) => {
      const cartRow = document.createElement("tr");
      cartRow.classList.add("jqcart_row");
      cartRow.setAttribute("data-id", item.code);

      cartRow.innerHTML = `
        <td class="jqcart_small_td">
          <img src="${item.img}" alt="${item.title}" />
        </td>
        <td>
          <a href="#${item.code}.html">${item.title}</a>
        </td>
        <td class="jqcart_price">${item.price.toLocaleString("ru-RU")} тг</td>
        <td>
          <div class="jqcart_pm">
            <input type="text" class="jqcart_amount" value="${
              item.quantity
            }" readonly>
            <span class="jqcart_incr" data-code="${item.code}" data-incr="1">
              <i class="fa fa-angle-up"></i>
            </span>
            <span class="jqcart_incr" data-code="${item.code}" data-incr="-1">
              <i class="fa fa-angle-down"></i>
            </span>
          </div>
        </td>
        <td class="jqcart_price">
          ${(item.price * item.quantity).toLocaleString("ru-RU")} тг
        </td>
        <td>
          <button class="jqcart_remove_item" data-code="${
            item.code
          }">Удалить</button>
        </td>
      `;

      cartItemsList.appendChild(cartRow);
      totalPrice += item.price * item.quantity;
    });

    subtotal.textContent = `Итого: ${totalPrice.toLocaleString("ru-RU")} тг`;

    addQuantityHandlers();
    addRemoveItemHandlers();
  }

  function addQuantityHandlers() {
    const buttons = cartModal.querySelectorAll(".jqcart_incr");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.getAttribute("data-code");
        const incr = parseInt(btn.getAttribute("data-incr"), 10);
        const item = cart.find((el) => el.code === code);

        if (item) {
          item.quantity = Math.max(0, item.quantity + incr);
          if (item.quantity === 0) {
            cart = cart.filter((el) => el.code !== code);
          }
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay();
          updateCartCount();
        }
      });
    });
  }

  function addRemoveItemHandlers() {
    const removeButtons = cartModal.querySelectorAll(".jqcart_remove_item");
    removeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.getAttribute("data-code");
        cart = cart.filter((item) => item.code !== code);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
      });
    });
  }

  cartModal.innerHTML = `
    <div class="jqcart_content">
      <div class="jqcart_table_wrapper">
        <table class="jqcart_manage_order">
          <thead>
            <tr>
              <th></th>
              <th>ТОВАР</th>
              <th>ЦЕНА</th>
              <th>КОЛИЧЕСТВО</th>
              <th>СТОИМОСТЬ</th>
              <th>ДЕЙСТВИЯ</th>
            </tr>
          </thead>
          <tbody class="jqcart_tbody"></tbody>
        </table>
      </div>
      <div class="jqcart_manage_block">
        <div class="jqcart_btn">
          <button class="jqcart_open_form_btn">Оформить заказ</button>
        </div>
        <button class="jqcart_close_btn">Назад</button>
        <div class="jqcart_subtotal">Итого: <strong>0</strong> тг</div>
      </div>
    </div>
  `;

  document.body.appendChild(cartModal);

  cartModal.querySelector(".jqcart_close_btn").addEventListener("click", () => {
    cartModal.remove();
  });

  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) cartModal.remove();
  });

  updateCartDisplay();
});

// o,yjdktybt количество товаров при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});
