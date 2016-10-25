// Dependencies
var express = require('express');
var router = express.Router();


// Models
var Product = require('../models/product');
var Publication = require('../models/publication');
var Client = require('../models/client');

//Register  Routes
Product.methods(['get','put','post','delete']);
Product.register(router,'/products');

//Register  Routes for Publication Collection
Publication.methods(['get','put','post','delete']);
Publication.register(router,'/publications');


//Register  Routes for Client Collection
Client.methods(['get','put','post','delete']);
Client.register(router,'/client');

// Return router
module.exports = router;


