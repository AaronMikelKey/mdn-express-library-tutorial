var BookInstance = require('../models/bookinstance');

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
exports.bookinstance_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: bookinstance create GET');
};

//Handle bookinstance create on POST.
exports.bookinstance_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: bookinstance create POST');
};

//Display bookinstance delete form on GET
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: bookinstance delete GET');
};

//Handle bookinstance delete on POST
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: bookinstance delete POST');
};

//Display bookinstance update from GET.
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: bookinstance update GET');
};

//Handle bookinstance update on POST
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: bookinstance update POST');
};