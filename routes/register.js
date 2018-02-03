var express = require('express');
var bcrypt = require('bcrypt');
var pool = require('../db');
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
        res.send("The passwords you entered did not match.");
    }
    
    pool.connect(function(err, client, done) {
        if (err) {
            console.log(err);
            return;
        }
        
        var checkUserQuery = "SELECT username AS exists FROM yt_user WHERE username = $1";
        var createUserQuery = "INSERT INTO yt_user(username, password, email, date) VALUES($1, $2, $3, NOW())";

        client.query(checkUserQuery, [username], function(clientErr, clientRes) {
            if (clientErr) {
                console.log(clientErr);
                return;
            }
            var usernameExists = clientRes.rows[0] ? true : false;
            
            if (usernameExists) {
                res.send("Username already exists. Please choose a different one.");
                return;
            }
            else {
                bcrypt.hash(password, 12, function(hashErr, hash) {
                    client.query(createUserQuery, [username, hash, email], function(clientErr, clientRes) {
                        if (clientErr) {
                            console.log(clientErr);
                            return;
                        }
                        console.log(clientRes);
                        console.log(username, password);
                        console.log("User added to database.");
                        res.redirect("/login");
                    });
                });
            };
        });
        done();
    });
    
    
    /*
    console.log(username, password, email);
    
    bcrypt.hash(password, 12, function(err, hash) {
        pool.connect(function(err, client, done) {
            if (err) {
                console.log("DB ERROR");
                return;
            }
            var sqlQuery = "INSERT INTO yt_user(username, password, email, date) VALUES($1, $2, $3, NOW())";
            client.query(sqlQuery, [username, hash, email], function(clientErr, clientRes) {
                if (clientErr) console.log(clientErr);
                console.log(clientRes);
            });
            done();
        });
    })
    */
    //res.send("yep");
});

module.exports = router;
