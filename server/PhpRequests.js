const view = require('../view/PhpViews');

module.exports = (app) => {
	app.post('/php/pass', (request, response)=>{
		
		let pass = request.body.pass;
		
		if (pass){
			view.requestServerPHPView(pass, request, response);
		} else {
			response.status(400).send({mensaje: 'coloque el password'})
		}

	});
}