var express = require('express');
var pool = require('../db');
var router = express.Router();
var project = 'Youtube Response';

/* GET home page. */
router.get('/', function(req, res, next) {
    pool.connect(function(err, client, done) {
        var newestUsersQuery = "SELECT username, date FROM yt_user ORDER BY date DESC LIMIT 5";
        var newestVideosQuery = "SELECT id, title, video_id, video_start, video_end, autoplay, author_id FROM yt_video ORDER BY DATE DESC LIMIT 5"
        
        client.query(newestUsersQuery, function(clientErr, clientRes) {
            if (clientErr) console.log(clientErr);
            
            var newestMembers = clientRes.rows;
            client.query(newestVideosQuery, function(clientErr, clientRes) {
                var newestVideos = clientRes.rows;
                
                res.render('index', {
                    title: project,
                    auth: req.session.auth,
                    newMembers: newestMembers,
                    newVideos: newestVideos
                });
                
            });
        });
    });
    
/*    res.render('index', {
        title: project,
        auth: req.session.auth,
        newMembers: req.newMembers
    });*/
});

module.exports = router;

/*
var query = client.query("SELECT NOW()", function(err, res) {
    console.log(res);
});
var sqlQuery = "SELECT encode(password::bytea, 'escape') AS pw FROM yt_user WHERE username = $1";
        client.query(sqlQuery, [request.body.username], function(err, res) {
            if (err) {
                console.log(err);
                return;
            }
done();*/