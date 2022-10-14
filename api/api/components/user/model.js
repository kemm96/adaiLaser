const db = require('../../../db');

const list = () => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT u.id, u.name, u.rut, u.telefono, u.rol , a.mail  
			FROM User u
			LEFT JOIN Auth a ON u.auth = a.id 
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