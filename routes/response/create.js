var express = require('express');
var pool = require('../../db');
var router = express.Router();
var project = 'Youtube Response';


router.get('/', function(req, res, next) {
    res.render('response/create', {
        title: project
    });
});

router.post('/', function(req, res, next) {
    var video = {
        author: typeof req.session.auth == "undefined" ? "Guest" : req.session.auth.username,
        title: req.body.title,
        id: req.body.videoId,
        start: req.body.start,
        end: req.body.end,
        comment: req.body.comment,
        autoplay: 1, /* temporarily force videos to autoplay */
        script: req.body.script
    };

    pool.connect((err, client, done) => {
        if (typeof client == "undefined") {
            res.send("Unable to connect to database.");
            return;
        }
 
        var createResponseQuery = 
            "INSERT INTO yt_video(author_id, title, video_id, video_start, video_end, autoplay, script, date) \
            VALUES((SELECT id FROM yt_user WHERE username = $1), $2, $3, $4, $5, $6, $7, NOW())";
        
        client.query(createResponseQuery, [video.author, video.title, video.id, video.start, video.end, video.autoplay, video.script])
            .then(clientRes => {
                console.log("response added");
            })
            .catch(e => {
                console.log("--------------------------- WHAT THE FUCK: ", e);
            });
        done();
    });
  
    res.render('response/create', {
        title: project
    });
});


module.exports = router;