const jwt = require('jsonwebtoken')

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).json({ error: 'Token manquant' })
    }

    const [scheme, token] = authHeader.split(' ')

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Format du token invalide' })
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT_SECRET manquant côté serveur' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.auth = decoded
        next()
    } catch (err) {
        return res.status(401).json({ error: 'Token invalide ou expiré' })
    }
}

function requireAdmin(req, res, next) {
    if (!req.auth) {
        return res.status(401).json({ error: 'Non authentifié' })
    }

    if (req.auth.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Accès refusé' })
    }

    next()
}

module.exports = {
    requireAuth,
    requireAdmin,
}