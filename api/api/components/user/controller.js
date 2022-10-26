const bcrypt = require('bcrypt');

const db = require('../../../db');
const model = require('./model');

const list = async() => {
	const user = await model.list('Tratamientos')
	return user
}

const insert = async(data) => {	
	if(data.user.id === null){
		const pass = await bcrypt.hash(data.pass, 8)
		const user = data.user;
		const auth = {
			mail:data.user.mail,
			password:pass
		}

		await db.insert(auth, 'Auth')
		return await db.insert(user, 'User')
	}else{
		return await db.update(data.user, 'User')
	}
}

const erase = async(id) => {	
	const mail = await model.findUser(id);
	const response = await model.changeStatus(mail, 0)
	if(response.protocol41){
		return await model.erase(mail)
	}
	return 'error'
}

module.exports = {
   list,
	insert,
	erase,
};