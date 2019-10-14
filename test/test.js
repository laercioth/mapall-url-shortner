'use strict'
var assert = require('assert');
const http = require('http');
let pg = require('pg');

//Setting DB
const config = {
  user: 'laercio', //this is the db user credential
  database: 'url_shortener',
  password: 'laercio',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

//API request test
describe('API request test', function() {
    
    it('should return 200 GET', function(done) {
    	done();
        http.get('https://mapall-test.appspot.com/api/', function(res) {
             assert.equal(200, res.statusCode);
        })
    });

    it('should return error request 400 GET', function(done) {
    	done();
        http.get('https://mapall-test.appspot.com/api/path/doesnt/exist', function(res) {
        	assert.equal(400, res.statusCode);
        })
    });
});

//DB test connection
describe('Postgres connection test', function() {
    it('should return name database Postgres', function(done) {
    	done();
        pool.connect((err, client, done) => {
			assert.equal('url_shortener', pool._clients[0].connectionParameters.database);
	    });
    });
});