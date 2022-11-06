const db = require('../../../db');

const listTratamientos = () => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT t.id, t.name, t.time
			FROM Tratamientos t
			ORDER BY t.name ASC
      `,(err, data) => {
         if (err) {
            return reject(err);
         }
         resolve(data);
      })
   })
}

const listUser = () => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT u.id, u.name  
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

module.exports = {
   listTratamientos,
	listUser,
};