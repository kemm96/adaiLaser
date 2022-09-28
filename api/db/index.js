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

// Modificar de tabla
const update = (data, tabla) => {
   return new Promise((resolve, reject) => {
      connection.query(`
         UPDATE ${tabla} SET ? 
         WHERE id=${data.id}
      `,data , (err, data) => {
         if (err) {
            console.log('Error actualizando', tabla);
            return reject(err);
         }
         resolve(data);
      })
   })
}

// Elimina info de una tabla
const eliminar = (id, tabla) => {
   return new Promise((resolve,reject) => {
      connection.query(`DELETE From ${tabla} WHERE id=${id}
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
	connection,
	insert,
	get,
	list,
	update,
	eliminar
};