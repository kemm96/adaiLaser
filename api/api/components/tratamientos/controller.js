const db = require('../../../db');
const model = require('./model');

const list = async() => {
	const tratamientos = await model.list('Tratamientos')
	return tratamientos
}

const insert = async(data) => {	
	if(data.id === null){
		return await db.insert(data, 'Tratamientos')
	}else{
		return await db.update(data, 'Tratamientos')
	}
}

const erase = async(id) => {	
	return await db.erase(id, 'Tratamientos')
}

module.exports = {
   list,
	insert,
	erase
};