const express = require('express')
const prisma = require('../prisma/client')

const router = express.Router()


router.get('/where-to-buy', async (req, res) => {
    try {
        const stats = await prisma.property.groupBy({
            by: ['city', 'postalCode'],
            _avg: { price: true },
            _sum: { viewCount: true },
            _count: { _all: true },
        })

        const scored = stats
            .filter((s) => s._count._all > 0 && s._avg.price !== null)
            .map((s) => ({
                city: s.city,
                postalCode: s.postalCode,
                averagePrice: Math.round(s._avg.price),
                totalViews: s._sum.viewCount || 0,
                propertiesCount: s._count._all,
                score:
                    ((s._sum.viewCount || 0) / (s._avg.price || 1)) *
                    1000000,
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10)

        res.json(scored)
    } catch (err) {
        console.error('GET /api/analytics/where-to-buy error:', err)
        res.status(500).json({ error: 'Erreur serveur pour le calcul des statistiques' })
    }
})

router.get('/average-price-by-city', async (req, res) => {
    try {
        const stats = await prisma.property.groupBy({
            by: ['city', 'postalCode'],
            _avg: { price: true },
            _count: { _all: true },
        })

        const result = stats
            .filter((s) => s._avg.price !== null)
            .map((s) => ({
                city: s.city,
                postalCode: s.postalCode,
                averagePrice: Math.round(s._avg.price || 0),
                propertiesCount: s._count._all,
            }))
            .sort((a, b) => b.averagePrice - a.averagePrice)
            .slice(0, 5)

        res.json(result)
    } catch (err) {
        console.error('GET /api/analytics/average-price-by-city error:', err)
        res.status(500).json({ error: 'Erreur serveur pour le prix moyen par ville' })
    }
})

module.exports = router