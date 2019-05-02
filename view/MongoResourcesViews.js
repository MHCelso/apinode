const controller = require('../controller/MongoResourcesController');

function readFileView(nombre, request, response){
	controller.readFileResources(nombre)
	.then((resultado)=>{
		response.status(200).send(resultado);
	})
	.catch((error)=>{
		response.status(500).send(error);
	});
}

exports.readFileView = readFileView;