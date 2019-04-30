const mysql = require('mysql');
const constants = require('../model/constants');

// Obtener valores de una tabla
function obtenerCarriers(){
	// armar promesa
	return new Promise( (resolve, reject) => {
		let connection = mysql.createConnection(constants.mysqlObject);
		// Conectamos
		connection.connect( (error) => {
			if (error) {
				reject({'error': error, 'mensaje': 'sin conexion', 'codigo': 501});
			} else {
				// Arma consulta
				let consulta = 'SELECT * FROM carrier';
				connection.query(consulta, (error, resultado) => {
					if (error) {
						reject({'error': error, 'mensaje': 'no esposible retornar elementos', 'codigo': 501});
					} else {
						resolve(resultado);	
					}
					connection.end();
				});
			}
		});
	});
}

function insertCarrier(carrier){
	// Armamos promesa
	return new Promise( (resolve, reject) => {
		// Obtenemos conexion
		connectDB().then( (connection) => {
			let inserccion = 'INSERT INTO carrier (nombre, activo) VALUES (?, 1) ';
			connection.query(inserccion, [carrier.nombre], (error, resultado) => {
				
				if (error) {
					reject(messageError(error));
				} else {
					resolve(resultado);
				}

			});
		})
		.catch( (error) => {
			reject(error);
		});
	});
}

function connectDB(){
	return new Promise( (resolve, reject) => {
		let connection = mysql.createConnection(constants.mysqlObject);

		connection.connect( (error) => {
			
			if (error) {
				reject({'error': error, 'mensaje': 'sin conexion a la BD', 'codigo': 501});
			} else {
				resolve(connection);
			}

		});
	});
}

function updateCarrier(carrier){
	return new Promise( (resolve, reject) => {
		connectDB()
		.then( (connection)=>{
			let actualizar = 'UPDATE carrier SET nombre = ? WHERE id = ?';
			connection.query(actualizar, [carrier.nombre, carrier.id], (error, resultado) => {
				if (error) {
					reject(messageError(error));
				} else {
					resolve(resultado);
				}
				connection.end();
			});
		})
		.catch( (error) => {
			reject(error);
		});
	});
}

function deleteCarrier(carrier){
	return new Promise((resolve, reject) => {
		connectDB()
		.then((connection)=>{
			let eliminar = 'DELETE FROM carrier WHERE id = ?';
			connection.query(eliminar, [carrier.id], (error, resultado) => {
				if (error) {
					reject(messageError(error));
				} else {
					resolve(resultado);
				}
				connection.end();
			});
		})
		.catch((error) => {
			reject(error);
		});
	});
}

function messageError(){
	return {'error': error, 'mensaje': 'no esposible retornar elementos', 'codigo': 501};
}

exports.obtenerCarriers = obtenerCarriers;
exports.insertCarrier = insertCarrier;
exports.updateCarrier = updateCarrier;
exports.deleteCarrier = deleteCarrier;