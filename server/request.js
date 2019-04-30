module.exports = (app) => {
    app.get("*", (request, response) => {
        let respuesta = {respuesta: 'No hay nada para esta peticion'};
        response.status(404).send(JSON.stringify(respuesta));
    });
}