"use strict";

const cartIconWrapEl = document.querySelector(".cartIconWrap");
const basketCounterEl = document.querySelector(".cartIconWrap span");
const basketEl = document.querySelector(".basket");
const basketTotalValueEl = document.querySelector(".basketTotalValue");
const basketTotalEl = document.querySelector(".basketTotal");
const featuredItemsEl = document.querySelector(".featuredItems");
const featuredItemEl = document.querySelector(".featuredItem");
const list = featuredItemsEl.childNodes;

const basket = {};

cartIconWrapEl.addEventListener("click", event => {
  if (event.currentTarget.classList.contains("cartIconWrap")) {
    basketEl.classList.toggle("hidden");
  }
});

for (const el of list) {
  el.addEventListener("click", event => {
    if (!event.target.closest(".addToCart")) {
      return;
    }
    const id = +event.currentTarget.closest(".featuredItem").dataset.id;
    const name = event.currentTarget.closest(".featuredItem").dataset.name;
    const price = +event.currentTarget.closest(".featuredItem").dataset.price;
    addToCart(id, name, price);
    renderBasket(id);
  });
}

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = {
      id: id,
      name: name,
      price: price,
      count: 0,
    };
  }
  basket[id].count++;
  basketCounterEl.textContent = getTotalCount().toString();
  basketTotalValueEl.textContent = getTotalprice().toFixed();
}

function getTotalCount() {
  console.log(Object.values(basket));
  return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
}

function getTotalprice() {
  console.log(Object.values(basket));
  return Object.values(basket).reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
}

function renderBasket(id) {
  const basketRowEl = basketEl.querySelector(
    `.basketRow[data-productId="${id}"]`
  );
  if (!basketRowEl) {
    renderProductBasket(id);
    return;
  }

  basketRowEl.querySelector(".productCount").textContent = basket[id].count;
  basketRowEl.querySelector(".productTotalRow").textContent =
    basket[id].count * basket[id].price;
}

function renderProductBasket(productId) {
  const newProduct = `
    <div class="basketRow" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>${basket[productId].price}</div>
      <div>
        <span class="productTotalRow">${
          basket[productId].count * basket[productId].price
        }</span>
      </div>
    </div>
  `;
  basketTotalEl.insertAdjacentHTML("beforebegin", newProduct);
}
