const jwt = require('jsonwebtoken');

const config = require('../config');

const secret = config.jwt.secret;

const sign = (data) => {
   const token = {
      user: data,
   }

   return jwt.sign(token, secret);
}

const getToken = (auth) => {
	if (!auth) {
      console.log('No viene token');
		throw new Error('Error de Autenticación');
   }

   if (auth.indexOf('Bearer ') === -1) {
      console.log('Formato de token invalido');
		throw new Error('Error de Autenticación');
   }

   let token = auth.replace('Bearer ', '');
   return token;
}

const verify = (token) => {
	try {
		const aux = jwt.verify(token, secret);
		return aux
	} catch (err) {
		console.log('Error en la verificación del token');
		throw new Error('Error de Autenticación');
	}
}

// Decodifica el token
const decode = (req) => {
   const auth = req.headers.authorization;
   const token = getToken(auth);
   const decoded = verify(token);

   return decoded;
}

const check = async(req) => {
	const decoded = decode(req)
	req.user = decoded;
}

module.exports = {
   sign,
   check,
};