const controller = require('../controller/mysqlController');
// Vista que muestra los carriers
function getCarriers(request, response){
	// Resolver promise
	controller.obtenerCarriers().then((resultado) => {
		
		response.status(200).send(resultado);
	
	}).catch( (error) => {
		let elemento = {'mensaje': error.mensaje, 'error': error.error};
		response.status(error.codigo).send(JSON.stringify(elemento));
	});
}

function setCarrier(carrier, request, response){
	// Resolvemos promesa
	controller.insertCarrier(carrier)
	.then( (resultado) => {
		response.status(200).send(resultado);
	})
	.catch( (error) => {
		let elemento = {'mensaje': error.mensaje, 'error': error.error};
		response.status(error.codigo).send(JSON.stringify(elemento)); 
	});
}

function updateCarrier(carrier, request, response){
	controller.updateCarrier(carrier)
	.then( (resultado)=> {
		response.status(200).send(resultado);
	})
	.catch( (error) => {
		let elemento = {'mensaje': error.mensaje, 'error': error.error};
		response.status(error.codigo).send(JSON.stringify(elemento));
	});
}

function deleteCarrier(carrier, request, response){
	controller.deleteCarrier(carrier)
	.then( (resultado) => {
		response.status(200).send(resultado);
	})
	.catch( (error) => {
		let elemento = {'mensaje': error.mensaje, 'error': error.error};
		response.status(error.codigo).send(JSON.stringify(elemento));
	});
}

exports.getCarriers = getCarriers;
exports.setCarrier = setCarrier;
exports.updateCarrier = updateCarrier;
exports.deleteCarrier = deleteCarrier;