const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding...')

    await prisma.propertyPhoto.deleteMany()
    await prisma.propertyHighlight.deleteMany()
    await prisma.property.deleteMany()
    await prisma.agency.deleteMany()

    const agencyParis = await prisma.agency.create({
        data: {
            name: 'Ymmo Paris',
            email: 'paris@ymmo.fr',
            phone: '01 42 00 00 00',
            address: '12 rue de Rivoli',
            city: 'Paris',
            postalCode: '75004',
        },
    })

    const agencyBordeaux = await prisma.agency.create({
        data: {
            name: 'Ymmo Bordeaux',
            email: 'bordeaux@ymmo.fr',
            phone: '05 56 00 00 00',
            address: '8 cours de l’Intendance',
            city: 'Bordeaux',
            postalCode: '33000',
        },
    })

    const property1 = await prisma.property.create({
        data: {
            reference: 'YM-PAR-001',
            title: 'Appartement lumineux au cœur de Paris',
            description: 'Très bel appartement rénové, proche des commerces et transports.',
            price: 465000,
            city: 'Paris',
            postalCode: '75011',
            address: '25 rue Oberkampf',
            district: 'Bastille / Oberkampf',
            transportInfo: 'Métro et bus à moins de 5 minutes',
            type: 'APPARTEMENT',
            subType: 'T3',
            surface: 72,
            rooms: 3,
            bedrooms: 2,
            bathrooms: 1,
            floor: 3,
            elevator: true,
            parking: false,
            balcony: true,
            terrace: false,
            available: true,
            dpe: 'D',
            ges: 'B',
            agencyId: agencyParis.id,
        },
    })

    const property2 = await prisma.property.create({
        data: {
            reference: 'YM-BDX-001',
            title: 'Maison familiale avec jardin',
            description: 'Maison spacieuse idéale pour une famille, avec extérieur agréable.',
            price: 620000,
            city: 'Bordeaux',
            postalCode: '33200',
            address: '14 avenue du Parc',
            district: 'Caudéran',
            transportInfo: 'Bus direct centre-ville',
            type: 'MAISON',
            subType: 'Maison 5 pièces',
            surface: 145,
            rooms: 5,
            bedrooms: 4,
            bathrooms: 2,
            floor: null,
            elevator: false,
            parking: true,
            balcony: false,
            terrace: true,
            available: true,
            dpe: 'C',
            ges: 'C',
            agencyId: agencyBordeaux.id,
        },
    })

    const property3 = await prisma.property.create({
        data: {
            reference: 'YM-BDX-002',
            title: 'Local commercial bien placé',
            description: 'Local professionnel avec vitrine dans un secteur passant.',
            price: 310000,
            city: 'Bordeaux',
            postalCode: '33000',
            address: '5 rue Sainte-Catherine',
            district: 'Centre-ville',
            transportInfo: 'Tram A et B',
            type: 'LOCAL',
            subType: 'Local commercial',
            surface: 95,
            rooms: 2,
            bedrooms: 0,
            bathrooms: 1,
            floor: 0,
            elevator: false,
            parking: false,
            balcony: false,
            terrace: false,
            available: true,
            dpe: 'E',
            ges: 'C',
            agencyId: agencyBordeaux.id,
        },
    })

    await prisma.propertyPhoto.createMany({
        data: [
            {
                url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
                alt: 'Salon appartement Paris',
                position: 1,
                propertyId: property1.id,
            },
            {
                url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80',
                alt: 'Chambre appartement Paris',
                position: 2,
                propertyId: property1.id,
            },
            {
                url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80',
                alt: 'Maison familiale Bordeaux',
                position: 1,
                propertyId: property2.id,
            },
            {
                url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
                alt: 'Jardin maison Bordeaux',
                position: 2,
                propertyId: property2.id,
            },
            {
                url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
                alt: 'Local commercial Bordeaux',
                position: 1,
                propertyId: property3.id,
            },
        ],
    })

    await prisma.propertyHighlight.createMany({
        data: [
            { label: 'Proche métro', position: 1, propertyId: property1.id },
            { label: 'Appartement rénové', position: 2, propertyId: property1.id },
            { label: 'Balcon', position: 3, propertyId: property1.id },

            { label: 'Jardin privatif', position: 1, propertyId: property2.id },
            { label: '4 chambres', position: 2, propertyId: property2.id },
            { label: 'Parking', position: 3, propertyId: property2.id },

            { label: 'Vitrine sur rue', position: 1, propertyId: property3.id },
            { label: 'Centre-ville', position: 2, propertyId: property3.id },
        ],
    })

    console.log('Seed terminé.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })