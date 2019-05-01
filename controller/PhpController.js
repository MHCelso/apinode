const http = require('http');
const querystring = require('querystring');
const constants = require('../model/constants');

// hace peticion al server php
function getData(pass){
	
	// Promesa
	return new Promise((resolve, reject)=>{
		
		// Objeto a enviar por POST
		const datos = querystring.stringify({'pass': pass});
		
		// Obtenemos datos para peticion y agregamos la memoria que se requiere
		let params = constants.phpObject;
		params.headers['Content-Length'] = Buffer.byteLength(datos);
		
		// Armamos peticion
		let peticion = http.request(params, (response)=>{
			
			console.log('STATUS: ' + response.statusCode);
			
			// convertimos informacion de la respuesta a utf8
			response.setEncoding('utf8');
			
			// obtenemos resuesta de la peticion
			response.on('data', (info) => {
				resolve(info);
			});

		});

		// error al intentar la conexion al server
		peticion.on('error', (error)=>{
			reject({mensaje: 'error de peticion', error: error});
		});

		//mandamos la peticion
		peticion.write(datos);
		peticion.end();

	});
	
}

exports.getData = getData;