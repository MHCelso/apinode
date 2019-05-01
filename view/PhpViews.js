const controller = require('../controller/PhpController');

// vista procesa la peticion
function requestServerPHPView(pass, request, response){
	controller.getData(pass)
	.then((data)=>{
		response.status(200).send({mensaje: data});
	})
	.catch((error)=>{
		response.status(500).send({error: error});
	});
}

exports.requestServerPHPView = requestServerPHPView;