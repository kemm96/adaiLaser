const db = require('../../../db');
const model = require('./model');

const list = async() => {
	const clientes = await model.list('Tratamientos')
	return clientes
}

const insert = async(data) => {	
	if(data.id === null){
		return await db.insert(data, 'Tratamientos')
	}else{
		return await db.update(data, 'Tratamientos')
	}
}

module.exports = {
   list,
	insert,
};