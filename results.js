var express = require('express');
const path = require('path')
var router = express.Router();

router.get('/', function(req, res){
   res.sendFile(path.join(__dirname, 'public/resultsPage.html'))
});
router.post('/', function(req, res){
   res.send('POST route on results.');
});

//export this router to use in our index.js
module.exports = router;