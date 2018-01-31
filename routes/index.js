var express = require('express');
var router = express.Router();
var project = 'Youtube Response';

var pool = require('../db');

/* GET home page. */
router.get('/', function(request, response, next) {

    if (request.session.auth) {
        console.log(request.session.auth);
    } else {
        console.log("no session");
    }
    
    
    response.render('index', {
        title: project,
    });
});

module.exports = router;

/*
var query = client.query("SELECT NOW()", function(err, res) {
    console.log(res);
});
done();*/