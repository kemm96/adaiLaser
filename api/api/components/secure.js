const auth = require('../../token');

const checkAuth = (admin) => {
	const middleWare = (req, res, next) => {
      auth.check(req)
		.then(() => {
			if (admin) {
				if(req.user.user.rol === 1){
					next();
				}else{
					console.log('No tiene los permisos necesarios');
					throw new Error('Error de Autenticación');
				}
			} else {
				next();	
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
};