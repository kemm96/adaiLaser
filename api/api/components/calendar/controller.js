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

module.exports = {
   selectList,
};