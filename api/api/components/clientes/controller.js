const db = require('../../../db');
const model = require('./model');

const list = async() => {
	const clientes = await model.list('Clients')
	return clientes
}

const insert = async(data) => {	
	if(data.id === null){
		return await db.insert(data, 'Clients')
	}else{
		delete data['genderName']
		return await db.update(data, 'Clients')
	}
}

module.exports = {
   list,
	insert,
};