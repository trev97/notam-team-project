var express = require('express');
var app = express();
const http = require('https')
const init = {
   host : 'external-api.faa.gov',
   path: "/notamapi/v1/notams",
   method: "GET",
   headers: {
      'client_id': '4e25e8c041d142d9b263f03aa74be97e',
      'client_secret': 'B7282F38DC454fBFBFF80774Ec4D1772'
   }
}

const callback = function(response) {
  
  let result = Buffer.alloc(0);
  response.on('data', function(chunk) {
    result = Buffer.concat([result, chunk]);
  });
  
  response.on('end', function() {
    // result has response body buffer
    s = JSON.parse(result.toString());
    console.log(result.toString());
    app.get('/', function(req, res){
      res.send(s);
   });
  })
}

const req = http.request(init, callback);
req.end();

app.listen(3000);
