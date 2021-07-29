var BookInstance = require("../models/bookinstance");

// display list of all BookInstances
exports.bookinstance_list = function (req, res) {
  BookInstance.find()
    .populate("book")
    .exec(function (err, list_bookinstances) {
      if (err) {
        return next(err);
      }
      // render on success
      res.render("index", {
        title: "Book Instance List",
        bookinstance_list: list_bookinstances,
      });
    });
};

// display detail page for a BookInstance
exports.bookinstance_detail = function (req, res) {
  res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
};

// display BookInstance create form on GET
exports.bookinstance_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create GET");
};

// handle BookInstance create on POST
exports.bookinstance_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance create POST");
};

// display BookInstance delete form on GET
exports.bookinstance_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete GET");
};

// handle BookInstance delete on POST
exports.bookinstance_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance delete POST");
};

// display BookInstance update form on GET
exports.bookinstance_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update GET");
};

// handle BookInstance update on POST
exports.bookinstance_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: BookInstance update POST");
};
