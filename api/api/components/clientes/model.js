const db = require('../../../db');

const history = (id) => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
			SELECT c.client, u.name, t.name as tratamiento, c.box, c.date, c.time1, c.time2
			FROM Citas c
			LEFT JOIN User u ON u.id = c.user 
			LEFT JOIN Tratamientos t ON t.id = c.tratamiento
			WHERE c.client=${id}
      `,(err, data) => {
         if (err) {
            return reject(err);
         }
         resolve(data);
      })
   })
}

module.exports = {
   history
};