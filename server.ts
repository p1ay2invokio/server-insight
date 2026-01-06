import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.route'
import productRoute from './routes/product.route'


const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', authRoute, productRoute)

dotenv.config().parsed

app.get('/test', (req, res) => {
    res.status(200).send({ success: true })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})