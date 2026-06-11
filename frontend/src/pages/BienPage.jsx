import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPropertyById } from '../services/properties'
import Header from "../../components/Header.jsx";

const API_URL = import.meta.env.VITE_API_URL

function BienPage() {
    const { id } = useParams()
    const [property, setProperty] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)
                setError('')
                const data = await getPropertyById(id)
                setProperty(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [id])

    function getMainPhoto() {
        const url = property?.photos?.[0]?.url
        if (!url) return null
        if (url.startsWith('http')) return url
        return `${API_URL}${url}`
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-snow">
                <p className="text-indigo">Chargement du bien...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-snow">
                <p className="text-red-600">{error}</p>
            </div>
        )
    }

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-snow">
                <p className="text-indigo">Bien introuvable.</p>
            </div>
        )
    }

    const mainPhoto = getMainPhoto()

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
                <section className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {mainPhoto && (
                        <div className="h-64 sm:h-80 bg-snow">
                            <img
                                src={mainPhoto}
                                alt={property.photos?.[0]?.alt || property.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-6 sm:p-8">
                        <h1 className="text-2xl sm:text-3xl font-black text-indigo mb-2">
                            {property.title}
                        </h1>
                        <p className="text-amber font-black text-xl mb-3">
                            {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency: 'EUR',
                                maximumFractionDigits: 0,
                            }).format(property.price)}
                        </p>
                        <p className="text-sm text-indigo/80 mb-4">
                            {property.city} ({property.postalCode}) • {property.surface} m² •{' '}
                            {property.rooms} pièce(s)
                            {property.bedrooms ? ` • ${property.bedrooms} ch.` : ''}
                            {property.dpe ? ` • DPE ${property.dpe}` : ''}
                        </p>

                        {property.description && (
                            <p className="text-sm text-indigo/80 whitespace-pre-line">
                                {property.description}
                            </p>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}

export default BienPage