// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };

const currUser = JSON.parse(localStorage.getItem("currUser"));
// if (!currUser) {
//   window.location.href = "/login";
// }

let products = JSON.parse(localStorage.getItem("products"));
let carts = JSON.parse(localStorage.getItem("carts") || "{}");
if (!products) {
  const colors = ["red", "blue", "black", "green", "white"];
  const sizes = ["xs", "s", "m", "l", "xl"];

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      const newData = data.filter((item) => {
        item.colors = colors.slice(Math.floor(Math.random() * colors.length));
        item.sizes = sizes.slice(Math.floor(Math.random() * sizes.length));
        return item;
      });
      localStorage.setItem("products", JSON.stringify(newData));
      products = newData;
      render(newData);
    });
}

const allTab = document.getElementById("all");
const mensTab = document.getElementById("mens");
const womensTab = document.getElementById("womens");
const jewelleryTab = document.getElementById("jewellery");
const electronicsTab = document.getElementById("electronics");

const mensSection = document.getElementById("menSection");
const womensSection = document.getElementById("womenSection");
const jewellerySection = document.getElementById("jewelerySection");
const electronicsSection = document.getElementById("electronicsSection");

let currentActiveTab = "all";

const removeActive = () => {
  allTab.classList.remove("active");
  mensTab.classList.remove("active");
  womensTab.classList.remove("active");
  jewelleryTab.classList.remove("active");
  electronicsTab.classList.remove("active");
};

const removeSection = () => {
  mensSection.style.display = "none";
  womensSection.style.display = "none";
  jewellerySection.style.display = "none";
  electronicsSection.style.display = "none";
};
const renderProduct = (products, containerId) => {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  products.forEach((product, i) => {
    container.innerHTML += `
    <div class="item">
      <img src="${product.image}" width="280px" height="350px" />
      <div class="info">
        <div class="row">
          <div class="price">$${product.price}</div>
          <div class="sized">${product.sizes.join(",")}</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row">
            ${product.colors
        .map((v) => {
          return `<div class="circle" style="background-color: ${v}"></div>`;
        })
        .join(" ")}
          </div>
        </div>
        <div class="row">Rating: ${product.rating.rate}</div>
      </div>
      <button id="addBtn${i}" onclick="addToCart(${JSON.stringify(product)
        .replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;")})">Add to Cart</button>
    </div>
    `;
  });
};

const render = () => {
  if (currentActiveTab === "all") {
    const mansProduct = products.filter(
      (v, i) => v.category === "men's clothing"
    );
    renderProduct(mansProduct, "mensContainer");
    const womansProduct = products.filter(
      (v, i) => v.category === "women's clothing"
    );
    renderProduct(womansProduct, "womensContainer");
    const jeweleryProduct = products.filter(
      (v, i) => v.category === "jewelery"
    );
    renderProduct(jeweleryProduct, "jeweleryContainer");
    const electronicsProduct = products.filter(
      (v, i) => v.category === "electronics"
    );
    renderProduct(electronicsProduct, "electronicsContainer");
  } else if (currentActiveTab === "men's clothing") {
    const mansProduct = products.filter(
      (v, i) => v.category === "men's clothing"
    );
    renderProduct(mansProduct, "mensContainer");
  } else if (currentActiveTab === "women's clothing") {
    const womansProduct = products.filter(
      (v, i) => v.category === "women's clothing"
    );
    renderProduct(womansProduct, "womensContainer");
  } else if (currentActiveTab === "jewelery") {
    const jeweleryProduct = products.filter(
      (v, i) => v.category === "jewelery"
    );
    renderProduct(jeweleryProduct, "jeweleryContainer");
  } else {
    const electronicsProduct = products.filter(
      (v, i) => v.category === "electronics"
    );
    renderProduct(electronicsProduct, "electronicsContainer");
  }
};

const searchInput = document.getElementById("search");
const filterProductsByName = () => {
  products = JSON.parse(localStorage.getItem("products"));
  const value = searchInput.value;
  if (value.length > 0) {
    products = products.filter((v) =>
      v.title.toLowerCase().includes(value.toLowerCase())
    );
  }
  render();
};

const rating = document.getElementById("range");
rating.onchange = (e) => {
  const value = e.target.value;
  products = JSON.parse(localStorage.getItem("products"));
  if (value > 0) {
    products = products.filter((v) => v.rating.rate > value);
  }
  render();
};

