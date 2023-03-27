var express = require('express');
var app = express();
const path = require('path')
app.use(express.static('public'));
//const querystring = require('querystring')
//const http = require('https')
let home = require('./home.js')
let results = require('./results.js')
const fs = require('fs');
const { spawn } = require('child_process');

let init = {
   host : 'external-api.faa.gov',
   path: "/notamapi/v1/notams",
   method: "GET",
   headers: {
      'client_id': '4e25e8c041d142d9b263f03aa74be97e',
      'client_secret': 'B7282F38DC454fBFBFF80774Ec4D1772'
   } 
}

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
    let notams = [];
    for(const notam of s.items){
      text = notam.properties.coreNOTAMData.notamTranslation[0].formattedText;
      if(text != undefined){
        text = text.replaceAll(",", "");
        text = text.replaceAll("\n", "");
        notams.push(text);
      }
    }

    // Spawn a new Python process to classify the NOTAMs
    const pythonScript = spawn('python', ['notam_cat.py']);
    // Pass the array of NOTAMs as a JSON array to the Python script through standard input
    pythonScript.stdin.write(JSON.stringify(notams));
    pythonScript.stdin.end();

    // Capture the output of the Python script and output it to the console
    pythonScript.stdout.on('data', (data) => {
      const categories = JSON.parse(data);
      console.log(categories);
    });

    // Output an error message if the Python script encounters an error
    pythonScript.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });
    
    // Handle the HTTP GET request for the home page
    app.get('/', function(req, res){
      res.sendFile(path.join(__dirname, 'public/landingPage.html'))
    });
  })
} */


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'public/landingPage.html'))
})
app.use('/home', home)

app.use('/results', results)

//const req = http.request(init, callback);
//req.end();

app.listen(3000);