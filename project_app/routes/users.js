var express = require('express');
var router = express.Router();

//localhost:3000/users/login
//login page- GET
router.get('/login', function(req, res){
	res.render('login');
});

//localhost:3000/users/register
//register page- Get 
router.get('/register', function(req, res){
	res.render('register');
});

module.exports = router;