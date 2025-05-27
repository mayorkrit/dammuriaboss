import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { pool } from './db.js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Статика для product images (если кладёшь их в /backend/public/assets)
app.use('/assets', express.static(path.join(process.cwd(), 'public/assets')))

// POST /emails — сохраняем новый e-mail, игнорируем дубликаты
app.post('/emails', async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email is required' })

  try {
    const text = 'INSERT INTO emails(email) VALUES($1) ON CONFLICT DO NOTHING RETURNING *'
    const { rows } = await pool.query(text, [email])
    if (rows.length === 0) {
      return res.status(200).json({ message: 'Already saved' })
    }
    res.status(201).json(rows[0])
  } catch (err) {
    console.error('Full error:', err)    // ← сюда
    res.status(500).json({ error: err.message })
  }
})


// GET /products — отдаём все продукты
// src/index.js
app.get('/products', async (_req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        id,
        title,
        image_url AS "imageUrl",
        description,
        price,
        available,
        sizes
      FROM products
    `)
    res.json(rows)
  } catch (err) {
    console.error('Error fetching products:', err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})



// 404 для прочих
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' })
})

// Запуск
app.listen(PORT, '127.0.0.1', () => {
  console.log(`🚀 Backend listening on http://127.0.0.1:${PORT}`)
})
