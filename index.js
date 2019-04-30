const express = require('express');
const bodyParser = require('body-parser');

// creacion de la instancia de express
const app = express();

// propiedades del cuerpo de la peticion
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// PETICIONES A RECIBIR
require('./server/mysqlRequests')(app);
require('./server/request')(app);

// funcion principa de ejecucion
function init(){

    // Levantamos el server
    app.listen(3000, () => {
        console.log("your server is run on localhost:3000");
    });
}

// iniciamos la ejecucion
init();