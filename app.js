import { productsData } from "./products.js";

const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");

const productsDOM = document.querySelector(".products-center");
const cartTotal = document.querySelector(".cart-total");
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".cart-content");

let cart = [];
//1.get products from producs.js

class Products{
  getProduct(){
    return productsData;
  }
}
//2.display products

class UI{
  displayProducts(products){
    let result = "";
    products.forEach(item => {
      result +=`<div class="product">
            <div class="img-container">
              <img src="${item.imageUrl}" class="product-img"/>
            </div>
            <div class="product-desc">
              <p class="product-price">${item.price}</p>
              <p class="product-title">${item.title}</p>
            </div>
            <button class="btn add-to-cart" data-id=${item.id}>
              <i class="fas fa-shopping-cart"></i>
              add to cart
            </button>
          </div>`;
          productsDOM.innerHTML = result;
    });
  }
  getAddToCartBtns(){
    const addToCartBtns = document.querySelectorAll(".add-to-cart");
    const buttons = [...addToCartBtns];
    
    buttons.forEach(btn =>{
      const id = btn.dataset.id;
      //check this product id is in cart or not
      const isInCart = cart.find((p) => p.id === id);
      if (isInCart) {
        btn.innerText = "In Cart";
        btn.disabled = true;
      }
      
    btn.addEventListener("click", (event)=>{
      event.target.innerText = "In Cart";
      event.target.disabled = true;
      //get product from products:
      const addedProduct = {...Storage.getProduct(id) , quantity: 1};
      //add to cart
      cart = [...cart , addedProduct];
      //save cart to local storage
      Storage.saveCart(cart);
      //update cart value
      this.setCartValue(cart);
      //add to cart item
      this.addCartItem(addedProduct);
      //get cart value from local storage
      });
    });
  }
  setCartValue(cart){
    //1. cart items
    //2. cart total price
    let tempCartItems = 0;
    const totalPrice = cart.reduce((acc,curr) => {
      tempCartItems += curr.quantity;
      return acc + curr.quantity + curr.price;
    },0);
    cartTotal.innerText =  `total price : ${totalPrice.toFixed(2)} $`;
    cartItems.innerText = tempCartItems;
  }
  addCartItem(cartItem){
    const div = document.createElement("div");
    div.classList.add("cart-item"); 
    div.innerHTML = `<img class="cart-item-img" src=${cartItem.imageUrl}>
    <div class="cart-item-desc">
      <h4>${cartItem.title}</h4>
      <h5>$ ${cartItem.price}</h5>
    </div>
    <div class="cart-item-conteoller">
      <i class="fas fa-chevron-up"></i>
      <p>${cartItem.quantity}</p>
      <i class="fas fa-chevron-down"></i>
    </div>
    <i class="far fa-trash-alt"></i>
    `;
    cartContent.appendChild(div);
  }
  setupApp(){
    //get cart from storage
    cart = Storage.getCart() || [];
    // addCartItem
    cart.forEach((cartItem)=>this.addCartItem(cartItem));
    //setValue : price + items
    this.setCartValue(cart);
  }
}
//3.storage

class Storage{
  static saveProducts(products){
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProduct(id){
    const _products =  JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id === parseInt(id));
  }
  static saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart(){
    return JSON.parse(localStorage.getItem("cart"));
  }
}


document.addEventListener("DOMContentLoaded",()=>{
  const products = new Products();
  const productsData = products.getProduct();
  //set up : get cart and set up app
  const ui = new UI();
  ui.setupApp();
  ui.displayProducts(productsData);
  ui.getAddToCartBtns();
  Storage.saveProducts(productsData);
})


//////////////////////////////////////////
function showModalFunction() {
  backDrop.style.display = "block";
  cartModal.style.opacity = "1";
  cartModal.style.top = "20%";
}

function closeModalFunction() {
  backDrop.style.display = "none";
  cartModal.style.opacity = "0";
  cartModal.style.top = "-100%";
}

cartBtn.addEventListener("click", showModalFunction);
closeModal.addEventListener("click", closeModalFunction);
backDrop.addEventListener("click", closeModalFunction);
