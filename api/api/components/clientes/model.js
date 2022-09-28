const db = require('../../../db');

const list = (id) => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT c.id, c.lastName, c.name, c.name, c.rut, c.birthday, 
			c.gender, g.name as genderName, c.mail, c.phone, c.adress,
			c.comuna
			FROM Clients c
			LEFT JOIN Gender g ON c.gender = g.id 
			ORDER BY c.lastName ASC
      `,(err, data) => {
         if (err) {
            return reject(err);
         }
         resolve(data);
      })
   })
}

module.exports = {
   list,
};