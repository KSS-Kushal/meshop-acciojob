const currUser = JSON.parse(localStorage.getItem('currUser'));
if(!currUser){
    window.location.href = "/login";
}

const carts = JSON.parse(localStorage.getItem('carts') || '{}');
let cart = carts[currUser.email] || [];
console.log(cart, "cart")
const priceList = document.getElementById('priceList');
const priceTotal = document.getElementById('totalPrice');

const randerPriceList = (products=[]) => {
    priceList.innerHTML = "";
    products.forEach((v, i)=>{
        priceList.innerHTML += `
            <div class="priceListContainer">
                <p>1. ${v.title.length>15?(v.title.substring(0, 12) + "..."): v.title}</p>
                <p>$ ${v.price}</p>
            </div>
        `;
    })
    calculateTotal(products);
}

const calculateTotal = (products=[]) => {
    let total = 0;
    products.forEach(v=>{
        total += v.price;
    })
    priceTotal.innerHTML = `$ ${total.toFixed(2)}`;
}


const randerCartItem = (products=[]) => {
    const container = document.getElementById('cartContainer');
  container.innerHTML = "";
  if(products.length===0) container.innerHTML = "<div class='noItem'>No Items In Cart</div>";
  products.forEach((product, i) => {
    container.innerHTML += `
    <div class="item">
      <img src="${product.image}" width="280px" height="350px" />
      <div class="info">
          <div class="price">Title : ${product.title.length>25?(product.title.substring(0, 22)+ "..."): product.title}</div>
          <div class="price">Price : $${product.price}</div>
      </div>
      <button id="removeBtn${i}" onclick="removeFromCart(${JSON.stringify(product).replace(/'/g, "&apos;").replace(/"/g, "&quot;")})">Remove From Cart</button>
    </div>
    `;
  });
}

const removeFromCart = (item) => {
    console.log(item)
    cart = cart.filter(v=>v.id!==item.id);
    console.log(cart, 'newCart')
    if(cart.length>0){
        carts[currUser.email] = cart;
    }else{
        delete carts[currUser.email];
    }
    localStorage.setItem('carts', JSON.stringify(carts));
    randerPriceList(cart);
    randerCartItem(cart);
}


randerPriceList(cart);
randerCartItem(cart);

document.getElementById('checkOutBtn').addEventListener('click', ()=>{
    if (cart.length>0) {
        window.location.href = '/razorpay'
    }else{
        alert("No Items In Cart")
    }
});