const { PrismaClient, PropertyType } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const agencies = await prisma.agency.findMany({
        orderBy: { id: 'asc' },
        take: 1,
    })

    if (agencies.length === 0) {
        throw new Error("Aucune agence trouvée. Crée d'abord au moins une agence.")
    }

    const agencyId = agencies[0].id

    const propertiesData = [
        {
            reference: 'YM-PAR-101',
            title: 'Appartement lumineux au centre',
            description: 'Appartement rénové proche des commerces.',
            price: 465000,
            viewCount: 3,
            city: 'Paris',
            postalCode: '75011',
            address: '25 rue Oberkampf',
            type: PropertyType.APPARTEMENT,
            surface: 58,
            rooms: 3,
            bedrooms: 2,
            bathrooms: 1,
            floor: 2,
            available: true,
        },
        {
            reference: 'YM-BDX-101',
            title: 'Maison familiale avec jardin',
            description: 'Maison spacieuse idéale pour une famille.',
            price: 620000,
            viewCount: 9,
            city: 'Bordeaux',
            postalCode: '33200',
            address: '14 avenue de la Libération',
            type: PropertyType.MAISON,
            surface: 145,
            rooms: 6,
            bedrooms: 4,
            bathrooms: 2,
            floor: 0,
            available: true,
        },
        {
            reference: 'YM-BDX-102',
            title: 'Local commercial bien placé',
            description: 'Local professionnel avec bonne visibilité.',
            price: 310000,
            viewCount: 1,
            city: 'Bordeaux',
            postalCode: '33000',
            address: '5 rue Sainte-Catherine',
            type: PropertyType.LOCAL,
            surface: 85,
            rooms: 2,
            bedrooms: 0,
            bathrooms: 1,
            floor: 0,
            available: true,
        },
        {
            reference: 'YM-LYO-101',
            title: 'Appartement moderne avec balcon',
            description: 'Bien récent dans un quartier recherché.',
            price: 389000,
            viewCount: 6,
            city: 'Lyon',
            postalCode: '69006',
            address: '8 rue Garibaldi',
            type: PropertyType.APPARTEMENT,
            surface: 67,
            rooms: 3,
            bedrooms: 2,
            bathrooms: 1,
            floor: 4,
            available: true,
        },
        {
            reference: 'YM-MRS-101',
            title: 'Maison proche mer',
            description: 'Maison agréable avec extérieur.',
            price: 540000,
            viewCount: 12,
            city: 'Marseille',
            postalCode: '13008',
            address: '22 boulevard Michelet',
            type: PropertyType.MAISON,
            surface: 132,
            rooms: 5,
            bedrooms: 3,
            bathrooms: 2,
            floor: 0,
            available: true,
        },
        {
            reference: 'YM-TLS-101',
            title: 'Terrain constructible',
            description: 'Belle parcelle pour projet résidentiel.',
            price: 210000,
            viewCount: 4,
            city: 'Toulouse',
            postalCode: '31100',
            address: '18 chemin des Demoiselles',
            type: PropertyType.TERRAIN,
            surface: 500,
            rooms: 0,
            bedrooms: 0,
            bathrooms: 0,
            floor: null,
            available: true,
        },
    ]

    for (const data of propertiesData) {
        const property = await prisma.property.upsert({
            where: { reference: data.reference },
            update: {},
            create: {
                ...data,
                agency: { connect: { id: agencyId } },
            },
        })

        console.log(`Bien ${property.reference} OK (id=${property.id})`)

        // Photos type "maison" avec Lorem Picsum (images réalistes de bâtiments/logements)
        await prisma.propertyPhoto.createMany({
            data: [
                {
                    url: `https://picsum.photos/seed/${property.reference}-house-1/800/600`,
                    alt: `${property.title} - façade`,
                    position: 0,
                    propertyId: property.id,
                },
                {
                    url: `https://picsum.photos/seed/${property.reference}-house-2/800/600`,
                    alt: `${property.title} - vue extérieure`,
                    position: 1,
                    propertyId: property.id,
                },
                {
                    url: `https://picsum.photos/seed/${property.reference}-house-3/800/600`,
                    alt: `${property.title} - environnement`,
                    position: 2,
                    propertyId: property.id,
                },
            ],
            skipDuplicates: true,
        })

        await prisma.propertyHighlight.createMany({
            data: [
                {
                    label: 'Emplacement recherché',
                    position: 0,
                    propertyId: property.id,
                },
                {
                    label: 'Bonne qualité générale du bien',
                    position: 1,
                    propertyId: property.id,
                },
                {
                    label: 'Potentiel intéressant pour un achat',
                    position: 2,
                    propertyId: property.id,
                },
            ],
            skipDuplicates: true,
        })
    }

    console.log('6 biens + photos (maisons) + highlights ajoutés / mis à jour.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        prisma.$disconnect()
    })