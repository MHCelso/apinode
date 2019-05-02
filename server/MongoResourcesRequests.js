const view = require('../view/MongoResourcesViews');

module.exports = (app) => {
	app.get('/mongo/resources', (request, response) => {
		let nombre = request.query.nombre;
		if (nombre) {
			view.readFileView(nombre, request, response);
		} else {
			response.status(400).send({mensaje: 'peticion incorrecta, necesita un nombre'});
		}
	});
}