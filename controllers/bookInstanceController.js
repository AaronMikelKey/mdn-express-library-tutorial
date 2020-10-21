var Bookinstance = require('../models/bookinstance');

//display list of bookinstances
exports.bookinstance_list = function(req, res) {
    res.send('NOT IMPLEMENTED: bookinstance list');
};

//display detail for a specific bookinstance
exports.bookinstance_detail = function(req, res) {
    res.send('NOT IMPLEMENTED: bookinstance detail: ' + req.params.id);
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