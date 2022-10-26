const db = require('../../../db');

// Auth
const login = (mail) => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
         SELECT password
         FROM Auth
         WHERE mail= '${mail}'
      `,(err, data) => {
         if (err) {
            return reject(err);
         }
         resolve(data[0] || null);
      })
   })
}

const getUser = (mail) => {
   return new Promise((resolve, reject) => {
      db.connection.query(`
         SELECT name, rol
         FROM User
         WHERE mail= '${mail}'
      `,(err, data) => {
         if (err) {
            return reject(err);
         }
         resolve(data[0] || null);
      })
   })
}

module.exports = {
   login,
	getUser
};