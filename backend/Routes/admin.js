const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { requireAuth, requireAdmin } = require('../Middlewares/auth')

const prisma = new PrismaClient()
const router = express.Router()

router.post('/properties', requireAuth, requireAdmin, async (req, res) => {
    const {
        reference,
        title,
        description,
        price,
        city,
        postalCode,
        address,
        district,
        transportInfo,
        type,
        subType,
        surface,
        rooms,
        bedrooms,
        bathrooms,
        floor,
        elevator,
        parking,
        balcony,
        terrace,
        available,
        dpe,
        ges,
        agencyId,
        photos,
        highlights,
    } = req.body

    try {
        const created = await prisma.property.create({
            data: {
                reference,
                title,
                description,
                price,
                city,
                postalCode,
                address,
                district,
                transportInfo,
                type,
                subType,
                surface,
                rooms,
                bedrooms,
                bathrooms,
                floor,
                elevator,
                parking,
                balcony,
                terrace,
                available,
                dpe,
                ges,
                agency: {
                    connect: { id: agencyId },
                },
                photos: photos?.length
                    ? {
                        create: photos.map((photo, index) => ({
                            url: photo.url,
                            alt: photo.alt || null,
                            position: photo.position ?? index,
                        })),
                    }
                    : undefined,
                highlights: highlights?.length
                    ? {
                        create: highlights.map((item, index) => ({
                            label: item.label,
                            position: item.position ?? index,
                        })),
                    }
                    : undefined,
            },
            include: {
                agency: true,
                photos: true,
                highlights: true,
            },
        })

        return res.status(201).json(created)
    } catch (err) {
        console.error('POST /api/admin/properties error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

module.exports = router