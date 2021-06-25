//grab HTML elements
const rememberDiv = document.querySelector(".remember");
const forgetDiv = document.querySelector(".forget");
const form = document.querySelector("form");
const nameInput = document.querySelector("#entername");
const submitBtn = document.querySelector("#submitname");
const forgetBtn = document.querySelector("#forgetname");

const h1 = document.querySelector("h1");
const personalGreeting = document.querySelector(".personal-greeting");

//prevent form from submitting when a button is pressed
form.addEventListener("submit", function (e) {
  e.preventDefault();
});

//store name and display personal greeting
submitBtn.addEventListener("click", function () {
  localStorage.setItem("name", nameInput.value);
  nameDisplayCheck();
});

//remove name from storage and update greeting display
forgetBtn.addEventListener("click", function () {
  localStorage.removeItem("name");
  nameDisplayCheck();
});

//display a personalized or generic greeting
function nameDisplayCheck() {
  if (localStorage.getItem("name")) {
    let name = localStorage.getItem("name");
    h1.textContent = "Welcome, " + name;
    personalGreeting.textContent =
      "Welcome to our website, " +
      name +
      "! We hope you have fun while you are here.";
    forgetDiv.style.display = "block";
    rememberDiv.style.display = "none";
  } else {
    h1.textContent = "Welcome to our website";
    personalGreeting.textContent =
      "Welcome to our website. We hope you have fun while you are here.";
    forgetDiv.style.display = "none";
    rememberDiv.style.display = "block";
  }
}
//check name every time page is loaded
document.body.onload = nameDisplayCheck;
