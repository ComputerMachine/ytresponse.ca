var express = require('express');
var pool = require('../db');
var router = express.Router();
var project = "Youtube Response";


router.get('/', function(req, res, next) {
    res.render('video', {
        title: project,
        playerData: {video_id: "9Koln22mx6c", start: 65, end:70, autoplay:1}
    })
});

router.get('/:serialId', function(req, res, next) {
    var serialId = req.params.serialId;
    console.log("serial id: ", serialId);
    
    pool.connect(function(err, client, done) {
        var videoQuery = "SELECT video_id, video_start, video_end, autoplay, author_id FROM yt_video WHERE id = $1";
        client.query(videoQuery, [serialId], function(clientErr, clientRes) {
            if (clientErr) console.log(clientErr);
            
            console.log(clientRes);
            
            res.render('video', {
                title: project,
                playerData: clientRes.rows[0]
            });
            
            
        });
    });

});

module.exports = router;
