const express = require('express')
const prisma = require('../prisma/client')
const { requireAuth, requireRole } = require('../Middlewares/auth')

const router = express.Router()

router.get('/', requireAuth, requireRole('ADMIN'), async (req, res) => {
    try {
        const agencies = await prisma.agency.findMany({
            orderBy: { city: 'asc' },
        })
        return res.json(agencies)
    } catch (err) {
        console.error('GET /api/agencies error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

module.exports = router