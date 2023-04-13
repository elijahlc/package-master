const conn = require('./conn');

const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const Carrier = conn.define('carrier', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	name: {
		type: STRING,
		unique: true,
		allowNull: false,
		validate: { notEmpty: true },
	},
});

module.exports = Carrier;
