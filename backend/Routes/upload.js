const express = require('express')
const multer = require('multer')
const path = require('path')
const { requireAuth, requireRole } = require('../Middlewares/auth')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploads'))
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1e9) + ext)
    },
})

const upload = multer({ storage })

router.post(
    '/',
    requireAuth,
    requireRole('ADMIN'),
    upload.single('file'),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({ error: 'Aucun fichier envoyé' })
        }

        const fileUrl = `/uploads/${req.file.filename}`

        return res.status(201).json({
            url: fileUrl,
            filename: req.file.filename,
        })
    },
)

module.exports = router