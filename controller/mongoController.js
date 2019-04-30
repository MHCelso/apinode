const mongodb = require('mongodb').MongoClient;
const constants = require('../model/constants');

// Funcion para conectarnos a mongo
function connectDB(){
	return new Promise((resolve, reject) => {
		mongodb.connect(constants.mongoObject.database, {useNewUrlParser: true}, (error, client) => {
			if (error) {
				reject({'mensaje': 'error al acceder a mongodb', 'error': error});
			} else {
				resolve(client);
			}
		});
	});
}

// Insertar un usuario a mongodb
function insertUser(user){
	return new Promise((resolve, reject)=>{
		// Tratamos nuestra conexion
		connectDB()
		.then((client)=>{
			// conectamos a la bd si no existe se crea
			let db = client.db('morpheus');

			// inserta usuario en la coleccion si no existe coleccion se va a crear
			db.collection('user').insertOne(user, (error, resultado) => {
				if (error) {
					reject(error);
				} else {
					resolve(resultado);
				}
				client.close();
			});
		})
		.catch((error)=>{
			reject(error);
		});
	});
}

exports.insertUser = insertUser;