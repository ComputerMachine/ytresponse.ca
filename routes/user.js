var express = require('express');
var pool = require('../db');
var router = express.Router();
var project = 'Youtube Response';

/* GET home page. */
router.get('/:username', function(req, res, next) {
    res.render('user', {
        title: project
    });
});

module.exports = router;