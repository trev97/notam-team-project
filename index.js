var express = require('express');
var app = express();
const path = require('path')
const querystring = require('querystring')
const http = require('https')
let home = require('./home.js')
let init = {
   host : 'external-api.faa.gov',
   path: "/notamapi/v1/notams",
   method: "GET",
   headers: {
      'client_id': '4e25e8c041d142d9b263f03aa74be97e',
      'client_secret': 'B7282F38DC454fBFBFF80774Ec4D1772'
   } 
}
app.use(express.static('public'));
let searchParams = {
  domesticLocation: 'BHM',
  sortBy: 'notamType'
}

const res_query = querystring.stringify(searchParams)
init.path += '?'+ res_query
console.log(init)
const callback = function(response) {
  
  let result = Buffer.alloc(0);
  response.on('data', function(chunk) {
    result = Buffer.concat([result, chunk]);
  });
  
  response.on('end', function() {
    // result has response body buffer
    s = JSON.parse(result.toString());
    s.items[0].properties.coreNOTAMData.notamTranslation[0].formattedText;
    //console.log(result.toString());
    app.get('/', function(req, res){
      res.sendFile(path.join(__dirname, 'public/landingPage.html'))
      //res.send(s);
   });
  })
}

app.use('/home', home)

const req = http.request(init, callback);
req.end();

app.listen(3000);
