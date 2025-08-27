import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

const app: Application = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

export default app
