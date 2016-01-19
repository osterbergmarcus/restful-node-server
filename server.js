// call modules
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express(); //Define our app using express
var router     = express.Router();  // Call instance of the express Router

// connect to database providing <user> <password> and <database_url>
var mongoose   = require('mongoose');
mongoose.connect('mongodb://Your_mongoDB_Url');
var Quotes     = require('./models/test'); //define test to call for database schema

// conf app to use bodyParser() for JSON parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// conf port for our host
var port = process.env.PORT || 8080;

//Create a middleware with logging
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next(); // Go to the next routes
});

// Created a end point for routing /test
// -------------------------------------
router.route('/test')

// handle post requst
.post(function(req, res) {
  var thisQuote = new Quotes();		// create a new instance of Objects
  thisQuote.quote = req.body.quote;  // set the quote value that comes from request

  thisQuote.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'New instance created' });
  });
})

// handle get request for all test objects
.get(function(req, res) {
  Quotes.find(function(err, thisQuote) {
    if (err)
      res.send(err);
    res.json(thisQuote);
  });
});

// Routes that end in /test/:test_id
// ---------------------------------
router.route('/test/:Quotes_id')

// handle get request with specefic id
.get(function(req, res) {
  Quotes.findById(req.params.Quotes_id, function(err, thisQuote) {
    if (err)
      res.send(err);
    res.json(thisQuote);
  });
})

// update the object with this id
.put(function(req, res) {
  //find object by id
  Quotes.findById(req.params.Quotes_id, function(err, object) {
    if (err)
      res.send(err);
    object.quote = req.body.quote;

    object.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Quote updated!' });
    });
  });
})

//handle delete requests to delete object
.delete(function(req, res) {
  Quotes.remove({
    _id: req.params.Quotes_id
  }, function(err){
     if (err)
        res.send(err);
      res.json({ message: req.params.Quotes_id + ' has been deleted'});
  });
});

// all routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// ----------------
app.listen(port);
console.log('Magic happens on port ' + port);
