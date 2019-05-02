const mongodb = require('mongodb').MongoClient;
const constants = require('../model/constants');
const fs = require('fs');

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

// funcion que lee el archivo de recursos
function readFileResources(nombre){

	let dirFile = './resources/'+nombre+'.txt';
	
	return new Promise((resolve, reject)=>{
		
		fs.readFile(dirFile, 'utf8', (error, resources) => {  
    	
    		if (error){
    			reject({'mensaje': 'ocurrio un error', 'error': error});
    		} else {

    			let users = resources.split("\r\n");
    			let all = [];
    				
    			for (let i = 0; i<users.length; i++) {
    				all.push({nombre: users[i]});
    			}

    			//let obj = Object.assign({}, users);

    			connectDB()
    			.then((client)=>{
    				let db = client.db('morpheus');
    				
    				db.collection('nombres').insertMany(all, (error, resultado) => {
    					
    					if (error) {
    						reject(error);
    					} else {
    						resolve({mensaje: 'se insertaron los registros', resultado: resultado});
    					}

    				});
    			})
    			.catch((error)=>{
    				reject(error);
    			});


    			resolve({mensaje: 'se insertaron los registros'});
    		}

		});

	});	
}

exports.readFileResources = readFileResources;