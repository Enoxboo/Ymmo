const express = require('express')
const prisma = require('../prisma/client')
const { requireAuth, requireRole } = require('../Middlewares/auth')

const router = express.Router()

router.get('/', async (req, res) => {
    const { q, type, city, skip = 0, take = 12 } = req.query
    const where = {}

    if (q) {
        where.OR = [
            { title: { contains: q, mode: 'insensitive' } },
            { city: { contains: q, mode: 'insensitive' } },
            { postalCode: { contains: q, mode: 'insensitive' } },
            { description: { contains: q, mode: 'insensitive' } },
            { reference: { contains: q, mode: 'insensitive' } },
        ]
    }

    if (type && type !== 'Tous') {
        where.type = type
    }

    if (city) {
        where.city = { contains: city, mode: 'insensitive' }
    }

    try {
        const items = await prisma.property.findMany({
            where,
            skip: parseInt(skip, 10),
            take: parseInt(take, 10),
            orderBy: { createdAt: 'desc' },
            include: {
                agency: true,
                photos: { orderBy: { position: 'asc' } },
                highlights: { orderBy: { position: 'asc' } },
            },
        })

        return res.json(items)
    } catch (err) {
        console.error('GET /api/properties error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' })
    }

    try {
        const property = await prisma.property.findUnique({
            where: { id },
            include: {
                agency: true,
                photos: { orderBy: { position: 'asc' } },
                highlights: { orderBy: { position: 'asc' } },
            },
        })

        if (!property) {
            return res.status(404).json({ error: 'Bien non trouvé' })
        }

        return res.json(property)
    } catch (err) {
        console.error('GET /api/properties/:id error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

router.post('/', requireAuth, requireRole('ADMIN'), async (req, res) => {
    try {
        const property = await prisma.property.create({
            data: req.body,
        })

        return res.status(201).json(property)
    } catch (err) {
        console.error('POST /api/properties error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

router.put('/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
    const id = parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' })
    }

    try {
        const property = await prisma.property.update({
            where: { id },
            data: req.body,
        })

        return res.json(property)
    } catch (err) {
        console.error('PUT /api/properties/:id error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

router.delete('/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
    const id = parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' })
    }

    try {
        await prisma.property.delete({
            where: { id },
        })

        return res.json({ message: 'Bien supprimé avec succès' })
    } catch (err) {
        console.error('DELETE /api/properties/:id error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

module.exports = router