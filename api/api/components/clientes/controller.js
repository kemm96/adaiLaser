const db = require('../../../db');
const model = require('./model');

const list = async() => {
	const clientes = await db.list('Clients')
	return clientes
}

const insert = async(data) => {	
	if(data.id === null){
		return await db.insert(data, 'Clients')
	}else{
		return await db.update(data, 'Clients')
	}
}

const history = async(id) => {	
	if(id === 0 || id === '0'){
		return []
	}
	
	const response = await model.history(id)
	return response
}

module.exports = {
   list,
	insert,
	history,
};