require('dotenv').config()

const express = require('express')
const cors = require('cors')

const authRoutes = require('./Routes/auth')
const adminRoutes = require('./Routes/admin')
const propertyRoutes = require('./Routes/properties')

const app = express()

const PORT = process.env.PORT
const CORS_ORIGIN = process.env.CORS_ORIGIN

app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json())

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK' })
})

app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/properties', propertyRoutes)

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`)
})