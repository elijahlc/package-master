const { User } = require('../../db');

const isLoggedIn = async (req, res, next) => {
	try {
		const user = await User.findByToken(req.headers.authorization);
		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { isLoggedIn };
