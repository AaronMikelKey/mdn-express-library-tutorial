var BookInstance = require('../models/bookinstance');
var Book = require('../models/book');
const { body,validationResult } = require('express-validator');
const async = require('async');

//display list of bookinstances
exports.bookinstance_list = function(req, res, next) {
    
    BookInstance.find()
    .populate('book')
    .exec(function (err, list_bookinstances) {
        if (err) {return next(err); }
        //Success, then render
        res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
    });
};

//display detail for a specific bookinstance
exports.bookinstance_detail = function(req, res, next) {
    BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
        if (err) { return next(err); }
        if (bookinstance==null) { //No results
            var err = new Error('Book copy not found');
            err.status = 404;
            return next(err);
        }
        //Success, then render
        res.render('bookinstance_detail', { title: 'Copy: ' +bookinstance.book.title, bookinstance: bookinstance });
    });
};

//Display bookinstance create form on GET.
exports.bookinstance_create_get = function(req, res, next) {
    
    Book.find({}, 'title')
    .exec(function (err, books) {
        if (err) { return next(err); }
        //Success, then render
        res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books});
    });
};

//Handle bookinstance create on POST.
exports.bookinstance_create_post = [

    // Validate and sanitise fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified').trim().isLength({ min: 1 }).escape(),
    body('status').escape(),
    body('due_back', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),
    
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a BookInstance object with escaped and trimmed data.
        var bookinstance = new BookInstance(
          { book: req.body.book,
            imprint: req.body.imprint,
            status: req.body.status,
            due_back: req.body.due_back
           });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values and error messages.
            Book.find({},'title')
                .exec(function (err, books) {
                    if (err) { return next(err); }
                    // Successful, so render.
                    res.render('bookinstance_form', { title: 'Create BookInstance', book_list: books, selected_book: bookinstance.book._id , errors: errors.array(), bookinstance: bookinstance });
            });
            return;
        }
        else {
            // Data from form is valid.
            bookinstance.save(function (err) {
                if (err) { return next(err); }
                   // Successful - redirect to new record.
                   res.redirect(bookinstance.url);
                });
        }
    }
];

//Display bookinstance delete form on GET
exports.bookinstance_delete_get = function(req, res, next) {

  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, bookinstance) {
        if (err) { return next(err); }
        if (bookinstance==null) { //No results
            var err = new Error('Book copy not found');
            err.status = 404;
            return next(err);
        }
    // Success.
    res.render('bookinstance_delete', { title: 'Delete Book Instance', book: bookinstance.book.title, bookinstance: bookinstance });

});
};

//Handle bookinstance delete on POST
exports.bookinstance_delete_post = function(req, res, next) {
  
  //Delete object and redirect to the list of bookinstances
  BookInstance.findByIdAndRemove(req.body.bookinstanceid, function deleteInstance(err) {
      if (err) { return next(err); }
      //Success, go to book list
      res.redirect('/catalog/books')
  });
};

//Display bookinstance update from GET.
exports.bookinstance_update_get = function (req, res, next) {

  BookInstance.findById(req.params.id)
    .populate('book')
    .exec(function (err, results) {
      if (err) { return next(err); }
      if (results == null) { // No results.
          var err = new Error('Author not found');
          err.status = 404;
          return next(err);
      }
      // Success.
      res.render('bookinstance_form', { title: 'Update Book Instance', bookTitle: results.book.title, bookinstance: results });

  });
};

//Handle bookinstance update on POST
exports.bookinstance_update_post = 
[

  //Validate and sanitize fields
  body('imprint', 'Imprint must be specified.').trim().isLength({ min: 1 }).escape(),
  body('due_back', 'Invalid Date').optional({ checkFalsy: true }).isISO8601().toDate().escape(),
  body('status', 'Invalid Status').escape(),
  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract the validation errors from a request
    const errors = validationResult(req);

    //Create a BookInstance object with trimmed data and old id
    var bookInstance = new BookInstance(
      {
        imprint: req.body.imprint,
        due_back: req.body.due_back,
        status: req.body.status,
        book: req.body.bookTitle, //Required since title shouldn't change? Maybe not required since ID is provided idk
        _id: req.params.id //This is required or a new ID will be assigned.
      });
    if (!errors.isEmpty()) {
      //There are errors, render for again with sanitized values/error messages

      //Get all book instance form data
      async.parallel({
        bookinstance: function(callback) {
          BookInstance.find(callback);
        },
        book: function(callback) {
          Book.find(callback)
        },
      }, function(err, results) {
        if (err) { return next(err); }

        res.render('bookinstance_form', { title: 'Update Book Instance', bookTitle: results.bookTitle, imprint: results.imprint, due_back: results.due_back, bookinstance: results, errors: errors.array() });
      });
      return;
    }
    else {
      //Data from form is valid, update the record
      BookInstance.findByIdAndUpdate(req.params.id, bookInstance, function (err, newBookInstance) {
        if (err) { return next(err); }
        //Success, redirect to BookInstance detail page
        res.redirect(newBookInstance.url);
      });
    }
  }
];