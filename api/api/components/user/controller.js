const db = require('../../../db');
const model = require('./model');

const list = async() => {
	const user = await model.list('Tratamientos')
	return user
}

const insert = async(data) => {	
	if(data.id === null){
		return await db.insert(data, 'User')
	}else{
		return await db.update(data, 'User')
	}
}

module.exports = {
   list,
	insert,
};