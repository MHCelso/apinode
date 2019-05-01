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
function readFileResources(){
	let dirFile = './resources/nombres.txt';
	
	return new Promise((resolve, reject)=>{
		fs.readFile(dirFile, 'utf8', (error, resources) => {  
    	
    		if (error){
    			reject({'mensaje': 'ocurrio un error', 'error': error});
    		} else {
    			let users = resources.split("\r\n");
    			

    				for (const i = 0; i<users.len; i++) {
    					console.log(users[i]);
    				}
    			
    			//let obj = Object.assign({}, users);
    			resolve(users);
    		}

		});	
	});	
}

exports.readFileResources = readFileResources;