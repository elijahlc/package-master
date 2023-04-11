const app = require('./app');
const { syncAndSeed } = require('../db');

const init = async () => {
	try {
		await syncAndSeed();
		const port = process.env.PORT || 3000;
		app.listen(port, () => console.log(`app listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
};

init();
