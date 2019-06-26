const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();

function router(navbar) {
	const { getIndex, getById, middleware } = bookController(navbar);
	bookRouter.use(middleware);
	bookRouter.route('/').get(getIndex);
	bookRouter.route('/:id').get(getById);
	return bookRouter;
}

module.exports = router;
