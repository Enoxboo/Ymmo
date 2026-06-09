const jwt = require('jsonwebtoken')
const prisma = require('../prisma/client')

async function requireAuth(req, res, next) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Token manquant' })
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                email: true,
                role: true,
                firstName: true,
                lastName: true,
            },
        })

        if (!user) {
            return res.status(401).json({ error: 'Utilisateur introuvable' })
        }

        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Token invalide ou expiré' })
    }
}

function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: 'Non authentifié' })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Accès refusé' })
        }

        next()
    }
}

module.exports = {
    requireAuth,
    requireRole,
}