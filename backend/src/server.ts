import express, { Request, Response } from 'express'
import cookieSession from 'cookie-session'
import cors from 'cors'
import userRouter from './routes/user.routes'
import dailyRouter from './routes/daily.routes'
import dotenv from 'dotenv'
import { error } from 'console'
import diaryRouter from './routes/diary.routes'
dotenv.config()

// creat server
const app = express()

// middleware
app.use(cors({
  origin: 'http://localhost:4321',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const SIGN_KEY = process.env.COOKIE_SIGN_KEY
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY
if (!SIGN_KEY || !ENCRYPT_KEY) {
  throw new Error("No cookie key")
}
app.use(cookieSession({
  name: 'session',
  keys: [SIGN_KEY, ENCRYPT_KEY],
}))

// routes
app.use('/', userRouter)
app.use('/daily', dailyRouter)
app.use('/diary', diaryRouter)

// 404 fallback
app.use((req: Request, res: Response) => {
  res.status(404).send("Page not found")
})

// start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/`)
})