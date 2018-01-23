var express = require('express');
var router = express.Router();
var project = "Youtube Response";


router.get('/', function(req, res, next) {
    res.render('video', {
        title: project,
        videoId: "9Koln22mx6c"
    })
});

router.get('/:videoId', function(req, res, next) {
    console.log("video id: ", req.params.videoId);
    res.render('video', {
        title: project,
        videoId: req.params.videoId || 'HKK4KmDlj8U'
    });
});

module.exports = router;
