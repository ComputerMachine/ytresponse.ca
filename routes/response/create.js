var express = require('express');
var pool = require('../../db');
var router = express.Router();
var project = 'Youtube Response';

/*
var getUserId = function(username) {
    pool.connect(function(err, client, done) {
        var usernameQuery = "SELECT id FROM yt_user WHERE username = $1";
        client.query(usernameQuery, [username], function(clientErr, clientRes) {
            if (clientErr) console.log(clientErr);
            return clientRes.rows[0].id;
        });
    });
};*/

router.get('/', function(req, res, next) {
    res.render('response/create', {
        title: project
    });
});

router.post('/', function(req, res, next) {
    var username = req.session.auth.username;
    var title = req.body.title;
    var videoId = req.body.videoId;
    var start = req.body.start;
    var end = req.body.end;
    var comment = req.body.comment;
    var autoplay = 1;
    var script = req.body.script;
    
    pool.connect(function(err, client, done) {
        if (err) {
            console.log(err);
            return res.status(500);
        }
        var createResponseQuery = 
            "INSERT INTO yt_video(author_id, title, video_id, video_start, video_end, autoplay, script, date)\
            VALUES($1, $2, $3, $4, $5, $6, $7, NOW())";
        var getUserIdQuery = "SELECT id FROM yt_user WHERE username = $1";
        client.query(getUserIdQuery, [username], function(clientErr, clientRes) {
            if (clientErr) {
                console.log(err);
                return res.status(500);
            }
            var userId = clientRes.rows[0].id;
            client.query(createResponseQuery, [userId, title, videoId, start, end, autoplay, script], function(clientErr, clientRes) {
                console.log("she's done");
            });
        });
        done();
    });
    
    
    /*
    pool.connect(function(err, client, done) {
        if (err) {
            console.log(err);
            return;
        }
        
        var createResponseQuery = 
            "INSERT INTO yt_video(author_id, title, video_id, video_start, video_end, autoplay, script, date)\
            VALUES($1, $2, $3, $4, $5, $6, $7, NOW())";

        client.query(createResponseQuery, [userId, title, videoId, start, end, autoplay, script], function(clientErr, clientRes) {
            if (clientErr) {
                console.log(clientErr);
                return;
            }
        });
        done();
    });*/    
    
    res.render('response/create', {
        title: project
    });
});


module.exports = router;