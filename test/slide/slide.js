// || Variables

const slideshow = document.querySelector(".slideWrap");
const slides = document.querySelectorAll(".slideEntry");
const slideCount = slides.length;
let currentSlide = 0;
let slideHeight;
let initialHeight = slides[0].clientHeight;

// || Setup

//activate first slide
slides[0].classList.add("active");
slideshow.style.height = `${initialHeight}px`;

// || Functions

//move forward or backward in slideshow
function moveToSlide(n) {
  slides[currentSlide].className = "slideEntry";
  currentSlide = (n + slideCount) % slideCount;
  slides[currentSlide].className = "slideEntry active";
  slideHeight = slides[currentSlide].clientHeight;
  slideshow.style.height = `${slideHeight}px`;
}

//move to next slide
function nextSlide(e) {
  moveToSlide(currentSlide + 1);
  if (e !== undefined) {
    clearInterval(intID);
    //right arrow key pressed
    if (e.keyCode === 39) {
      moveToSlide(currentSlide + 1);
    }
  }
}

//move to previous slide
function prevSlide(e) {
  moveToSlide(currentSlide - 1);
  if (e !== undefined) {
    clearInterval(intID);
    //left arrow key pressed
    if (e.keyCode === 37) {
      moveToSlide(currentSlide - 1);
    }
  }
}

// || Event Listeners

//
document.querySelector("#nextSlide").addEventListener("click", nextSlide);
document.body.addEventListener("keydown", nextSlide);

document.querySelector("#prevSlide").addEventListener("click", prevSlide);
document.body.addEventListener("keydown", prevSlide);
//

//autoplay
const intID = setInterval(function () {
  nextSlide();
}, 3000);
