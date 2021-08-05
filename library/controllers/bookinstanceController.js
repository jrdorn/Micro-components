var BookInstance = require("../models/bookinstance");

var { body, validationResult } = require("express-validator");
var Book = require("../models/book");

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
exports.bookinstance_detail = function (req, res, next) {
  BookInstance.findById(req.params.id)
    .populate("book")
    .exec(function (err, bookinstance) {
      if (err) {
        return next(err);
      }
      if (bookinstance === null) {
        //no results
        let err = new Error("Book copy not found");
        err.status = 404;
        return next(err);
      }
      //render on success
      res.render("index", {
        title: "Book Instance Detail",
        subtitle: "Copy: " + bookinstance.book.title,
        bookinstance: bookinstance,
      });
    });
};

// display BookInstance create form on GET
exports.bookinstance_create_get = function (req, res, next) {
  Book.find({}, "title").exec(function (err, books) {
    if (err) {
      return next(err);
    }
    // render on success
    res.render("bookinstance_form", {
      title: "Create BookInstance",
      book_list: books,
    });
  });
};

// handle BookInstance create on POST
exports.bookinstance_create_post = [
  // validate and sanitize
  body("book", "Book must be specified").trim().isLength({ min: 1 }).escape(),
  body("imprint", "Imprint must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("status").escape(),
  body("due_back", "Invalid date")
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),

  // process request after validation and sanitization
  (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    // BookInstance object with escaped and trimmed data
    var bookinstance = new BookInstance({
      book: req.body.book,
      imprint: req.body.imprint,
      status: req.body.status,
      due_back: req.body.due_back,
    });

    if (!errors.isEmpty()) {
      // render form again
      Book.find({}, "title").exec(function (err, books) {
        if (err) {
          return next(err);
        }
        // render if successful
        res.render("bookinstance_form", {
          title: "Create BookInstance",
          book_list: books,
          selected_book: bookinstance.book._id,
          errors: errors.array(),
          bookinstance: bookinstance,
        });
      });
      return;
    } else {
      // data invalid
      bookinstance.save(function (err) {
        if (err) {
          return next(err);
        }
        // redirect to new record if successful
        res.redirect(bookinstance.url);
      });
    }
  },
];

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
