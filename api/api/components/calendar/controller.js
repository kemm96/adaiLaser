const db = require('../../../db');
const model = require('./model');

const selectList = async() => {
	const tratamientos = await model.listTratamientos();
	const user = await model.listUser();
	const box = await db.list('Box');
	const client = await model.listClient();

	const response = {
		tratamientos:tratamientos,
		user:user,
		box:box,
		client:client,
	}
	return response
}

const insert = async(data) => {	
	if(data.id === null){
		return await db.insert(data, 'Citas')
	}else{
		return await db.update(data, 'Citas')
	}
}

const list = async(box, date) => {
	const data = await model.listCitas(box, date);
	return data
}

const getCita = async(id) => {
	const data = await db.get('Citas', id);
	return data
}

module.exports = {
   selectList,
	insert,
	list,
	getCita,
};