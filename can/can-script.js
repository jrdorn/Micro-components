//retrieve the products
fetch("http://localhost:8000/products.json")
  .then(function (response) {
    return response.json();
  })
  //load and format as a JSON object
  .then(function (json) {
    let products = json;
    initialize(products);
  })
  .catch(function (err) {
    //report any errors
    console.log("Fetch problem: " + err.message);
  });

//set up app logic, variables, and contain all other functions
function initialize(products) {
  //UI components to manipulate
  const category = document.querySelector("#category");
  const searchTerm = document.querySelector("#searchTerm");
  const searchBtn = document.querySelector("button");
  const main = document.querySelector("main");

  //record the last category and search term entered
  let lastCategory = category.value;
  //no search has been made yet
  let lastSearch = "";

  //arrays of object representing products/ filtering by category
  let categoryGroup;
  let finalGroup;

  //initially, display all products
  finalGroup = products;
  updateDisplay();

  //init for searches
  categoryGroup = [];
  finalGroup = [];

  //when search button is clicked, select category of products
  searchBtn.onclick = selectCategory;

  function selectCategory(e) {
    //stop form from submitting
    e.preventDefault();

    //clear out previous search
    categoryGroup = [];
    finalGroup = [];

    //exit if category and search term are the same as the last time search button was clicked
    if (
      category.value === lastCategory &&
      searchTerm.value.trim() === lastSearch
    ) {
      return;
    } else {
      //update record of last category and search term
      lastCategory = category.value;
      lastSearch = searchTerm.value.trim();
      //select all products and filter by search term
      if (category.value === "All") {
        categoryGroup = products;
        selectProducts();
      } else {
        //filter products if specific category is chosen
        let lowerCaseType = category.value.toLowerCase();
        for (let i = 0; i < products.length; i++) {
          //display if product property is same as chosen category
          if (products[i].type === lowerCaseType) {
            categoryGroup.push(products[i]);
          }
        }

        selectProducts();
      }
    }
  }

  //filter products filtered by selectCategory by search term
  function selectProducts() {
    //just display if no search term is entered
    if (searchTerm.value.trim() === "") {
      finalGroup = categoryGroup;
      updateDisplay();
    } else {
      let lowerCaseSearchTerm = searchTerm.value.trim().toLowerCase();
      //push product to finalGroup array if search term is inside product name
      for (let i = 0; i < categoryGroup.length; i++) {
        if (categoryGroup[i].name.indexOf(lowerCaseSearchTerm) !== -1) {
          finalGroup.push(categoryGroup[i]);
        }
      }

      updateDisplay();
    }
  }

  //display new set of products
  function updateDisplay() {
    //remove previous display
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    //display if no products match search term
    if (finalGroup.length === 0) {
      const para = document.createElement("p");
      para.textContent = "No results to display!";
      main.appendChild(para);
    } else {
      for (let i = 0; i < finalGroup.length; i++) {
        fetchBlob(finalGroup[i]);
      }
    }
  }

  //retrieve product image
  function fetchBlob(product) {
    let url = "http://localhost:8000/images/" + product.image;
    fetch(url)
      .then(function (response) {
        return response.blob();
      })
      .then(function (blob) {
        //temporary internal URL that points to object stored in browser
        let objectURL = URL.createObjectURL(blob);
        showProduct(objectURL, product);
      });
  }

  //display inside <main> element
  function showProduct(objectURL, product) {
    const section = document.createElement("section");
    const heading = document.createElement("h2");
    const para = document.createElement("p");
    const image = document.createElement("img");

    section.getAttribute("class", product.type);

    heading.textContent = product.name.replace(
      product.name.charAt(0),
      product.name.charAt(0).toUpperCase()
    );

    para.textContent = "$" + product.price.toFixed(2);

    image.src = objectURL;
    image.alt = product.name;

    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
  }
}
