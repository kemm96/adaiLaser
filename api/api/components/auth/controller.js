const bcrypt = require('bcrypt');

const model = require('./model');
const TOKEN = require('../../../token');

const login = async(user) => {
	const auth = await model.login(user.mail);
	
	if(auth === null){
		console.log('Error de Autenticación');
      throw new Error('Error de Autenticación');
   }

	return bcrypt.compare(user.password, auth.password)
	.then(async equal => {
      if (equal) {
			const data = await model.getUser(auth.id)
         const token = TOKEN.sign(data);
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