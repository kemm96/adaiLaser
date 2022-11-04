const db = require('../../../db');

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

module.exports = {
   list,
	insert,
};