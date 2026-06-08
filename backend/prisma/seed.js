require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
    const {
        SEED_ADMIN_EMAIL,
        SEED_ADMIN_PASSWORD,
        SEED_USER_EMAIL,
        SEED_USER_PASSWORD,
    } = process.env

    if (!SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD || !SEED_USER_EMAIL || !SEED_USER_PASSWORD) {
        throw new Error('Variables de seed manquantes dans .env')
    }

    await prisma.propertyPhoto.deleteMany()
    await prisma.propertyHighlight.deleteMany()
    await prisma.property.deleteMany()
    await prisma.agency.deleteMany()
    await prisma.user.deleteMany()

    const adminPasswordHash = await bcrypt.hash(SEED_ADMIN_PASSWORD, 10)
    const userPasswordHash = await bcrypt.hash(SEED_USER_PASSWORD, 10)

    await prisma.user.create({
        data: {
            email: SEED_ADMIN_EMAIL,
            password: adminPasswordHash,
            firstName: 'Admin',
            lastName: 'Ymmo',
            role: 'ADMIN',
        },
    })

    await prisma.user.create({
        data: {
            email: SEED_USER_EMAIL,
            password: userPasswordHash,
            firstName: 'Client',
            lastName: 'Test',
            role: 'USER',
        },
    })

    const agencyTalence = await prisma.agency.create({
        data: {
            name: 'Ymmo Talence',
            email: 'contact@ymmo.fr',
            phone: '05 56 00 00 00',
            address: '162 cours Gambetta',
            city: 'Talence',
            postalCode: '33400',
        },
    })

    await prisma.property.create({
        data: {
            reference: '00674709',
            title: 'Studio T1 / F1 31 m² à vendre',
            description:
                "Situé à Talence, ce studio de 31 m² représente une belle opportunité pour un premier achat ou un investissement locatif.",
            price: 148000,
            city: 'Talence',
            postalCode: '33400',
            address: 'Talence (33400)',
            district: 'Secteur résidentiel proche commodités',
            transportInfo: 'Tram et bus accessibles rapidement',
            type: 'APPARTEMENT',
            subType: 'Studio T1 / F1',
            surface: 31,
            rooms: 1,
            bedrooms: 0,
            bathrooms: 1,
            floor: 2,
            elevator: true,
            parking: false,
            balcony: false,
            terrace: false,
            available: true,
            dpe: 'D',
            ges: 'B',
            agency: {
                connect: { id: agencyTalence.id },
            },
            photos: {
                create: [
                    { url: 'https://via.placeholder.com/1200x800?text=Studio+Talence+1', alt: 'Photo 1', position: 0 },
                    { url: 'https://via.placeholder.com/1200x800?text=Studio+Talence+2', alt: 'Photo 2', position: 1 },
                    { url: 'https://via.placeholder.com/1200x800?text=Studio+Talence+3', alt: 'Photo 3', position: 2 },
                ],
            },
            highlights: {
                create: [
                    { label: 'Proche commerces et transports', position: 0 },
                    { label: 'Idéal primo-accédant ou investisseur', position: 1 },
                    { label: 'Résidence sécurisée', position: 2 },
                ],
            },
        },
    })

    console.log('Seed sécurisé terminé.')
}

main()
    .catch((e) => {
        console.error('Seed error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })