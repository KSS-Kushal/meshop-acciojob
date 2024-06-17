// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button

const currUser = JSON.parse(localStorage.getItem('currUser'));
if(!currUser){
    window.location.href = "/login";
}

const carts = JSON.parse(localStorage.getItem('carts') || '{}');
let cart = carts[currUser.email] || [];

const address = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const country = document.getElementById("country");
const pin = document.getElementById("pin");
const error = document.getElementById("error");
const totalUSD = document.getElementById('totalUSD');
const totalINR = document.getElementById('totalINR');

error.style.display = 'none';

const isValidate = () => {
  if (
    address.value.length === 0 ||
    city.value.length === 0 ||
    state.value.length === 0 ||
    country.value.length === 0 ||
    pin.value.length === 0
  ) {
    error.textContent = "Please enter all required fields!";
    error.style.color = "#FF0000";
    error.style.display = "block";
    return false;
  }else{
    error.style.display = 'none';
    return true;
  }
};

const getTotal = (currency) => {
  let total = 0;
  cart.forEach(v=>{
    total += v.price;
  });
  return currency==="INR"? total*100*80 : total.toFixed(2);
}

totalUSD.innerHTML = `$${getTotal("USD")}`;
totalINR.innerHTML = `₹${(getTotal("INR")/100).toFixed(2)}`;

document.getElementById("rzp-button1").onclick = function (e) {
  if (isValidate()) {
    var options = {
      key: "rzp_test_XkdlJD67wCK4N9", // Enter the Key ID generated from the Dashboard
      amount: getTotal("INR"), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "MyShop Checkout",
      description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      theme: {
        color: "#000",
      },
      image:
        "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
    };
  
    if (getTotal()>0) {
      var rzpy1 = new Razorpay(options);
      rzpy1.open();
      // clear mycart - localStorage
      delete carts[currUser.email];
      localStorage.setItem('carts', JSON.stringify(carts));
      cart = [];
      // alert('Your Order Successfully Placed!');
      // window.location.href = '/shop';
      address.value = '';
      city.value = '';
      state.value = '';
      country.value = '';
      pin.value = '';
      totalINR.innerHTML = '₹0';
      totalUSD.innerHTML = '$0';
    }else{
      alert('Your cart is empty! Please add to cart');
      window.location.href = '/shop';
    }

    e.preventDefault();
  }
};
