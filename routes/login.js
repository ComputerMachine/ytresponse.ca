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
        
        var sqlQuery = "SELECT username, encode(password::bytea, 'escape') AS pw FROM yt_user WHERE LOWER(username) = $1";
        client.query(sqlQuery, [request.body.username.toLowerCase()], function(clientErr, clientRes) {
            if (err) console.log(err);
            
            if (typeof clientRes.rows[0] == "undefined") {
                return response.send("That username doesn't exist.");
            }

            var hashedPassword = clientRes.rows[0].pw;
            var username = clientRes.rows[0].username;
            
            bcrypt.compare(request.body.password, hashedPassword, function(err, res) {
                if (!res) return response.send("Invalid password or username.");
                
                request.session.auth = {username: username};
                response.redirect("../");
            });
            done();
        });
    });
});


module.exports = router;
