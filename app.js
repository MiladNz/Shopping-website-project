const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdop");
const closeModal = document.querySelector(".cart-item-confirm");

//cart modal
function showModalFunction(){
    backDrop.style.display = "black";
    cartModal.style.opacity = "1";
    cartModal.style.top = "20%";
}

function closeModalFunction(){
    backDrop.style.display = "none";
    cartModal.style.opacity = "0";
    cartModal.style.top = "-100%";
}

cartBtn.addEventListener("click",showModalFunction);
closeModal.addEventListener("click", closeModalFunction);
backDrop.addEventListener("click", closeModalFunction);