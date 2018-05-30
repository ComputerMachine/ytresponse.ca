var express = require('express');
var pool = require('../db');
var router = express.Router();
var project = "Youtube Response";


router.get('/', function(req, res, next) {
    res.render('video', {
        title: project,
        videoData: {
            video_id: "9Koln22mx6c", 
            video_start: 65, 
            video_end:70, 
            autoplay:1
        }
    })
});

router.get('/:serialId', function(req, res, next) {
    var serialId = req.params.serialId;
    var selectVideoQuery = "SELECT video_id, video_start, video_end, autoplay, author_id, \
    (SELECT username FROM yt_user WHERE id = author_id) AS author_username FROM yt_video WHERE id = $1";
    
    pool.connect((err, client, done) => {
        client.query(selectVideoQuery, [serialId])
            .then(clientRes => {
                res.render("video", {
                    title: project,
                    videoData: clientRes.rows[0]
                });
            })
            .catch(e => {
                console.error("aight wtf", e);
            });
        done();
    });
});

module.exports = router;
