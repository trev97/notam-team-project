var express = require('express');
const path = require('path')
var router = express.Router();
const axios = require("axios");
require('dotenv').config()
const client_id = process.env.client_id
const client_secret = process.env.client_secret


router.get('/', function(req, res){
   res.sendFile(path.join(__dirname, 'public/resultsPage.html'))
});
router.post('/', function(req, res){
   res.send('POST route on results.');
});

const { spawn } = require('child_process');


router.get("/exampleData", function (req, res) {

   let urlParams = new URLSearchParams(req.query);
   const regExpr = /^[A-Z]{3}$/g
   let x
    if(regExpr.test(urlParams.get('location'))){
      x = 'https://external-api.faa.gov/notamapi/v1/notams?domesticLocation=' + urlParams.get('location') + '&pageSize=1000';
    }
    else{
      return res.status(400).json('Incorrect Airport code Format')
    }
   // Make a request
   axios.get(x, {headers: {
     'client_id': client_id,
     'client_secret': client_secret
     } 
   })
     .then(response => {
       // Extract the notam text and pass it to the Python script
       let notamTexts = [];
       response.data.items.forEach(item => {
        let notamText = item.properties.coreNOTAMData.notam.text;
        notamTexts.push(notamText);
       });
       //console.log(notamTexts);

       const pythonScript = spawn('python3', ['notam_cat.py']);
       console.time('Python script execution time');
       pythonScript.on('error',(err) => {
        console.error('Failed to start subprocess.\n'+err);
      }); 
       // Pass the notam texts to the Python script through standard input
       pythonScript.stdin.write(JSON.stringify(notamTexts));
       pythonScript.stdin.end();

       // Receive the predicted categories from the Python script through standard output
       let predictedCategories = '';
       pythonScript.stdout.on('data', (data) => {
         predictedCategories += data.toString();
       });

       pythonScript.on('close', (code) => {
         console.log(`Python script exited with code ${code}`);
         console.timeEnd('Python script execution time');

         // Parse the predicted categories as a JSON array
         let categories = JSON.parse(predictedCategories);
         // Add the predicted categories to the response from the API
         let items = response.data.items.map((item, index) => {
          return {
            ...item,
            category: categories[index][0], // Get the category from the tuple
            criticality: categories[index][1] // Get the criticality score from the tuple
          };
        });

         // Send the combined response back to the client-side DataTable
         res.json({
           "data": items
         })
       });
     })
     .catch(function (error) {
        // handle error
        console.log(error);
        res.json({"error": error});
     })
 }); 

//export this router to use in our index.js
module.exports = router;