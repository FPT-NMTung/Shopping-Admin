import mysql from 'mysql2'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: 'Tung88644264',
  port: process.env.DB_PORT,
})

export default pool.promise()