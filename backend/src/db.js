import dotenv from 'dotenv'
dotenv.config()

import pkg from 'pg'
const { Pool } = pkg

export const pool = new Pool({
  host:     process.env.PG_HOST,
  port:     process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user:     process.env.PG_USER,
  password: process.env.PG_PASSWORD
})

pool.on('error', err => {
  console.error('Unexpected PG client error', err)
  process.exit(-1)
})
