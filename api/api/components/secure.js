const auth = require('../../token');

const checkAuth = () => {
	console.log('checkAuth');
}

const checkAdmin = () => {

   const middleWare = (req, res, next) => {
      auth.check(req)
		.then((body) => {
			if(req.user.user.rol === 1){
				next();
			}else{
				console.log('No tiene los permisos necesarios');
				throw new Error('Error de Autenticación');
			}
		})
		.catch((err) => {
			res.send({
				error: true,
				body: err.message,
			})
		});
   }

   return middleWare
}

module.exports = {
   checkAuth,
	checkAdmin,
};