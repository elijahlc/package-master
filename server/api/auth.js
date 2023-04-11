const express = require('express');
const app = express.Router();

const { User } = require('../../db');
const { isLoggedIn } = require('./middleware');

app.post('/', async (req, res, next) => {
	try {
		res.send(await User.authenticate(req.body));
	} catch (err) {
		next(err);
	}
});

app.get('/', isLoggedIn, (req, res, next) => {
	try {
		res.send(req.user);
	} catch (err) {
		next(err);
	}
});

app.put('/', isLoggedIn, async (req, res, next) => {
	try {
		const user = req.user;
		await user.update(req.body);
		res.send(user);
	} catch (err) {
		next(err);
	}
});

app.post('/register', async (req, res, next) => {
	try {
		const user = await User.create();
		res.send(user.generateToken());
	} catch (err) {
		next(err);
	}
});

module.exports = app;
