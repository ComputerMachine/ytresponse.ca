var pg = require('pg');

var config = {
    user: 'ytresponse_user',
    database: 'ytresponse',
    password: 'shesellsseashellsontheseashore',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

module.exports = new pg.Pool(config);

/*module.exports = {
    query: function(text, values, cb) {
        var pool = new pg.Pool(config);
        pool.connect(function(err, client, done) {
            client.query(text, values, function(err, result) {
                done();
                cb(err, result);
            }) 
        });
    }
};*/