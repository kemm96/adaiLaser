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

const listClient = () => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT c.id, c.name as label  
			FROM Clients c 
			ORDER BY c.name ASC 
      `,(err, data) => {
         if (err) {
            return reject(err);
         }
         resolve(data);
      })
   })
}

const listCitas = (box, month, year) => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT c.id, t.name, t.color, c.date, c.time1, c.time2
			FROM Citas c
			LEFT JOIN Tratamientos t ON t.id = c.tratamiento 
			WHERE date LIKE '${year}-${month}-%' AND c.box=${box}
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
	listClient,
	listCitas
};