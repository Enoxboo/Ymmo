const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function ensureSeedUsers() {
    const adminEmail = process.env.SEED_ADMIN_EMAIL
    const adminPassword = process.env.SEED_ADMIN_PASSWORD
    const userEmail = process.env.SEED_USER_EMAIL
    const userPassword = process.env.SEED_USER_PASSWORD

    if (!adminEmail || !adminPassword) {
        console.warn(
            'SEED_ADMIN_EMAIL ou SEED_ADMIN_PASSWORD manquant(s) dans .env, aucun super admin seedé.',
        )
    } else {
        await ensureSuperAdmin(adminEmail, adminPassword)
    }

    if (!userEmail || !userPassword) {
        console.warn(
            'SEED_USER_EMAIL ou SEED_USER_PASSWORD manquant(s) dans .env, aucun user seedé.',
        )
    } else {
        await ensureNormalUser(userEmail, userPassword)
    }
}

async function ensureSuperAdmin(email, plainPassword) {
    let user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        const hashedPassword = await bcrypt.hash(plainPassword, 10)

        user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'SUPER_ADMIN',
                firstName: 'Admin',
                lastName: 'Ymmo',
            },
        })

        console.log('Super admin seedé :', email)
    } else {
        if (user.role !== 'SUPER_ADMIN') {
            user = await prisma.user.update({
                where: { email },
                data: { role: 'SUPER_ADMIN' },
            })
            console.log('Rôle mis à jour en SUPER_ADMIN pour :', email)
        } else {
            console.log('Super admin déjà configuré :', email)
        }
    }
}

async function ensureNormalUser(email, plainPassword) {
    let user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        const hashedPassword = await bcrypt.hash(plainPassword, 10)

        user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                role: 'USER',
                firstName: 'User',
                lastName: 'Ymmo',
            },
        })

        console.log('Utilisateur seedé :', email)
    } else {
        console.log('Utilisateur déjà existant :', email)
    }
}

module.exports = { ensureSeedUsers }