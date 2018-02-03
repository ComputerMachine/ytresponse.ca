var express = require('express');
var router = express.Router();
var project = 'Youtube Response';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('response/create', {
        title: project
    });
});

module.exports = router;