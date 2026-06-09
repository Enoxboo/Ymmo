const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const prisma = require('../prisma/client')
const { requireAuth } = require('../Middlewares/auth')

const router = express.Router()

router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' })
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return res.status(409).json({ error: 'Un compte existe déjà avec cet email' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName: firstName || null,
                lastName: lastName || null,
                role: 'USER',
            },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
            },
        })

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return res.status(201).json({ token, user })
    } catch (error) {
        return res.status(500).json({ error: 'Erreur serveur lors de l’inscription' })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email et mot de passe requis' })
        }

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return res.status(401).json({ error: 'Identifiants invalides' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Identifiants invalides' })
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            },
        })
    } catch (error) {
        return res.status(500).json({ error: 'Erreur serveur lors de la connexion' })
    }
})

router.get('/me', requireAuth, async (req, res) => {
    return res.json({ user: req.user })
})

module.exports = router