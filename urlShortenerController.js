// UrlShortenerController.js
// Import PG
let pg = require('pg');
let randomstring = require("randomstring");


const connectionName = process.env.INSTANCE_CONNECTION_NAME || 'laercio';
const dbUser = process.env.SQL_USER || 'postgres';
const dbPassword = process.env.SQL_PASSWORD || 'laercio';
const dbName = process.env.SQL_NAME || 'url_shortener';

const pgConfig = {
  max: 1,
  user: dbUser,
  password: dbPassword,
  database: dbName,
};

if (process.env.NODE_ENV === 'production') {
  pgConfig.host = `/cloudsql/${connectionName}`;
}

// Connection pools reuse connections between invocations,
// and handle dropped or expired connections automatically.
let pgPool;

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
        
    if(!urlShortener.short){
        urlShortener.short = randomstring.generate(6);
    }
    urlShortener.url = 'https://mapall-test.appspot.com/api/';
    const query = 'INSERT INTO url(full_address,short, url, created_in) VALUES($1,$2,$3, $4) RETURNING *';
    const values = [urlShortener.full_address, urlShortener.short, urlShortener.url+urlShortener.short, new Date()];
    
    pgPool.query(query, values, (error, result) => {
        
        if (error) {
            console.error(error);
            return res.status(500).json({error: 'Error', message: 'Something went wrong while try to save!', }).end();
        }
        return res.status(201).send({url: result.rows[0].url}).end();
    });
};



// Handle view UrlShortener info
exports.view = function (req, res) {
    const param = req.params.url;
    // Initialize the pool lazily, in case SQL access isn't needed for this
    // GCF instance. Doing so minimizes the number of active SQL connections,
    // which helps keep your GCF instances under SQL connection limits.
    if (!pgPool) {
        pgPool = new pg.Pool(pgConfig);
    }
    const query = 'SELECT * FROM url WHERE short = $1;';
    const values = [param];

    pgPool.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error: 'Error', message: 'Something went wrong while try to save!', }).end();
        } 
          
        if(!result.rows[0]){
            return res.status(200).json({message: 'No register was found.', }).end();
        }
        return res.status(200).send({url: result.rows[0].full_address }).end();
    });
};

