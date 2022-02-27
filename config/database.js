import mysql from 'mysql2'

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: 'nF5X8Xz$5qI0ImXh',
  port: process.env.DB_PORT,
})

export default pool.promise()