const price0To25 = document.getElementById("0-25");
const price25To50 = document.getElementById("25-50");
const price50To100 = document.getElementById("50-100");
const price100On = document.getElementById("100on");
const filterProductsByPrice = () => {
  products = JSON.parse(localStorage.getItem("products"));
  const p0_25 = price0To25.checked;
  const p25_50 = price25To50.checked;
  const p50_100 = price50To100.checked;
  const p100On = price100On.checked;
  if (p0_25 && p25_50 && p50_100 && p100On) {
    render();
    return;
  }
  if (!p0_25 && !p25_50 && !p50_100 && !p100On) {
    render();
    return;
  }
  const pro0_25 = products.filter((v) => v.price >= 0 && v.price < 25);
  const pro25_50 = products.filter((v) => v.price >= 25 && v.price < 50);
  const pro50_100 = products.filter((v) => v.price >= 50 && v.price < 100);
  const pro100_On = products.filter((v) => v.price >= 100);

  let newProducts = [];
  if (p0_25) newProducts = newProducts.concat(pro0_25);
  if (p25_50) newProducts = newProducts.concat(pro25_50);
  if (p50_100) newProducts = newProducts.concat(pro50_100);
  if (p100On) newProducts = newProducts.concat(pro100_On);
  products = newProducts;
  render();
};

console.log(products);

allTab.addEventListener("click", () => {
  removeActive();
  currentActiveTab = "all";
  allTab.classList.add("active");
  mensSection.style.display = "block";
  womensSection.style.display = "block";
  jewellerySection.style.display = "block";
  electronicsSection.style.display = "block";
  const mansProduct = products.filter(
    (v, i) => v.category === "men's clothing"
  );
  renderProduct(mansProduct, "mensContainer");
  const womansProduct = products.filter(
    (v, i) => v.category === "women's clothing"
  );
  renderProduct(womansProduct, "womensContainer");
  const jeweleryProduct = products.filter((v, i) => v.category === "jewelery");
  renderProduct(jeweleryProduct, "jeweleryContainer");
  const electronicsProduct = products.filter(
    (v, i) => v.category === "electronics"
  );
  renderProduct(electronicsProduct, "electronicsContainer");
});
allTab.click();

mensTab.onclick = () => {
  removeActive();
  removeSection();
  currentActiveTab = "men's clothing";
  mensTab.classList.add("active");
  mensSection.style.display = "block";
  const mansProduct = products.filter(
    (v, i) => v.category === "men's clothing"
  );
  renderProduct(mansProduct, "mensContainer");
};

womensTab.onclick = () => {
  removeActive();
  removeSection();
  currentActiveTab = "women's clothing";
  womensTab.classList.add("active");
  womensSection.style.display = "block";
  const womansProduct = products.filter(
    (v, i) => v.category === "women's clothing"
  );
  renderProduct(womansProduct, "womensContainer");
};

jewelleryTab.onclick = () => {
  removeActive();
  removeSection();
  currentActiveTab = "jewelery";
  jewelleryTab.classList.add("active");
  jewellerySection.style.display = "block";
  const jeweleryProduct = products.filter((v, i) => v.category === "jewelery");
  renderProduct(jeweleryProduct, "jeweleryContainer");
};

electronicsTab.onclick = () => {
  removeActive();
  removeSection();
  currentActiveTab = "electronics";
  electronicsTab.classList.add("active");
  electronicsSection.style.display = "block";
  const electronicsProduct = products.filter(
    (v, i) => v.category === "electronics"
  );
  renderProduct(electronicsProduct, "electronicsContainer");
};

searchInput.onchange = () => {
  filterProductsByName();
};

searchInput.onkeydown = (e) => {
  if (e.key === "enter") {
    filterProductsByName();
  }
};

price0To25.onclick = filterProductsByPrice;
price25To50.onclick = filterProductsByPrice;
price50To100.onclick = filterProductsByPrice;
price100On.onclick = filterProductsByPrice;

const addToCart = (item) => {
  if (!currUser) {
    alert('Please login!')
    window.location.href = "/login";
  }
  if (Object.keys(carts).includes(currUser.email)) {
    const cartItems = carts[currUser.email];
    cartItems.push(item);
    carts[currUser.email] = cartItems;
  } else {
    carts[currUser.email] = [item];
  }
  alert(`${item.title.length>25?(item.title.substring(0, 22)+ "..."): item.title} is added to cart`);
  localStorage.setItem("carts", JSON.stringify(carts));
};
