var express = require('express');
var pool = require('../db');
var router = express.Router();
var project = 'Youtube Response';


router.get('/', (req, res, next) => {
    pool.connect((err, client, done) => {
        if (typeof client == "undefined") {
            res.send("Error connecting to database.");
            return;
        }
        
        var newestMembers, newestVideos;
        var newestUsersQuery = "SELECT username, date FROM yt_user ORDER BY date DESC LIMIT 5";
        var newestVideosQuery = "SELECT id, title, video_id, video_start, video_end, autoplay, author_id FROM yt_video ORDER BY DATE DESC LIMIT 5"
        
        client.query(newestUsersQuery)
            .then(clientRes => {
                if (typeof clientRes != "undefined") {
                    newestMembers = clientRes.rows;
                }
            });
        
        client.query(newestVideosQuery)
            .then(clientRes => {
                if (typeof clientRes != "undefined") {
                    newestVideos = clientRes.rows;
                }
                res.render('index', {
                    title: project,
                    auth: req.session.auth,
                    newMembers: newestMembers,
                    newVideos: newestVideos
                });
            })
            .catch(e => {
                console.log("--------------------------- WHAT THE FUCK: ", e);
            });
            
        //client.release();
        done();
    });
});

module.exports = router;