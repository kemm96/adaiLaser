const db = require('../../../db');

const list = () => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT *
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

module.exports = {
   list,
};