//Setting configuration to db connection
const config = {
  user: 'laercio', //this is the db user credential
  database: 'url_shortener',
  password: 'laercio',
  port: 5432,
  max: 50, // max number of clients in the pool
  idleTimeoutMillis: 30000,
};