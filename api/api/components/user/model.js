const db = require('../../../db');

const list = () => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT *  
			FROM User u
			WHERE u.status=1 
			ORDER BY u.name ASC 
      `,(err, data) => {
         if (err) {
            return reject(err);
         }
         resolve(data);
      })
   })
}

const findUser = (id) => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT mail  
			FROM User
			WHERE id=${id} 
      `,(err, data) => {
         if (err) {
            return reject(err);
         }
         resolve(data[0].mail || null);
      })
   })
}

const changeStatus = (mail, status) => {
   return new Promise((resolve,reject) => {
      db.connection.query(`
			UPDATE User 
			SET status=${status} 
			WHERE mail='${mail}'
      `,(err,response)=>{
         if(err){
            console.log(err);
            console.log('Error Borrando de la tabla', tabla);
            return reject(err);
         }else{
            resolve(response);
         }
      })
	})
}

const erase = (mail) => {
   return new Promise((resolve,reject) => {
      db.connection.query(`
			DELETE 
			From Auth 
			WHERE mail='${mail}'
      `,(err,response)=>{
         if(err){
            console.log(err);
            console.log('Error Borrando de la tabla', tabla);
            return reject(err);
         }else{
            resolve(response);
         }
      })
	})
}

module.exports = {
   list,
	findUser,
	changeStatus,
	erase,
};