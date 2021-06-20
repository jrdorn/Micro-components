//async turns a function into a promise
async function myFetch() {
  let response = await fetch("http://127.0.0.1:3000/coffee.jpg");

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.blob();
}

myFetch()
  .then((blob) => {
    let objectURL = URL.createObjectURL(blob);
    let image = document.createElement("img");
    image.src = objectURL;
    document.body.appendChild(image);
  })
  .catch((e) => {
    console.log("Err: " + e.message);
  });
