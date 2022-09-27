const model = require('./model');

const list = async() => {
	const clientes = await model.list('Clients')
	return clientes
}

const postClient = async(data) => {
	console.log(data);
}

module.exports = {
   list,
	postClient,
};