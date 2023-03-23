var express = require('express');
const path = require('path')
var router = express.Router();
const axios = require("axios");

router.get('/', function(req, res){
   res.sendFile(path.join(__dirname, 'public/resultsPage.html'))
});
router.post('/', function(req, res){
   res.send('POST route on results.');
});

router.get("/exampleData", function (req, res) {

   let urlParams = new URLSearchParams(req.query);
 
   let x = 'https://external-api.faa.gov/notamapi/v1/notams?domesticLocation=' + urlParams.get('location') + '&sortBy=notamType';
   
   // Make a request
   axios.get(x, {headers: {
     'client_id': '4e25e8c041d142d9b263f03aa74be97e',
     'client_secret': 'B7282F38DC454fBFBFF80774Ec4D1772'
     } 
   })
     .then(response => {
       // send the collected data back to the client-side DataTable
       //console.log(response);
       res.json({
         "data": response.data.items
       })
     })
     .catch(function (error) {
        // handle error
        console.log(error);
        res.json({"error": error});
     })
 }); 

//export this router to use in our index.js
module.exports = router;