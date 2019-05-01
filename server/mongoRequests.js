const view = require('../view/mongoViews');
const ObjectID = require('mongodb').ObjectID;

module.exports = (app) => {
	// Insertar usuariio
	app.post('/mongo/user', (request, response)=>{
		let object = request.body;

		if (object.nombre && object.direccion && object.telefono) {
			view.setUserView({nombre: object.nombre, direccion: object.direccion, telefono: object.telefono}, request, response);
		} else {
			response.status(400).send({'mensaje': 'coloque los elementos necesarios'});
		}
	});

	// conseguir users
	app.get('/mongo/users', (request, response) => {
		view.getUsersView(request, response);
	});



	app.post('/mongo/usersf', (request, response) => {
		let nombre = request.body.nombre;

		if (nombre) {
			view.getUserByNameView({nombre: nombre}, request, response);
		} else {
			response.status(400).send({'mensaje': 'coloque los elementos necesarios'});
		}
		
	});



	

	// Actualiza usuario
	app.put('/mongo/user', (request, response)=>{
		
		let object = request.body;

		if (object.id && object.nombre && object.direccion && object.telefono) {
			
			let user = {_id: ObjectID(object.id)};
			let values = {nombre: object.nombre, direccion: object.direccion, telefono: object.telefono};
			
			view.updateUserView(user, values, request, response);
		} else {
			response.status(400).send({'mensaje': 'coloque los elementos necesarios'});	
		}
	});

	app.delete('/mongo/user', (request, response)=>{
		let id = request.body.id;

		if (id){
			view.deleteUserView({_id: ObjectID(id)}, request, response);
		} else {
			response.status(400).send({mensaje: 'coloque el id del registro a borrar'});
		}

	});
}