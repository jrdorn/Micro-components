var Genre = require("../models/genre");

// display list of all genre
exports.genre_list = function (req, res, next) {
  Genre.find().exec(function (err, list_genres) {
    if (err) {
      return next(err);
    }
    //render on success
    res.render("index", { title: "Genre List", genre_list: list_genres });
  });
};

// detail page for an genre
exports.genre_detail = function (req, res) {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
};

// display genre create form on GET
exports.genre_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre create GET");
};

// handle genre create on POST
exports.genre_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre create POST");
};

// display genre delete form on GET
exports.genre_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete GET");
};

// handle genre delete on POST
exports.genre_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre delete POST");
};

// display genre update form on GET
exports.genre_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update GET");
};

// handle genre update on POST
exports.genre_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Genre update POST");
};
