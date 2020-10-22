var Book = require('../models/book');
var async = require('async');
var Genre = require('../models/genre');

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
exports.genre_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: genre create GET');
};

//Handle genre create on POST.
exports.genre_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: genre create POST');
};

//Display genre delete form on GET
exports.genre_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: genre delete GET');
};

//Handle genre delete on POST
exports.genre_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: genre delete POST');
};

//Display genre update from GET.
exports.genre_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: genre update GET');
};

//Handle genre update on POST
exports.genre_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: genre update POST');
};