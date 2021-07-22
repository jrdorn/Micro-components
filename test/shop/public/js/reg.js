const form = document.getElementById("reg-form");
form.addEventListener("submit", registerUser);

//handle user registration
async function registerUser(event) {
  //prevent page refresh on form submit
  event.preventDefault();

  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  //send JSON data to MongoDB
  const result = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());

  if (result.status === "OK") {
    // user registered
    console.log(`${username} was successfully registered`);
  } else {
    alert(result.error);
  }
}
