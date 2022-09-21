const bcrypt = require('bcrypt');

const TOKEN = require('../../../token');

const login = async(user) => {
	//const data = await model.login(user.mail);
	const data = {
		mail:'user@admin.com',
		password:'$2b$10$7u.E97Z.uGuE.fd3bWbydOf9b2TUaE0mVN07sE0qyaskbg1hN9zJe',
	}

	//if(data === null){
	if (data.mail !== user.mail){
		console.log('Error de Autenticación');
      throw new Error('Error de Autenticación');
   }

	return bcrypt.compare(user.password, data.password)
	.then(async equal => {
      if (equal) {
         const token = TOKEN.sign('datos del usuario');
         return token
      } else {
			console.log('Error de Autenticación');
			throw new Error('Error de Autenticación');
      }
   })
}

module.exports = {
   login,
};