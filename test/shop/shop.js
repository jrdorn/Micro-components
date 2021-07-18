// || Navbar with hamburger

const ham = document.querySelector(".ham");
const navMenu = document.querySelector(".navMenu");

//toggle hamburger menu
function mobileMenu() {
  ham.classList.toggle("active");
  navMenu.classList.toggle("active");
}

ham.addEventListener("click", mobileMenu);

//close hamburger menu when link clicked
const navLink = document.querySelectorAll(".navLink");

navLink.forEach((link) => link.addEventListener("click", closeMenu));

function closeMenu() {
  ham.classList.remove("active");
  navMenu.classList.remove("active");
}
