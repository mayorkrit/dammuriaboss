import { Pool } from 'pg'

// Можно читать параметры подключения из переменных окружения
// или прописать напрямую (на время разработки).
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'mydb',
  password: process.env.DB_PASS || 'postgres',
  port: Number(process.env.DB_PORT) || 5432,
})

export default pool
