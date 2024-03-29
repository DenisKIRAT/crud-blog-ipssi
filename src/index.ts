import express from 'express'
import * as dotenv from 'dotenv'
import postsRoutes from './routes/posts'
import userRoutes from './routes/user'
import commentsRoutes from './routes/comments'
import { protect } from './modules/auth'
import { createNewUser, signIn } from './handlers/user'
import config from './config'

dotenv.config()

const app = express()
const PORT = config.port

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur le blog "Fête comme chez vous !"' })
})

app.use('/api', protect, [
	userRoutes,
	postsRoutes,
	commentsRoutes
])

app.post('/signUp', createNewUser)
app.post('/signIn', signIn)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})