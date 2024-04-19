// import { createProductCard } from "./createProductCard.js";
import { createHorizontalProductCard } from "./createHorizontalProductCard.js";
import { findProductInCart } from "./utils/findProductInCart.js";

const cartContainer = document.getElementById("cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartContainer.addEventListener("click", (event) => {
  // remove carditem from cart
  cart = cart.filter(({ _id }) => _id !== event.target.dataset.id);

  cartContainer.innerHTML = "";
  // createProductCard(cart,cartContainer,findProductInCart,'cart')
  createHorizontalProductCard(cart, cartContainer, findProductInCart, "cart");

  localStorage.setItem("cart", JSON.stringify(cart));
});

// createProductCard(cart,cartContainer,findProductInCart,'cart')
createHorizontalProductCard(cart, cartContainer, findProductInCart, "cart");



/**Pricing starts here ........*/

const cartLength = document.querySelector(".item-count");
cartLength.innerText = cart.length;

const productPrice = document.querySelector(".product-price");

const priceAfterDiscount = cart.reduce((acc, cur) => acc + cur.newPrice, 0);
productPrice.innerText = priceAfterDiscount;

const discount = document.querySelectorAll(".discounted-amount");
const priceBeforeDiscount = cart.reduce((acc, cur) => acc + cur.oldPrice, 0);

const discountedAmount = priceBeforeDiscount - priceAfterDiscount;
// discount.innerText=discountedAmount

for (let element of discount) {
  element.innerText = discountedAmount;
}

const totalAmount = document.querySelector(".total-amount");
totalAmount.innerText = priceAfterDiscount - discountedAmount + 100;

/**......................*/
