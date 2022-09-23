const mysql = require('mysql');

const config = require('../config');

const dbconf = {
   host: config.db.host,
   user: config.db.user,
   password: config.db.password,
   database: config.db.database,
};

let connection;

function handleConection() {

   connection = mysql.createConnection(dbconf);

   connection.connect((err) => {
      if (err) {
         console.error('DB', err);
         console.log('Connecting ...');
         setTimeout(handleConection, 3000);
      } else {
         console.log('DB Connected!');
      }
   });

   connection.on('error', err => {
      console.error('Db', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
         handleCon();
      } else {
         throw err;
      }
   })
}

handleConection();

// Insertar en tabla
function insert(data, tabla) {
   return new Promise((resolve, reject) => {
      connection.query(`
         INSERT INTO ${tabla} 
         SET ?
      `, data, (err, data) => {
         if (err) {
            console.log(err);
            console.log('Error insertando en tabla ', tabla);
            return reject(err);
         }
         resolve(data);
      })
   })
}

// Obtener de una tabla por id
const get = (tabla,id) => {
   return new Promise( (resolve, reject) => {
      connection.query(`SELECT * from ${tabla} WHERE id=${id}`
      ,(err, data) => {
         if (err) {
            console.log(err);
            console.log('No se puede obtener la tabla', tabla);
            return reject(err);
         }
         resolve(data[0] || null);
      })
   })
}

// Devuelve toda la info de una tabla
const list = (tabla) => {
   return new Promise( (resolve, reject) => {
      connection.query(`SELECT * from ${tabla}`
      ,(err, data) => {
         if (err) {
            console.log('No se puede obtener la tabla', tabla);
            return reject(err);
         }
         resolve(data);
      })
   })
}

module.exports = {
	connection,
	insert,
	get,
	list,
};