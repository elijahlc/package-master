const express = require('express');
const app = express.Router();

const { isLoggedIn } = require('./middleware');

app.get('/', isLoggedIn, async (req, res, next) => {
	try {
		const user = req.user;

		res.send(await user.getParcels());
	} catch (err) {
		next(err);
	}
});

app.post('/', isLoggedIn, async (req, res, next) => {
	try {
		const user = req.user;
		res.send(await user.addParcel(req.body));
	} catch (err) {
		next(err);
	}
});

module.exports = app;
