const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const navbar = [
	{ link: '/books/', title: 'Books' },
	{ link: '/authors/', title: 'Authors' },
];
const bookRouter = require('./src/routes/bookRoutes')(navbar);
const adminRouter = require('./src/routes/adminRoutes')(navbar);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
	res.render('index', {
		navbar: [
			{ link: '/books/', title: 'Books' },
			{ link: '/authors/', title: 'Authors' },
		],
		title: 'Library',
	});
});

app.listen(PORT, () => {
	debug(`Listening on port ${chalk.rgb(109, 224, 26).bold(3000)}`);
});
