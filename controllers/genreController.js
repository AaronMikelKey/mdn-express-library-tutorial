var Book = require('../models/book');
var async = require('async');
var Genre = require('../models/genre');
const { body,validationResult } = require('express-validator');

//display list of genres
exports.genre_list = function(req, res, next) {
    
    Genre.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
        if (err) { return next(err); }
        //Success, then render
        res.render('genre_list', { title: 'Genre List', genre_list: list_genres });
    });
};

//display detail for a specific genre
exports.genre_detail = function(req, res, next) {
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
                .exec(callback);
        },

        genre_books: function(callback) {
            Book.find({ 'genre': req.params.id })
                .exec(callback);
        },
    }, function(err, results) {
        if (err) {return next(err); }
        if (results.genre==null) { //No results.
            var err = new Error('Genre not found');
            err.status = 404;
            return next(err);
        }
        //Success, then render
        res.render('genre_detail', {title: 'Genre Details', genre: results.genre, genre_books: results.genre_books });
    });
};

//Display genre create form on GET.
exports.genre_create_get = function(req, res, next) {
    res.render('genre_form', { title: 'Create Genre' });
};

//Handle genre create on POST.
exports.genre_create_post = [
    
    //Validate and sanitise the name field
    body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),

    //Process request after validation and sanitization.
    (req, res, next) => {

        //Extract the validation errors from a request.
        const errors = validationResult(req);

        //Create a genre object with the escaped and trimmed data.
        var genre = new Genre(
            { name: req.body.name }
        );

        if (!errors.isEmpty()) {
            //There are errors. Render the for again with sanitized values/error messages
            res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() });
            return;
        }
        else {
            //Data from for is valid
            //Check if Genre with same name already exists
            Genre.findOne({ 'name': req.body.name })
                .exec( function(err, found_genre) {
                    if (err) { return next(err); }

                    if (found_genre) {
                        //Genre exists, redirect to it's detail page
                        res.redirect(found_genre.url);
                    }
                    else {

                        genre.save(function (err) {
                            if (err) { return next(err); }
                            //Genre is saved, redirect to genre detail page
                            res.redirect(genre.url);
                        });
                    }
                });
        }
    }
];

//Display genre delete form on GET
exports.genre_delete_get = function(req, res, next) {
  async.parallel({
      genre: function(callback) {
          Genre.findById(req.params.id)
              .exec(callback);
      },

      genre_books: function(callback) {
          Book.find({ 'genre': req.params.id })
              .exec(callback);
      },
  }, function(err, results) {
      if (err) {return next(err); }
      if (results.genre==null) { //No results.
          var err = new Error('Genre not found');
          err.status = 404;
          return next(err);
      }
      //Success, then render
      res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, genre_books: results.genre_books });
  });
};

//Handle genre delete on POST
exports.genre_delete_post = function(req, res, next) {
  async.parallel({
      genre: function(callback) {
          Genre.findById(req.body.genreid).exec(callback)
      },
      genre_books: function(callback) {
          Book.find({ 'genre': req.body.genreid }).exec(callback)
      },
  }, function(err, results) {
      if (err) { return next(err); }
      //Success
      if (results.genre_books.length > 0) {
          //Genre has books.  Render in same way as for GET route.
          res.render('genre_delete', { title: 'Delete Genre', genre: results.genre, genre_books: results.genre_books });
          return;
      }
      else {
          //Genre has no books.  Delete object and redirect to the list of genre
          Genre.findByIdAndRemove(req.body.genreid, function deleteGenre(err) {
              if (err) { return next(err); }
              //Success, go to genre list
              res.redirect('/catalog/genres')
          })
      }
  });
};

//Display genre update from GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: genre update GET');
};

//Handle genre update on POST
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: genre update POST');
};