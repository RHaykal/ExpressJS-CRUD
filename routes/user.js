const express = require('express');
const router = express.Router();
const User = require('../models/User')
const bodyParser = require('body-parser');
require('../app')

//router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/', async (req, res) => {
	try {
		const user = await User.find();
		res.json(user);
	} catch (error) {
		res.json({
			message: "error"
		});
	}
})

router.post('/', (req, res) => {
	const userdata = new User({
		name: req.body.name,
		email: req.body.email,
		city: req.body.city,
		phone: req.body.phone
	});
	const save = userdata.save();
	if (save) {
		res.redirect('/');
		console.log("New User Saved!")
	}
})

var userID = ""
//get user by MongoID
router.get('/:userId', async (req, res) => {
	try {
		User.findById(req.params.userId, function (err, searchedId) {
			res.render('update', {
				wantedUser: searchedId
			})
		});
		userID = req.params.userId;
	} catch (error) {
		res.json({
			message: "error"
		});
	}
})

router.put('/:userId', (req, res) => {
	// console.log(userID)
	User.findOneAndUpdate({
		_id: userID
	}, {
		$set: {
			name: req.body.name,
			email: req.body.email,
			city: req.body.city,
			phone: req.body.phone
		}
	}, {
		upsert: true
	}).then(result => {
		console.log(result)
		res.redirect(303, '../');
	}).catch(error => console.error(error))
})

router.delete('/:userId', (req, res) => {
	// console.log(req.body.id)
	User.deleteOne({
			_id: req.body.id
		})
		.then(result => {
			res.redirect('back')
		})
})

module.exports = router;