import { Request, Response, Router } from 'express'
import pool from '../db' // наша конфигурация с Pool
import validator from 'validator' // для валидации email, если хочешь

const router = Router()

// POST /api/subscribe
router.post('/subscribe', async (req: Request, res: Response) => {
  try {
    // 1. Получаем email из тела запроса
    const { email } = req.body

    // 2. Валидируем email
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email' })
    }

    // 3. Доп. поля (IP, User-Agent)
    const ipAddress = req.ip // или req.socket.remoteAddress
    const userAgent = req.headers['user-agent'] || ''

    // 4. Сохраняем в БД
    const insertQuery = `
      INSERT INTO subscribers (email, ip_address, user_agent)
      VALUES ($1, $2, $3)
      RETURNING id, email, created_at
    `
    const values = [email, ipAddress, userAgent]

    const result = await pool.query(insertQuery, values)
    const newSubscriber = result.rows[0]

    // 5. Отправляем ответ
    res.status(201).json({
      message: 'Email subscribed successfully',
      subscriber: newSubscriber
    })
  } catch (error) {
    // Если нарушена уникальность (duplicate key)
    if ((error as any).code === '23505') {
      return res.status(409).json({ error: 'Email already subscribed' })
    }

    console.error(error)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
