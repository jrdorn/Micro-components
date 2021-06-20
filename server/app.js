const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;

//allow cross-origin resource sharing
app.options("*", cors());
app.use(cors());

//server static files from directory
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/kitty.png");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
