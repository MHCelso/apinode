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

exports.setUserView = setUserView;