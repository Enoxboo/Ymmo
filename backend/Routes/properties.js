const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

function generateReference() {
    const random = Math.floor(100000 + Math.random() * 900000)
    return `REF-${random}`
}

router.get('/', async (req, res) => {
    try {
        const { q, type, page = 1, take = 10 } = req.query

        const where = {}

        if (q) {
            where.OR = [
                { title: { contains: q, mode: 'insensitive' } },
                { city: { contains: q, mode: 'insensitive' } },
                { postalCode: { contains: q, mode: 'insensitive' } },
            ]
        }

        if (type && type !== 'Tous') {
            where.type = type
        }

        const skip = (Number(page) - 1) * Number(take)

        const properties = await prisma.property.findMany({
            where,
            skip,
            take: Number(take),
            orderBy: { createdAt: 'desc' },
            include: {
                photos: true,
                agency: true,
                highlights: true,
            },
        })

        res.json(properties)
    } catch (err) {
        console.error('GET /api/properties error:', err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        const property = await prisma.property.update({
            where: { id },
            data: {
                viewCount: { increment: 1 },
            },
            include: {
                photos: {
                    orderBy: { position: 'asc' },
                },
                agency: true,
                highlights: true,
            },
        })

        if (!property) {
            return res.status(404).json({ error: 'Bien introuvable' })
        }

        res.json(property)
    } catch (err) {
        console.error('GET /api/properties/:id error:', err)
        res.status(500).json({ error: 'Erreur serveur' })
    }
})

router.post('/', async (req, res) => {
    try {
        const {
            title,
            price,
            city,
            postalCode,
            surface,
            rooms,
            available,
            type,
            photos = [],
            agencyId,
            description,
            bedrooms,
            bathrooms,
            floor,
            dpe,
        } = req.body

        const data = {
            reference: generateReference(), // référence auto
            title,
            price: Number(price),
            city,
            postalCode,
            surface: Number(surface),
            rooms: Number(rooms),
            available,
            type,
            description: description || null,
            bedrooms: bedrooms !== null && bedrooms !== '' ? Number(bedrooms) : 0,
            bathrooms: bathrooms !== null && bathrooms !== '' ? Number(bathrooms) : 0,
            floor: floor !== null && floor !== '' ? Number(floor) : null,
            dpe: dpe || null,
        }

        if (agencyId) {
            data.agency = {
                connect: { id: Number(agencyId) },
            }
        }

        if (Array.isArray(photos) && photos.length > 0) {
            data.photos = {
                create: photos.map((url, index) => ({
                    url,
                    position: index,
                })),
            }
        }

        const property = await prisma.property.create({
            data,
            include: {
                photos: true,
                agency: true,
                highlights: true,
            },
        })

        res.status(201).json(property)
    } catch (err) {
        console.error('POST /api/properties error:', err)
        res.status(500).json({ error: 'Erreur serveur lors de la création du bien' })
    }
})

router.put('/:id', async (req, res) => {
    const id = Number(req.params.id)

    const {
        title,
        price,
        city,
        postalCode,
        surface,
        rooms,
        available,
        type,
        agencyId,
        description,
        bedrooms,
        bathrooms,
        floor,
        dpe,
        photos,
    } = req.body

    const data = {}

    if (title !== undefined) data.title = title
    if (price !== undefined) data.price = Number(price)
    if (city !== undefined) data.city = city
    if (postalCode !== undefined) data.postalCode = postalCode
    if (surface !== undefined) data.surface = Number(surface)
    if (rooms !== undefined) data.rooms = Number(rooms)
    if (available !== undefined) data.available = available
    if (type !== undefined) data.type = type

    if (description !== undefined) {
        data.description = description === '' ? null : description
    }

    if (bedrooms !== undefined) {
        data.bedrooms =
            bedrooms === '' || bedrooms === null ? 0 : Number(bedrooms)
    }

    if (bathrooms !== undefined) {
        data.bathrooms =
            bathrooms === '' || bathrooms === null ? 0 : Number(bathrooms)
    }

    if (floor !== undefined) {
        data.floor =
            floor === '' || floor === null ? null : Number(floor)
    }

    if (dpe !== undefined) {
        data.dpe = dpe === '' ? null : dpe
    }


    if (agencyId !== undefined) {
        if (agencyId === '' || agencyId === null) {
        } else {
            data.agency = {
                connect: { id: Number(agencyId) },
            }
        }
    }

    try {
        const property = await prisma.property.update({
            where: { id },
            data,
            include: {
                photos: true,
                agency: true,
                highlights: true,
            },
        })

        res.json(property)
    } catch (err) {
        console.error('PUT /api/properties/:id error:', err)
        res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du bien' })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id)

        await prisma.property.delete({
            where: { id },
        })

        res.status(204).end()
    } catch (err) {
        console.error('DELETE /api/properties/:id error:', err)
        res.status(500).json({ error: 'Erreur serveur lors de la suppression du bien' })
    }
})

module.exports = router