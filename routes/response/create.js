var express = require('express');
var router = express.Router();
var project = 'Youtube Response';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('response/create', {
        title: project
    });
});

/* GET home page. */
router.post('/', function(req, res, next) {
    var title = req.body.title;
    var videoId = req.body.videoId;
    var start = req.body.start;
    var end = req.body.end;
    var comment = req.body.comment;
    var script = req.body.script;
    
    pool.connect(function(err, client, done) {
        if (err) {
            console.log(err);
            return;
        }
        
        var createResponseQuery = 
            "INSERT INTO yt_video(title, video_id, video_start, video_end, autoplay, script, date)\
            VALUES($1, $2, $3, $4, $5, $6, NOW())";

        client.query(checkUserQuery, [title, videoId, start, end, autoplay, script], function(clientErr, clientRes) {
            if (clientErr) {
                console.log(clientErr);
                return;
            }
            var usernameExists = clientRes.rows[0] ? true : false;
            
            if (usernameExists) {
                res.send("Username already exists. Please choose a different one.");
                return;
            }
            else {
                bcrypt.hash(password, 12, function(hashErr, hash) {
                    client.query(createUserQuery, [username, hash, email], function(clientErr, clientRes) {
                        if (clientErr) {
                            console.log(clientErr);
                            return;
                        }
                        console.log(clientRes);
                        console.log(username, password);
                        console.log("User added to database.");
                        res.redirect("/login");
                    });
                });
            };
        });
        done();
    });
    
    
    res.render('response/create', {
        title: project
    });
});


module.exports = router;