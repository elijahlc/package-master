const conn = require('./conn');
const User = require('./User');
const Parcel = require('./Parcel');
const Carrier = require('./Carrier');

Parcel.belongsTo(Carrier);
Parcel.belongsTo(User);
User.hasMany(Parcel);
Carrier.hasMany(Parcel);

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
		carriers: { fedex, ups, usps },
	};
};

module.exports = { syncAndSeed, User };
