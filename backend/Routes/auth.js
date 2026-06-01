const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const { requireAuth } = require('../Middlewares/auth')

const prisma = new PrismaClient()
const router = express.Router()

router.post('/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' })
    }

    if (password.length < 8) {
        return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères' })
    }

    try {
        const normalizedEmail = email.toLowerCase().trim()

        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        })

        if (existingUser) {
            return res.status(409).json({ error: 'Email indisponible.' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email: normalizedEmail,
                password: hashedPassword,
                firstName: firstName?.trim() || null,
                lastName: lastName?.trim() || null,
                role: 'USER',
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        })

        return res.status(201).json(user)
    } catch (err) {
        console.error('POST /api/auth/register error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe requis' })
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT_SECRET manquant côté serveur' })
    }

    try {
        const normalizedEmail = email.toLowerCase().trim()

        const user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
        })

        if (!user) {
            return res.status(401).json({ error: 'Identifiants invalides' })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Identifiants invalides' })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        })
    } catch (err) {
        console.error('POST /api/auth/login error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.auth.userId },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                createdAt: true,
            },
        })

        if (!user) {
            return res.status(404).json({ error: 'Utilisateur introuvable' })
        }

        return res.json(user)
    } catch (err) {
        console.error('GET /api/auth/me error:', err)
        return res.status(500).json({ error: 'Erreur serveur' })
    }
})

module.exports = router