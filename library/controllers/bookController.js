var Book = require("../models/book");
var Author = require("../models/author");
var Genre = require("../models/genre");
var BookInstance = require("../models/bookinstance");

var async = require("async");

exports.index = function (req, res) {
  // get the counts for each model
  async.parallel(
    {
      book_count: function (callback) {
        Book.countDocuments({}, callback); //empty object as match condition to find all docs in collection
      },
      book_instance_count: function (callback) {
        BookInstance.countDocuments({}, callback);
      },
      author_count: function (callback) {
        Author.countDocuments({}, callback);
      },
      genre_count: function (callback) {
        Genre.countDocuments({}, callback);
      },
    },
    //counts are passed to view "index" via results object
    function (err, results) {
      res.render("index", { title: "Library Home", error: err, data: results });
    }
  );
};

// display list of all books
exports.book_list = function (req, res) {
  res.send("NOT IMPLEMENTED: Book list");
};

// detail page for a book
exports.book_detail = function (req, res) {
  res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};

// display book create form on GET
exports.book_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create GET");
};

// handle book create on POST
exports.book_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book create POST");
};

// display book delete form on GET
exports.book_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete GET");
};

// handle book delete on POST
exports.book_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book delete POST");
};

// display book update form on GET
exports.book_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update GET");
};

// handle book update on POST
exports.book_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Book update POST");
};
