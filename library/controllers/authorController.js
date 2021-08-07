var Author = require("../models/author");

var async = require("async");
var Book = require("../models/book");

var { body, validationResult } = require("express-validator");

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
  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books: function (callback) {
        Book.find({ author: req.params.id }, "title summary").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.author === null) {
        // no results
        var err = new Error("Author not found");
        err.status = 404;
        return next(err);
      }
      // render on success
      res.render("index", {
        title: "Author Detail",
        author: results.author,
        author_books: results.authors_books,
      });
    }
  );
};

// display author create form on GET
exports.author_create_get = function (req, res, next) {
  res.render("author_form", {
    title: "Create Author",
    author: undefined,
    errors: undefined,
  });
};

// handle author create on POST
exports.author_create_post = [
  // validate and sanitize fields
  body("first_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),

  body("family_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Family name must be specified.")
    .isAlphanumeric()
    .withMessage("Family name has non-alphanumeric characters."),

  body("date_of_birth", "Invalid date of birth")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  body("date_of_death", "Invalid date of death")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // process request after validation and sanitization
  (req, res, next) => {
    // extract validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // render form with sanitized values/ err messages
      res.render("author_form", {
        title: "Create Author",
        author: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // form data is valid - create Author object with processed data

      var author = new Author({
        first_name: req.body.first_name,
        family_name: req.body.family_name,
        date_of_birth: req.body.date_of_birth,
        date_of_death: req.body.date_of_death,
      });
      author.save(function (err) {
        if (err) {
          return next(err);
        }
        //redirect to new author record on success
        res.redirect(author.url);
      });
    }
  },
];

// display author delete form on GET
exports.author_delete_get = function (req, res) {
  async.parallel(
    {
      author: function (callback) {
        Author.findById(req.params.id).exec(callback);
      },
      authors_books: function (callback) {
        Book.find({ author: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.author === null) {
        // no results
        res.redirect("/catalog/authors");
      }
      // render on success
      res.render("author_delete", {
        title: "Delete Author",
        author: results.author,
        author_books: results.authors_books,
      });
    }
  );
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
