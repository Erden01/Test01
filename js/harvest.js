const data = [
  {
    link: "#chair.html",
    title: "Slim PRO",
    desc: "Cтул Slim PRO предназначено не только для работы за компьютером, но и для дополнения антуража помещения. Красиво выполненная конструкция не только изысканно смотрится.",
    price: "83000",
    img: "images/stul_kresla/SlimPRO.png",
    code: "6702",
    parent: "computer",
    category: "computer_chair",
  },
  {
    link: "#chair.html",
    title: "Slim",
    desc: "Изящные, легкие, универсальные и эргономичные кресла Slim подойдут для кабинета руководителя. А различные модификации этой серии позволят оформить в едином стиле различные зоны офиса.",
    price: "79000",
    img: "images/stul_kresla/slim.png",
    code: "6101",
    parent: "computer",
    category: "computer_chair",
  },
  {
    link: "#chair.html",
    title: "Slim DC",
    desc: "Кресло Slim DC - это офисное кресло для руководителя спинка и сидение которого выполнена из из мягкой сетки.",
    price: "134100",
    img: "images/stul_kresla/GloryDC.png",
    code: "6987",
    parent: "computer",
    category: "computer_chair",
  },
  {
    link: "#chair.html",
    title: "Hi-tech",
    desc: "Модель Hi-tech изготовлена в модном дизайне, а значит, будет отлично смотреться в любом современном интерьере.",
    price: "95500",
    img: "images/stul_kresla/Hi-tech.png",
    code: "6203",
    parent: "computer",
    category: "computer_chair",
  },
  {
    link: "#chair.html",
    title: "Hi-tech PRO",
    desc: "Профилированная спинка – спинка, имеет анатомически правильную форму, повторяющую естественный изгиб позвоночника.",
    price: "125000",
    img: "images/stul_kresla/Hi-techPRO.png",
    code: "6057",
    parent: "computer",
    category: "computer_chair",
  },
  {
    link: "#chair.html",
    title: "Prestige DC",
    desc: "Утонченность и функциональность, высокое качество обивочных материалов и комплектующих – сочетание, достойное современного офисного кресла.",
    price: "122000",
    img: "images/stul_kresla/PrestigeDC.png",
    code: "6041",
    parent: "computer",
    category: "computer_chair",
  },
  {
    link: "#chair.html",
    title: "Comfort DC",
    desc: "Многоцелевое кресло нового поколения, олицетворяет новые стандарты простоты, универсальной применимости, качества и комфорта.",
    price: "97610",
    img: "images/stul_kresla/ComfortDC.png",
    code: "6807",
    parent: "computer",
    category: "computer_chair",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const chairProducts = document.getElementById("chairProducts");
  const sortingOptions = document.querySelectorAll(".sorting_option li");

  if (chairProducts) {
    displayList(data, chairProducts);
  }

  sortingOptions.forEach((option) => {
    option.addEventListener("click", (event) => {
      handleSortChange(event, data, chairProducts);
      updateSelectedSortOption(event.target);
    });
  });
});

function displayList(array, container) {
  container.innerHTML = "";
  array.forEach((item) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product_item");

    productItem.innerHTML = `
      <a href="${item.link}" class="product_item_content">
        <img src="${item.img}" alt="${item.title}" class="product_item_img">
        <div class="product_item_text">
          <h5>${item.title} | code: ${item.code}</h5>
          <p>${item.desc}</p>
        </div>
      </a>
      <div class="product_item_price">
        <span class="product_item_price_text">Цена:</span>
        <span class="product_item_price_cost">${Number(
          item.price
        ).toLocaleString("ru-RU")} ₸</span>
        <button class="add_to_cart product_item_price_btn" data-code="${
          item.code
        }">Добавить в корзину</button>
      </div>
    `;
    container.appendChild(productItem);
  });

  addToCartEventListeners();
}
