const conn = require('./conn');
const axios = require('axios');

const { STRING, UUID, UUIDV4 } = conn.Sequelize;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// to run locally, create a .env file in root director and add local JWT variable
if (process.env.mode === 'dev') require('dotenv').config();

const JWT = process.env.JWT;

const User = conn.define('user', {
	id: {
		type: UUID,
		primaryKey: true,
		defaultValue: UUIDV4,
	},
	email: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'All users must have an email address on file.',
			},
			isEmail: {
				msg: 'Entered email is not a valid email address.',
			},
		},
		unique: true,
	},
	password: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter a password.',
			},
		},
	},
	firstName: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter your first name',
			},
		},
	},
	lastName: {
		type: STRING,
		allowNull: false,
		validate: {
			notEmpty: {
				msg: 'Please enter your last name',
			},
		},
	},
});

User.addHook('beforeSave', async (user) => {
	if (user.changed('password')) {
		user.password = await bcrypt.hash(user.password, 5);
	}
});

User.findByToken = async function (token) {
	try {
		const { id } = jwt.verify(token, JWT);
		const user = await this.findByPk(id);

		if (user) {
			return user;
		}

		throw 'User not found';
	} catch (err) {
		const error = new Error('Bad credentials');
		error.status = 401;
		throw error;
	}
};

User.prototype.generateToken = function () {
	return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ email, password }) {
	const user = await this.findOne({ where: { email } });

	if (user && (await bcrypt.compare(password, user.password))) {
		return jwt.sign({ id: user.id }, JWT);
	}

	const error = new Error('Bad credentials');
	error.status = 401;
	throw error;
};

User.prototype.getParcels = async function () {
	const parcels = await conn.models.parcel.findAll({
		where: {
			userId: this.id,
		},
	});

	if (!parcels) {
		return [];
	}

	return parcels;
};

User.prototype.addParcel = async function ({ name, trackingNumber }) {
	try {
		const response = await axios.post(
			'https://api.ship24.com/public/v1/trackers',
			{ trackingNumber },
			{
				headers: {
					Authorization: `Bearer ${process.env.API_KEY}`,
					'Content-Type': 'application/json; charset=utf-8',
				},
			}
		);

		await conn.models.parcel.create({
			id: response.data.tracker.trackerId,
			trackingNumber,
			name,
		});
	} catch (err) {
		const error = new Error('Tracking number not found');
		error.status = 400;
		throw error;
	}
};

module.exports = User;
