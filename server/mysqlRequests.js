const view = require('../view/mysqlView');
module.exports = (app) => {
    // Peticion GET para carriers
    app.get('/carriers', (request, response) => {
        view.getCarriers(request, response);
    });

    app.post('/carrier', (request, response) => {
    	// Obtenemos el valor del cuerpo
    	let carrier = request.body;

    	if (carrier.nombre){
    		view.setCarrier({nombre: carrier.nombre}, request, response);	
    	} else {
    		response.status(400).send({'mensaje': 'coloque un nombre a insertar'});
    	}

    });

    app.put('/carrier', (request, response)=>{
    	let id = request.query.id;
    	let object = request.body;

    	if (id && object.nombre) {
    		view.updateCarrier({'id': id, 'nombre': object.nombre}, request, response);
    	} else {
    		response.status(400).send({'mensaje': 'coloque los datos correctos'});
    	}
    });

    app.delete('/carrier', (request, response) => {
    	let id = request.query.id;

    	if (id) {
    		view.deleteCarrier({'id': id}, request, response);
    	} else {
    		response.status(400).send({'mensaje': 'no existe el id'});
    	}
    });

}