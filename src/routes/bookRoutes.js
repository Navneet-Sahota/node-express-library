const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

function router(navbar) {
	bookRouter.use((req, res, next) => {
		if (req.user) {
			next();
		} else {
			res.redirect('/');
		}
	});
	bookRouter.route('/').get((req, res) => {
		const url = 'mongodb://localhost:27017';
		const dbName = 'libraryApp';

		(async function mongo() {
			let client;
			try {
				client = await MongoClient.connect(url, { useNewUrlParser: true });
				debug('Connected correctly to server');

				const db = client.db(dbName);
				const col = await db.collection('books');
				const books = await col.find().toArray();

				res.render('bookListView', {
					navbar,
					title: 'Library',
					books,
				});
			} catch (err) {
				debug(err.stack);
			}
			client.close();
		})();
	});

	bookRouter.route('/:id').get((req, res) => {
		const { id } = req.params;
		const url = 'mongodb://localhost:27017';
		const dbName = 'libraryApp';

		(async function mongo() {
			let client;
			try {
				client = await MongoClient.connect(url, { useNewUrlParser: true });
				debug('Connected correctly to server');

				const db = client.db(dbName);
				const col = await db.collection('books');
				const book = await col.findOne({ _id: new ObjectID(id) });

				res.render('bookView', {
					navbar,
					title: 'Library',
					book,
				});
			} catch (err) {
				debug(err.stack);
			}
		})();
	});
	return bookRouter;
}

module.exports = router;
