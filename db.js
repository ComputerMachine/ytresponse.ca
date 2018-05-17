var pg = require('pg');

var config = {
    user: 'ytresponse_user',
    database: 'ytresponse',
    password: 'she sells seashells on the seashore',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
}

module.exports = new pg.Pool(config);
