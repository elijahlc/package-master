const conn = require('./conn');
const User = require('./User');
const Parcel = require('./Parcel');

Parcel.belongsTo(User);
User.hasMany(Parcel);

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

module.exports = { syncAndSeed, User, Parcel };
