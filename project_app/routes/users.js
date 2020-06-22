var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('CEMK', ['users']);
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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

//register POST
router.post('/register', function(req, res){
	//console.log('adding user');
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	//validation
	req.checkBody('name','Name Field is required').notEmpty();
	req.checkBody('email','email Field is required').notEmpty();
	req.checkBody('username','username Field is required').notEmpty();
	req.checkBody('email','Please Enter a valid mail id').isEmail();
	req.checkBody('password','passowrd Field is required').notEmpty();
	req.checkBody('password2','Password Mismatch').equals(req.body.password);

	//check for errors
	var errors = req.validationErrors();

	if(errors){
		console.log('Form has errors');
		res.render('register', {
			errors: errors,
			name: name,
			email: email,
			username: username,
			password: password,
			password2: password2

		});
	} else {
		console.log('success');
		var newUser = {
			name: name,
			email: email,
			username: username,
			password: password
		}
		db.users.insert(newUser, function(err, doc){
			if (err){
				res.send(err);
			} else {
				console.log('adding user.....')

				//flash msg
				req.flash('success', 'You are registered. Please Log in');

				//redirect after registration
				res.location('/');
				res.redirect('/');
			}
		})
	}

});

module.exports = router;