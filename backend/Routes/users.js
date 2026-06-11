const express = require('express')
const bcrypt = require('bcrypt')
const prisma = require('../prisma/client')
const { requireAuth, requireRole } = require('../Middlewares/auth')

const router = express.Router()

router.get('/', requireAuth, requireRole('ADMIN'), async (req, res) => {
    const { skip = 0, take = 20 } = req.query

    try {
        const [items, total] = await Promise.all([
            prisma.user.findMany({
                skip: parseInt(skip, 10),
                take: parseInt(take, 10),
                orderBy: { createdAt: 'desc' },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true,
                },
            }),
            prisma.user.count(),
        ])

        return res.json({ items, total })
    } catch (error) {
        console.error('GET /api/users error:', error)
        return res.status(500).json({ error: 'Impossible de charger les utilisateurs' })
    }
})

router.put('/:id/role', requireAuth, requireRole('ADMIN'), async (req, res) => {
    const id = parseInt(req.params.id, 10)
    const { role } = req.body

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' })
    }

    if (!role || !['USER', 'ADMIN'].includes(role)) {
        return res.status(400).json({ error: 'Rôle invalide' })
    }

    try {
        const user = await prisma.user.update({
            where: { id },
            data: { role },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
                createdAt: true,
            },
        })

        return res.json(user)
    } catch (error) {
        console.error('PUT /api/users/:id/role error:', error)
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
        return res.status(500).json({ error: 'Impossible de mettre à jour le rôle' })
    }
})

router.delete('/:id', requireAuth, requireRole('ADMIN'), async (req, res) => {
    const id = parseInt(req.params.id, 10)

    if (Number.isNaN(id)) {
        return res.status(400).json({ error: 'ID invalide' })
    }

    try {
        await prisma.user.delete({
            where: { id },
        })

        return res.json({ message: 'Utilisateur supprimé avec succès' })
    } catch (error) {
        console.error('DELETE /api/users/:id error:', error)
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Utilisateur non trouvé' })
        }
        return res.status(500).json({ error: 'Impossible de supprimer l’utilisateur' })
    }
})

module.exports = router