import express from 'express'
import cors from 'cors'
import subscriberRouter from './routes/subscriber'

const app = express()

// Миддлвары
app.use(cors()) // если хотим, чтобы фронт с другого домена мог обращаться
app.use(express.json()) // для чтения JSON тела POST-запросов

// Роуты
app.use('/api', subscriberRouter)

// Запуск сервера
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
