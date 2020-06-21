var express = require('express');
var router = express.Router();

//localhost:3000/
router.get('/', function(req, res){
	res.render('index');
});

module.exports = router;