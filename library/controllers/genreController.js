var Genre = require("../models/genre");
var Book = require("../models/book");
var async = require("async");

var { body, validationResult } = require("express-validator");

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
exports.genre_detail = function (req, res, next) {
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: function (callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.genre === null) {
        //no results
        let err = new Error("Genre not found");
        err.status = 404;
        return next(err);
      }
      //render on success
      res.render("index", {
        title: "Genre Detail",
        genre: results.genre,
        genre_books: results.genre_books,
      });
    }
  );
};

// display genre create form on GET
exports.genre_create_get = function (req, res, next) {
  res.render("genre_form", {
    title: "Create Genre",
    genre: undefined,
    errors: undefined,
  });
};

// handle genre create on POST
exports.genre_create_post = [
  // validate and sanitize name field
  body("name", "Genre name required").trim().isLength({ min: 1 }).escape(),

  // process request after validation and sanitization
  (req, res, next) => {
    // extract validation errors from request
    const errors = validationResult(req);

    // create new genre object with escaped and trimmed data
    var genre = new Genre({ name: req.body.name });

    if (!errors.isEmpty()) {
      // if there are errors, render form again with sanitized values/ error messages
      res.render("genre_form", {
        title: "Create Genre",
        genre: genre,
        errors: errors.array(),
      });
      return;
    } else {
      //form data is valid - check if Genre already exists
      Genre.findOne({ name: req.body.name }).exec(function (err, found_genre) {
        if (err) {
          return next(err);
        }

        if (found_genre) {
          //redirect to Genre detail page
          res.redirect(found_genre.url);
        } else {
          genre.save(function (err) {
            if (err) {
              return next(err);
            }
            //save Genre, redirect to detail page
            res.redirect(genre.url);
          });
        }
      });
    }
  },
];

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
