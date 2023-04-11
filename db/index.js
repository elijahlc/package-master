const conn = require('./conn');
const User = require('./User');

const syncAndSeed = async () => {
	await conn.sync({ force: true });

	const eli = await User.create({
		email: 'cohen.elijahlev@gmail.com',
		password: '123',
		firstName: 'Eli',
		lastName: 'Cohen',
	});

	return {
		users: { eli },
	};
};

module.exports = { syncAndSeed, User };
