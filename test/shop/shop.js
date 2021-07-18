// || Navbar with hamburger

const ham = document.querySelector(".ham");
const navMenu = document.querySelector(".navMenu");

//
function mobileMenu() {
  ham.classList.toggle("active");
  navMenu.classList.toggle("active");
}

ham.addEventListener("click", mobileMenu);
