var express = require('express');
var pool = require('../db');
var router = express.Router();
var project = 'Youtube Response';


/* GET home page. */
router.get('/:username', function(req, res, next) {
    pool.connect(function(err, client, done) {
        var userVideosQuery = "SELECT id, title, video_id, video_start, video_end, autoplay, author_id FROM yt_video WHERE author_id = (SELECT id FROM yt_user WHERE username = $1) ORDER BY DATE DESC LIMIT 25";
        var username = req.params.username;
        
        client.query(userVideosQuery, [username], function(clientErr, clientRes) {
            if (clientErr) console.log(clientErr);
            var userVideos = clientRes.rows;
            
            res.render('user', {
                title: project,
                auth: req.session.auth,
                userVideos: userVideos,
            });
        });
    });
});

module.exports = router;