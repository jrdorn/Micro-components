const verseChoose = document.querySelector("select");
const poemDisplay = document.querySelector("pre");

verseChoose.onchange = function () {
  const verse = verseChoose.value;
  updateDisplay(verse);
};

function updateDisplay(verse) {
  verse = verse.replace(" ", "");
  verse = verse.toLowerCase();
  let url = "http://localhost:3000/" + verse + ".txt";

  //   let request = new XMLHttpRequest();
  //   request.open("GET", url);
  //   request.responseType = "text";
  //   request.onload = function () {
  //     poemDisplay.textContent = request.response;
  //   };
  //   request.send();

  fetch(url).then(function (response) {
    response.text().then(function (text) {
      poemDisplay.textContent = text;
    });
  });
}

verseChoose.value = "Verse 1";
updateDisplay("verse1");
