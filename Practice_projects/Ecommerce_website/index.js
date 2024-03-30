import { products } from "./db/products.js";
// // console.log(products)

const productContainer = document.getElementById("products");


for (let product of products) {
  const cardContainer = document.createElement("div");
  cardContainer.classList.add(
    "card",
    "card-vertical",
    "d-flex",
    "direction-column",
    "relative",
    "shadow"
  );
  //   cardContainer.innerText = "product cart";

  const cardImageContainer = document.createElement("div");
  cardImageContainer.classList.add("card-image-container");

  let cardImage = document.createElement("img");
  cardImage.classList.add("card-image");

  cardImage.setAttribute("src", product.img);
  cardImage.setAttribute("alt", product.name);

  cardImageContainer.appendChild(cardImage);

  //   productContainer.appendChild(cardImageContainer);

  /**card container */
  let cardDetails = document.createElement("div");
  cardDetails.classList.add("card-details");

  let cardTitle = document.createElement("div");
  cardTitle.classList.add("card-Title");
  cardTitle.innerText = product.brand;
  cardDetails.appendChild(cardTitle);

  /**card description */
  let cardDescription = document.createElement("div");
  cardDescription.classList.add("card-description");

  let para1 = document.createElement("p");
  para1.classList.add("card-des");
  para1.innerText = product.alt;

  let para2 = document.createElement("p");
  para2.classList.add("card-price");
  para2.innerText = product.newPrice;

  let spanText = document.createElement("span");
  spanText.classList.add("price-strike-through");
  spanText.innerText = product.oldPrice;

  let span2 = document.createElement("span");
  span2.classList.add("discount");
  span2.innerText = `(${product.discount}% OFF)`;

  para2.appendChild(span2);
  para2.appendChild(spanText);

  cardDescription.appendChild(para1);
  cardDescription.appendChild(para2);

  cardDetails.appendChild(cardDescription);

      productContainer.appendChild(cardImageContainer);
  productContainer.appendChild(cardDetails);

  productContainer.appendChild(cardContainer);
}
