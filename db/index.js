const conn = require('./conn');
const User = require('./User');
const Package = require('./Package');
const Carrier = require('./Carrier');

Package.belongsTo(Carrier);
Package.belongsTo(User);
User.hasMany(Package);
Carrier.hasMany(Package);

const syncAndSeed = async () => {
	await conn.sync({ force: true });

	const eli = await User.create({
		email: 'cohen.elijahlev@gmail.com',
		password: '123',
		firstName: 'Eli',
		lastName: 'Cohen',
	});

	const [fedex, ups, usps] = await Promise.all([
		Carrier.create({ name: 'FedEx' }),
		Carrier.create({ name: 'UPS' }),
		Carrier.create({ name: 'USPS' }),
	]);

	return {
		users: { eli },
	};
};

module.exports = { syncAndSeed, User };
