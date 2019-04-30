# API Con NodeJS

## 1. Agrega una nueva carpeta llamada "model" -> model/ a la raiz del proyecto.
## 2. Dentro de esa carpeta agrega el archivo "constants.js" -> model/constants.js
## 3. Dentro del archivo "constants.js" escribe:
	
	const mysqlObject = {
		host: 'localhost',
		user: 'root',
		password: '******',
		database: 'mydatabase',
		port: 3306
	};

	const mongoObject = {
		database: 'mongodb://localhost:27017/'
	}

	exports.mysqlObject = mysqlObject;
	exports.mongoObject = mongoObject;