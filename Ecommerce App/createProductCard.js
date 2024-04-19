export const createProductCard = (
  products,
  parentElement,
  findProductInCart,
  pageType
) => {
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

    /**Image container */
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("card-image-container");

    const image = document.createElement("img");
    image.classList.add("card-image");

    image.setAttribute("src", product.img);
    image.setAttribute("alt", product.name);

    imageContainer.appendChild(image);

    //   productContainer.appendChild(imageContainer);

    /**card Detail container */
    const cardDetailsContainer = document.createElement("div");
    cardDetailsContainer.classList.add("card-details");

    const brandContainer = document.createElement("div");
    brandContainer.classList.add("card-Title");
    brandContainer.innerText = product.brand;
    cardDetailsContainer.appendChild(brandContainer);

    /**card description container*/
    let DescriptionContainer = document.createElement("div");
    DescriptionContainer.classList.add("card-description");

    /**Product Name */
    let name = document.createElement("p");
    name.classList.add("card-des");
    name.innerText = product.name;
    DescriptionContainer.appendChild(name);

    /** Product price */
    const price = document.createElement("p");
    price.classList.add("card-price", "d-flex", "align-end", "gap-sm");
    price.innerText = `Rs. ${product.newPrice}`;

    const oldPrice = document.createElement("span");
    oldPrice.classList.add("price-strike-through");
    oldPrice.innerText = `Rs. ${product.oldPrice}`;
    price.appendChild(oldPrice);

    const discount = document.createElement("span");
    discount.classList.add("discount");
    discount.innerText = `(${product.discount}% OFF)`;
    price.appendChild(discount);

    DescriptionContainer.appendChild(price);

    /** Rating Container */
    const ratings = document.createElement("p");
    ratings.classList.add("d-flex", "align-center");

    const rating = document.createElement("span");
    rating.innerText = product.rating;
    ratings.appendChild(rating);

    const star = document.createElement("span");
    star.classList.add("material-icons-outlined", "star");
    star.innerText = "star";
    ratings.appendChild(star);

    DescriptionContainer.appendChild(ratings);
    cardDetailsContainer.appendChild(DescriptionContainer);

    /**CTA Button Container */

    const ctaButton = document.createElement("div");
    ctaButton.classList.add("cta-btn");

    const cartButton = document.createElement("div");
    cartButton.classList.add(
      "button",
      "btn-primary",
      "btn-icon",
      "cart-btn",
      "d-flex",
      "align-center",
      "justify-center",
      "gap",
      "cursor",
      "btn-margin"
    );

    cartButton.setAttribute("data-id", product._id); // to set the data set id
    const cart = document.createElement("span");
    cart.classList.add("material-icons-outlined");
    cart.innerText = "shopping_cart";
    cartButton.appendChild(cart);

    const buttonText = document.createElement("span");
    const isProductInCart = findProductInCart(JSON.parse(localStorage.getItem("cart")),product._id);  // get cart item
    buttonText.innerText =     // if page type is cart then add remove | else page type is product and item are already added in cart then Go to cart | else add to cart 
      pageType === "cart"
        ? "Remove"
        : pageType === "products" && isProductInCart
        ? "Go to cart"
        : "Add to cart";
    // buttonText.innerText = "Add to Cart";
    cartButton.appendChild(buttonText);

    ctaButton.appendChild(cartButton);
    cardDetailsContainer.appendChild(ctaButton);

    //................................................

    cardContainer.appendChild(imageContainer);
    cardContainer.appendChild(cardDetailsContainer);

    parentElement.appendChild(cardContainer);
  }
};
