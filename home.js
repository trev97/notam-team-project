var express = require('express');
const path = require('path')
var router = express.Router();

function getStartingLocation() { 
   const startingLocationVal = document.querySelector('input').value;
   console.log(startingLocationVal);
}

function getDestinationLocation() { 
   const destinationLocationVal = document.querySelector('input').value;
   console.log(destinationLocationVal);
}



router.get('/', function(req, res){
   res.sendFile(path.join(__dirname, 'public/homePage.html'))
});
router.post('/', function(req, res){
   res.send('POST route on home.');
});

//export this router to use in our index.js
module.exports = router;