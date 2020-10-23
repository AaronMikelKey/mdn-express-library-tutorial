const { DateTime } = require('luxon');

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxlength: 100},
        family_name: {type: String, required: true, maxlength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

//Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function() {
    return this.family_name + ', ' + this.first_name;
});

//Virtual for authors lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
      return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

//Virtual for authors URL
AuthorSchema
.virtual('url')
.get(function () {
    return '/catalog/author/' + this._id;
});

//Virtual for date of birth
AuthorSchema
.virtual('date_of_birth_formatted')
.get(function () {
    return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
});

//Virtual for date of death
AuthorSchema
.virtual('date_of_death_formatted')
.get(function () {
    return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);