const btn = document.querySelector("button");
const input = document.querySelector("input");
const list = document.querySelector("ul");

btn.addEventListener("click", function () {
  const val = input.value;
  input.value = "";

  const listItem = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");

  listItem.appendChild(span);
  span.innerText = val;
  listItem.appendChild(delBtn);
  delBtn.innerText = "Delete";

  list.appendChild(listItem);

  delBtn.addEventListener("click", function () {
    listItem.remove();
  });

  input.focus();
});

// <div>
//   <label for="item">Enter a new item: </label>
//   <input type="text" name="item" id="item" />
//   <button>Add item</button>
// </div>

// <ul></ul>
