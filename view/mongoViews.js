const controller = require('../controller/mongoController');

// vista que inserta un usuario
function setUserView(user, request, response){
	controller.insertUser(user)
	.then((resultado)=>{
		response.status(200).send({'mensaje': 'se inserto correctmente', 'respuesta': resultado});
	})
	.catch((error)=>{
		response.status(400).send(error);
	});
}

// vista que muestra arreglo de usuarios
function getUsersView(request, response){
	controller.getUsers()
	.then((resultado)=>{
		response.status(200).send(resultado);
	})
	.catch((error)=>{
		response.status(500).send(error);
	});
}

function getUserByNameView(user, request, response){
	controller.getUserByName(user)
	.then((resultado)=>{
		response.status(200).send(resultado);
	})
	.catch((error)=>{
		response.status(404).send(error);
	});
}

function updateUserView(user, values, request, response){
	controller.updateUser(user, values)
	.then((resultado)=>{
		response.status(200).send({mensaje: 'Se actualizo correctamente' , resultado: resultado});	
	})
	.catch((error)=>{
		response.status(500).send(error);
	});
}

function deleteUserView(user, request, response){
	controller.deleteUser(user)
	.then((resultado)=>{
		response.status(200).send({mensaje: 'registro eliminado', resultado: resultado});
	})
	.catch((error)=>{
		response.status(500).send(error);
	});
}

exports.setUserView = setUserView;
exports.getUsersView = getUsersView;
exports.getUserByNameView = getUserByNameView;
exports.updateUserView = updateUserView;
exports.deleteUserView = deleteUserView;