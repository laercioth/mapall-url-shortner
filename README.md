# mapall-url-shortner

This application is example how to consume and create resource via http.
For save the information on database you must have execute this script on your database:

`create table url( id serial not null constraint url_pk primary key,full_address varchar(100),short varchar(100),url varchar(100),created_in timestamp not null);`


The `api` uri preceed all API endpoints and the following endpoints are currently available
* GET `/api/urlShortener`
* POST `/api/contacts`

Make sure the you have nodejs installed. 
Check it run this command:
`node -v`

Download and install all depencies:
`npm install`

To start the application run in root folder:
`node app.js`

To run the test case you need to go to `/test` folder and execute:
`mocha`

Enjoy!