const conn = require('./conn');

const { STRING } = conn.Sequelize;

const Parcel = conn.define('parcel', {
	id: {
		type: STRING,
		primaryKey: true,
	},
	trackingNumber: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'You must provide the tracking number to track this parcel.',
			},
		},
	},
	name: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'You must choose a name for this parcel.',
			},
		},
	},
});

module.exports = Parcel;
