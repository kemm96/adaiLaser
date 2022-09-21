require('dotenv').config();

module.exports = {
   api: {
      port: process.env.API_PORT,
   },
   cors: {
      origin: process.env.CORS_ORIGIN,
   },
   db: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
   },
   jwt: {
      secret: process.env.JWT_SECRET,
   }
}