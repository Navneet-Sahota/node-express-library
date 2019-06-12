const express = require('express');

const bookRouter = express.Router();

function router(navbar) {
	const books = [
		{
			title: 'occaecat',
			read: true,
			author: 'Helen Carrillo',
			genre: 'proident',
		},
		{
			title: 'fugiat',
			read: false,
			author: 'Scott Carpenter',
			genre: 'reprehenderit',
		},
		{
			title: 'pariatur',
			read: true,
			author: 'Lenora Mclean',
			genre: 'sunt',
		},
		{
			title: 'occaecat',
			read: true,
			author: 'Jolene Cortez',
			genre: 'enim',
		},
		{
			title: 'nostrud',
			read: false,
			author: 'Pruitt Paul',
			genre: 'non',
		},
		{
			title: 'veniam',
			read: true,
			author: 'Reed Keith',
			genre: 'laborum',
		},
		{
			title: 'nostrud',
			read: true,
			author: 'Lamb Cain',
			genre: 'culpa',
		},
		{
			title: 'irure',
			read: false,
			author: 'Goodman Parks',
			genre: 'elit',
		},
	];

	bookRouter.route('/').get((req, res) => {
		res.render('bookListView', {
			navbar,
			title: 'Library',
			books,
		});
	});
	bookRouter.route('/:id').get((req, res) => {
		const { id } = req.params;
		res.render('bookView', {
			navbar,
			title: 'Library',
			book: books[id],
		});
	});
	return bookRouter;
}

module.exports = router;
