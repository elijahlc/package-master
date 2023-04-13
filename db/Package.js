const conn = require('./conn');

const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const Package = conn.define('package', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	trackingNumber: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'You must provide the tracking number to track this package.',
			},
		},
	},
	name: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'You must choose a name for this package.',
			},
		},
	},
});

module.exports = Package;
