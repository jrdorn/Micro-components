(function () {
  let httpRequest;
  document
    .getElementById("ajaxButton")
    .addEventListener("click", makeRequest());

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("Giving up: cannot create XMLHTTP instance");
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("GET", "http://localhost:3000/test.xml");
    httpRequest.send();
  }

  function alertContents() {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          let xmldoc = httpRequest.responseXML;
          let root_node = xmldoc.getElementsByTagName("root").item(0);
          alert(root_node.firstChild.data);
        } else {
          alert("Something went wrong with the request");
        }
      }
    } catch (e) {
      alert(`Caught exception: ${e.description}`);
    }
  }
})();
