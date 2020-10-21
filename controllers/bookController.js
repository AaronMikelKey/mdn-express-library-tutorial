var Book = require('../models/book');

exports.index = function(req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

//display list of books
exports.book_list = function(req, res) {
    res.send('NOT IMPLEMENTED: book list');
};

//display detail for a specific book
exports.book_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: book detail: ' + req.params.id);
};

//Display book create form on GET.
exports.book_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: book create GET');
};

//Handle book create on POST.
exports.book_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: book create POST');
};

//Display book delete form on GET
exports.book_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: book delete GET');
};

//Handle book delete on POST
exports.book_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: book delete POST');
};

//Display book update from GET.
exports.book_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: book update GET');
};

//Handle book update on POST
exports.book_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: book update POST');
};