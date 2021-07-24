const form = document.querySelector("#reg-form");
form.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();
  const password = document.querySelector("#password").value;

  const result = await fetch("/api/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newpassword: password,
      token: localStorage.getItem("token"),
    }),
  }).then((res) => res.json());

  if (result.status === "OK") {
    // Password update successful
    alert("Success");
  } else {
    alert(result.error);
  }
}
