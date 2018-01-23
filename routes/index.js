var express = require('express');
var router = express.Router();
var project = 'Youtube Response';

var pool = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
    pool.connect(function(err, client, done) {
        if (err) consol.log("DB ERROR");
        client.query("SELECT NOW()", function(err, res) {
            console.log(res);
        })
    });
    res.render('index', {
        title: project,
    });
});

module.exports = router;

/*
var query = client.query("SELECT NOW()", function(err, res) {
    console.log(res);
});
done();*/