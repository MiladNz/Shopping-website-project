import { productsData } from "./products.js";

const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");

const productsDOM = document.querySelector(".products-center");

const cart = [];
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
              <img src="${item.imageUrl}" class="product-img" />
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
      console.log(event.target.dataset.id);
      });
    });
  }
}
//3.storage

class Storage{
  static saveProducts(products){
    localStorage.setItem("products",JSON.stringify(products));
  }
}


document.addEventListener("DOMContentLoaded",()=>{
  const products = new Products();
  const productsData = products.getProduct();
  const ui = new UI();
  ui.displayProducts(productsData);
  ui.getAddToCartBtns();
  Storage.saveProducts(productsData);
  // console.log(productsData);
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
