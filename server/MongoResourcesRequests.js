const view = require('../view/MongoResourcesViews');

module.exports = (app) => {
	app.get('/mongo/resources', (request, response) => {
		view.readFileView(request, response);
	});
}