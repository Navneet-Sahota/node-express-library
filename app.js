const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 4000;

const config = {
	user: 'library',
	password: 'nodeL1br@ry',
	server: 'node-library.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
	database: 'PSLibrary',

	options: {
		encrypt: true, // Use this if you're on Windows Azure
	},
};
sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const navbar = [
	{ link: '/books/', title: 'Books' },
	{ link: '/authors/', title: 'Authors' },
];
const bookRouter = require('./src/routes/bookRoutes')(navbar);

app.use('/books', bookRouter);

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
