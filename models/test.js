var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var dbSchema   = new Schema({
    quote: String
});

module.exports = mongoose.model('Quotes', dbSchema);
