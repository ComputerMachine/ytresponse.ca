var express = require('express');
var bcrypt = require('bcrypt');
var pool = require('../db');
var router = express.Router();
var project = 'Youtube Response';

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.session);
    res.render('login', {
        title: project,
    });
});

router.post('/', function(request, response, next) {
    pool.connect(function(err, client, done) {
        if (err) console.log("DB ERROR");
        
        var sqlQuery = "SELECT encode(password::bytea, 'escape') AS pw FROM yt_user WHERE username = $1";
        client.query(sqlQuery, [request.body.username], function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
            try {
                var hashedpw = res.rows[0].pw;
                bcrypt.compare(request.body.password, hashedpw, function(err, res) {
                    if (res) {
                        request.session.auth = {
                            username: request.body.username, 
                            permission: "admin"
                        };
                        response.redirect('../');
                        //response.send("yep all good");
                    } 
                    else {
                        response.send("NOPE");    
                    }
                });
            } 
            catch(TypeError) {
                response.send("Username not found.");
            }
            done();
        });
    });
});


module.exports = router;
