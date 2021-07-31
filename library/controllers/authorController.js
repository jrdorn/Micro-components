var Author = require("../models/author");

// display list of all authors
exports.author_list = function (req, res, next) {
  Author.find()
    .sort([["family_name", "ascending"]])
    .exec(function (err, list_authors) {
      if (err) {
        return next(err);
      }
      //render on success
      res.render("index", { title: "Author List", author_list: list_authors });
    });
};

// detail page for an author
exports.author_detail = function (req, res) {
  res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
};

// display author create form on GET
exports.author_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create GET");
};

// handle author create on POST
exports.author_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author create POST");
};

// display author delete form on GET
exports.author_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// handle author delete on POST
exports.author_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// display author update form on GET
exports.author_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// handle author update on POST
exports.author_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: Author update POST");
};
