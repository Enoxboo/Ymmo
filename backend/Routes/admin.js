const express = require('express')
const prisma = require('../prisma/client')
const { requireAuth, requireRole } = require('../Middlewares/auth')

const router = express.Router()

router.get('/dashboard', requireAuth, requireRole('ADMIN'), async (req, res) => {
    try {
        const users = await prisma.user.count()
        const properties = await prisma.property.count()
        const agencies = await prisma.agency.count()

        return res.json({
            stats: {
                users,
                properties,
                agencies,
            },
        })
    } catch (error) {
        return res.status(500).json({ error: 'Impossible de charger le dashboard admin' })
    }
})

module.exports = router