var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();
var project = 'Youtube Response';

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query);
    res.render('register', {
        title: project,
    });
});

router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2
    var email = req.body.email;
    
    if (password != password2) {
        res.send("INVALID PASSWORD TURKEY FUKER");
    }
    
    console.log(username, password, email);
    
    bcrypt.hash(password, 12, function(err, hash) {
        var pool = require('../db');
        pool.connect(function(err, client, done) {
            if (err) consol.log("DB ERROR");
            var sqlQuery = "INSERT INTO yt_user(username, password, email) VALUES($1, $2, $3)";
            client.query(sqlQuery, [username, hash, email], function(err, res) {
                if (err) console.log(err);
                console.log(res);
            });
            done();
        });
    })
    
    res.send("yep");
});

module.exports = router;
