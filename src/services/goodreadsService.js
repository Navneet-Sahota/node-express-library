const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:goodreadsService');

const parser = xml2js.Parser({ explicitArray: false });
function goodreadsService() {
	function getBookById(id) {
		return new Promise((resolve, reject) => {
			axios
				.get(
					`https://www.goodreads.com/book/show/${id}.xml?key=izv1VhkkGyIEBqWu1QVDoQ`
				)
				.then(response => {
					parser.parseString(response.data, (err, result) => {
						if (err) {
							debug(err);
						} else {
							debug(result);
							resolve(result.GoodreadsResponse.book);
						}
					});
				})
				.catch(error => {
					debug(error);
				});
		});
	}

	return { getBookById };
}

module.exports = goodreadsService();
