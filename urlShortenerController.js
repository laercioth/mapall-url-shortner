// UrlShortenerController.js
// Import PG
let pg = require('pg');
let randomstring = require("randomstring");

const config = {
  user: 'laercio', //this is the db user credential
  database: 'url_shortener',
  password: 'laercio',
  port: 5432,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

// Handle create UrlShortener actions
exports.new = function (req, res) {

    if(!req.body.full_address){
        return res.status(400).send({error: 'Error', message: 'Please. You must inform the property \'full_address\'', }).end();   
    }
    
    const urlShortener = {
        full_address : req.body.full_address,
        short : req.body.short,
        url: req.body.url
    }

    pool.connect((err, client, done) => {
        if (err) throw err;

        if(!urlShortener.short){
            urlShortener.short = randomstring.generate(6);
        }
        urlShortener.url = 'https://mapall-test.appspot.com/api/';
        const query = 'INSERT INTO url(full_address,short, url, created_in) VALUES($1,$2,$3, $4) RETURNING *';
        const values = [urlShortener.full_address, urlShortener.short, urlShortener.url+urlShortener.short, new Date()];
        
        client.query(query, values, (error, result) => {
          done();
          if (error) {
            console.error(error);
            return res.status(400).json({error: 'Error', message: 'Something went wrong while try to save!', }).end();
          }
          return res.status(201).send({url: result.rows[0].url}).end();
        });
    });
};


// Handle view UrlShortener info
exports.view = function (req, res) {
    const param = req.params.url;
    console.log(pool);
    pool.connect((err, client, done) => {
        
        
        const query = 'SELECT * FROM url WHERE short = $1;';
        const values = [param];
        pool.client.query(query, values, (error, result) => {
          done();
          
          if (error) {
            console.error(error);
            return res.status(400).json({error: 'Error', message: 'Something went wrong while try to save!', }).end();
          }
          
          if(!result.rows[0]){
            return res.status(200).json({message: 'No register was found.', }).end();
          }
          return res.status(200).send({url: result.rows[0].full_address }).end();
        });
    });
};

