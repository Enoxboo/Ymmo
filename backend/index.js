require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { PrismaClient } = require('@prisma/client')

const authRoutes = require('./Routes/auth')
const propertyRoutes = require('./Routes/properties')
const adminRoutes = require('./Routes/admin')

const prisma = new PrismaClient()
const app = express()

const PORT = process.env.PORT || 4000
const NODE_ENV = process.env.NODE_ENV || 'development'
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173'

if (!process.env.DATABASE_URL) {
    console.error('ERROR: DATABASE_URL not set in .env')
    process.exit(1)
}

if (!process.env.JWT_SECRET) {
    console.error('ERROR: JWT_SECRET not set in .env')
    process.exit(1)
}

app.use(express.json())
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}))

app.get('/api/health', async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`
        res.json({ status: 'OK', env: NODE_ENV, database: 'connected' })
    } catch (err) {
        console.error('Health DB error:', err)
        res.status(500).json({ status: 'ERROR', database: 'disconnected' })
    }
})

app.use('/api/auth', authRoutes)
app.use('/api/properties', propertyRoutes)
app.use('/api/admin', adminRoutes)

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err)
    res.status(500).json({ error: 'Erreur serveur interne' })
})

app.listen(PORT, () => {
    console.log(`\nAPI Ymmo démarrée`)
    console.log(`   http://localhost:${PORT}`)
    console.log(`   Env: ${NODE_ENV}`)
    console.log(`   CORS: ${CORS_ORIGIN}\n`)
})