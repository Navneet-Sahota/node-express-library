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

app.get('/', (req, res) => {
	res.render('index', { list: ['a', 'b'], title: 'Library' });
});

app.listen(PORT, () => {
	debug(`Listening on port ${chalk.rgb(109, 224, 26).bold(3000)}`);
});
