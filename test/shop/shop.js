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

// || Side navbar

//active link

const linkColor = document.querySelectorAll(".sNavLink");

function colorLink() {
  linkColor.forEach((link) => link.classList.remove("active"));
  this.classList.add("active");
}

linkColor.forEach((link) => link.addEventListener("click", colorLink));

// || Login sessions with local storage

const uName = document.querySelector("#name");
const uPw = document.querySelector("#pw");

//store input from register form
function store() {
  localStorage.setItem("uName", uName.value);
  localStorage.setItem("uPw", uPw.value);
}

//
function check() {
  //
  const storeName = localStorage.getItem("uName");
  const storePw = localStorage.getItem("uPw");

  //
  const userName = document.querySelector("userName");
  const userPw = document.querySelector("userPw");

  //
  if (userName.value === storeName && userPw.value === storePw) {
    alert("fail");
  } else {
    alert("success");
  }
}
