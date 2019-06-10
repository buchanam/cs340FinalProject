const express = require('express')
var http = require('http'); 
var fs = require('fs');
var url = require('url');

const app = express()
const port = 3012

var mysql = require('mysql');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });
  
var con = mysql.createConnection({
	  host: "classmysql.engr.oregonstate.edu",
      user: "cs340_maoa",
      password: "1832",
	  database: "cs340_maoa",
	  multipleStatements: true
});

app.get('/', (request, response) => {
	con.connect(function(err) {
		response.send("HI");
		if (err) throw err;
	  });
})

app.get('/allStores', (request, response) => {
	con.connect(function(err) {
 	con.query("SELECT City, State, Zip FROM Store", function (err, result, fields) {
    if (err) throw err;
    response.json(JSON.stringify(result));
  });
	  });
})

app.get('/stores', (request, response) => {
	var state = request.query.state;
	con.connect(function(err) {
 	con.query("SELECT City, State, Zip FROM Store WHERE State= '" + state + "'" , function (err, result, fields) {
    response.json(JSON.stringify(result));
  });
	  });
})

app.get('/account', (request, response) => {
	var userID = request.query.id;
	con.connect(function(err) {
 	con.query("SELECT name FROM Customer WHERE cus_id= '" + userID + "'; call displayOwnedGames(?)", [userID] , function (err, result, fields) {
	response.json(JSON.stringify(result));
  });
	  });
})

app.get('/browse', (request, response) => {
	con.connect(function(err) {
 	con.query("call displayAllGames()", function (err, result, fields) {
	response.json(JSON.stringify(result));
  });
	  });
})

app.get('/search', (request, response) => {
	var searchTerm = request.query.searchTerm;
	con.connect(function(err) {
 	con.query("SELECT title, publisher, base_price, esrb_rating, user_rating, date_published FROM Game WHERE title = '" + searchTerm + "'" , function (err, result, fields) {
	response.json(JSON.stringify(result));
  });
	  });
})

app.listen(port, (err) => {
	  if (err) {
		      return console.log('something bad happened', err)
	  }

	    console.log(`server is listening on ${port}`)
})

