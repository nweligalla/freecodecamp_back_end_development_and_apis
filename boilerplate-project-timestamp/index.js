// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });


app.get("/api/:date?", function (req, res) {


  let date;
  
  // check if date is empty
  if(!req.params.date){
    date = new Date()
    setRespondDate(date,res)
  }
  // check if time is number
  else if (/^\d+$/.test(req.params.date)) {
    date = new Date(+req.params.date)
    setRespondDate(date,res)
  }
  // check if time is date pattern
  else if(/^\d{4}-\d{2}-\d{2}$/.test(req.params.date)) {
    date = new Date(req.params.date)
    setRespondDate(date,res)
  }
  // check if date()
  else if(/\b\d{2}\s\w+\s\d{4},\sGMT\b/.test(req.params.date)){
    date = new Date(req.params.date)
    setRespondDate(date,res)
  }else{
    res.json({error : "Invalid Date" });
  }

  
});

function setRespondDate(date,res){
  const utcString = date.toUTCString();
  const unixTimestamp =date.getTime() / 1000;
  res.json({ unix: unixTimestamp, utc: utcString });
}


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
