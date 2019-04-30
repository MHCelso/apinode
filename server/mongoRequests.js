const view = require('../view/mongoViews');

module.exports = (app) => {
	// Insertar usuariio
	app.post('/mongo/user', (request, response)=>{
		let object = request.body;

		if (object.nombre && object.direccion && object.telefono) {
			view.setUserView({nombre: object.nombre, direccion: object.direccion, telefono: object.telefono}, request, response);
		} else {
			response.status(400).send({'mensaje': 'coloque los elementos necesarios'});
		}
	})
}