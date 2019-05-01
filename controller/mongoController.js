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

// Conseguir todos los datos de una coleccion
function getUsers(){
	// Retornamos la promesa
	return new Promise((resolve, reject) => {
		connectDB()
		.then((client) => {
			// creamos la conexion
			let db = client.db('morpheus');
			// Realizamos consulta para elementos de una colleccion
			db.collection('user').find({}).toArray((error, resultado) => {
				
				if (error){
					reject(error);
				} else {
					resolve(resultado);
				}

				client.close();
			});
		})
		.catch((error)=>{
			reject(error);
		})
	});
}

function getUserByName(user){
	// Promesa { nombre: user.nombre }
	return new Promise((resolve, reject) => {
		connectDB()
		.then((client)=>{
			let db = client.db('morpheus');
			// consulta
			db.collection('user').find({nombre: user.nombre}).toArray((error, resultado)=>{
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

function updateUser(user, values){
	// Promesa
	return new Promise((resolve, reject) => {
		connectDB()
		.then((client) => {
			let db = client.db('morpheus');

			db.collection('user').updateOne(user, {$set: values}, (error, resultado) => {
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

function deleteUser(user){
	return new Promise((resolve, reject)=>{
		connectDB()
		.then((client)=>{
		
		let db = client.db('morpheus');

		db.collection('user').deleteOne(user, (error, resultado)=>{
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
exports.getUsers = getUsers;
exports.getUserByName = getUserByName;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;