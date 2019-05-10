// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// Timestamp Microservice endpoint. ? makes it so api/timestamp is also a valid endpoint
app.get("/api/timestamp/:date_string?", function(req, res) {
  
  // Return now if no input
  if (!req.params.date_string) return res.json({unix: Date.now(), utc: (new Date()).toUTCString()});
  
  // Store input
  let dateInput = new Date(req.params.date_string);
  
  // Return valid date if date is entered in milliseconds
  if (dateInput.toString() === "Invalid Date") dateInput = isNaN(req.params.date_string) ? dateInput : new Date(parseInt(req.params.date_string, 10));
  
  res.json({unix: dateInput.getTime(), utc: dateInput.toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});