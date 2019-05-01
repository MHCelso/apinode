const controller = require('../controller/MongoResourcesController');

function readFileView(request, response){
	controller.readFileResources()
	.then((resultado)=>{
		response.status(200).send(resultado);
	})
	.catch((error)=>{
		response.status(500).send(error);
	});
}

exports.readFileView = readFileView;