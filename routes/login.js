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
        var sqlQuery = "SELECT username, encode(password::bytea, 'escape') AS pw FROM yt_user WHERE LOWER(username) = $1";
        var ytuser = {};
        
        client.query(sqlQuery, [request.body.username.toLowerCase()], function(clientErr, clientRes) {
            if (clientErr) console.log(err);
            
            if (typeof clientRes.rows[0] == "undefined") {
                return response.send("That username doesn't exist.");
            }
            
            ytuser.username = clientRes.rows[0].username;
            ytuser.pw = clientRes.rows[0].pw;

            bcrypt.compare(request.body.password, ytuser.pw, function(err, res) {
                if (!res) return response.send("Invalid password or username.");
                request.session.auth = {username: ytuser.username};
                response.redirect("../");
            });
        });
        
        client.release();
    });
});


module.exports = router;
