const { expect } = require('chai');
const { syncAndSeed, User } = require('../db');

const jwt = require('jsonwebtoken');
const app = require('supertest')(require('../server/app'));

// to run locally, create a .env file in root director and add local JWT variable
if (process.env.mode === 'dev') require('dotenv').config();

describe('The login process', () => {
	let seed;

	beforeEach(async () => {
		seed = await syncAndSeed();
	});

	describe('Database config', () => {
		describe('Password storage', () => {
			it('Password is hashed', () => {
				expect(seed.users.eli.password).not.to.equal('123');
			});

			it("Doesn't get rehashed when a user updates", async () => {
				const { eli } = seed.users;
				const password = eli.password;
				eli.email = 'ecohen3@wellesley.edu';
				await eli.save();

				expect(password).to.equal(eli.password);
			});
		});

		describe('With correct credentials', () => {
			it('Returns a JWT token', async () => {
				const token = await User.authenticate({ email: 'cohen.elijahlev@gmail.com', password: '123' });
				const { id } = jwt.verify(token, process.env.JWT);

				expect(seed.users.eli.id).to.equal(id);
			});
		});

		describe('Token exchange', () => {
			describe('A valid token', () => {
				it('Can be exchanged for the user', async () => {
					const token = jwt.sign({ id: seed.users.eli.id }, process.env.JWT);
					const eli = await User.findByToken(token);
					expect(eli.email).to.equal('cohen.elijahlev@gmail.com');
				});

				describe('If no matching user', () => {
					it('Will throw an error', async () => {
						const token = jwt.sign({ id: seed.users.eli.id }, process.env.JWT);
						await seed.users.eli.destroy();

						try {
							await User.findByToken(token);
							throw "Don't get here!";
						} catch (err) {
							expect(err.status).to.equal(401);
						}
					});
				});
			});

			describe('An invalid token', () => {
				it('Cannot be exchanged for the user', async () => {
					const token = jwt.sign({ id: seed.users.eli.id }, `${process.env.JWT}!`);

					try {
						await User.findByToken(token);
						throw "Don't get here!";
					} catch (err) {
						expect(err.status).to.equal(401);
					}
				});
			});
		});
	});

	describe('API routes', () => {
		describe('POST /api/auth', () => {
			describe('Valid credentials', () => {
				it('Returns a token', async () => {
					const response = await app.post('/api/auth').send({ email: 'cohen.eljiahlev@gmail.com', password: '123' });
					expect(response.status).to.equal(200);
				});
			});
		});

		describe('GET /api/auth', () => {
			describe('Valid token', () => {
				it('Returns the user', async () => {
					const token = jwt.sign({ id: seed.users.eli.id }, process.env.JWT);
					const response = await app.get('/api/auth').set('authorization', token);
					expect(response.status).to.equal(200);
					expect(response.body.email).to.equal('cohen.elijahlev@gmail.com');
				});
			});
		});
	});
});
