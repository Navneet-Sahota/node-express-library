const express = require('express');
const debug = require('debug')('app:bookRoutes');

const sql = require('mssql');

const bookRouter = express.Router();

function router(navbar) {
	bookRouter.route('/').get((req, res) => {
		(async function query() {
			const request = new sql.Request();
			const { recordset } = await request.query('select * from books');
			res.render('bookListView', {
				navbar,
				title: 'Library',
				books: recordset,
			});
		})();
	});

	bookRouter
		.route('/:id')
		.all(req => {
			(async function query() {
				const { id } = req.params;
				const request = new sql.Request();
				const { recordset } = await request
					.input('id', sql.Int, id)
					.query('select * from books where id = @id');
				[req.book] = recordset;
			})();
		})
		.get((req, res) => {
			res.render('bookView', {
				navbar,
				title: 'Library',
				book: req.book,
			});
		});
	return bookRouter;
}

module.exports = router;
