import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPropertyById } from '../services/properties'
import Header from "../../components/Header.jsx";

const API_URL = import.meta.env.VITE_API_URL
const FILE_URL = import.meta.env.VITE_FILE_URL || API_URL.replace('/api', '')

function BienPage() {
    const { id } = useParams()
    const [bien, setBien] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadProperty() {
            try {
                setLoading(true)
                setError('')
                const data = await getPropertyById(id)
                setBien(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadProperty()
    }, [id])

    function formatPrix(prix) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(prix)
    }

    function formatType(type) {
        switch (type) {
            case 'APPARTEMENT':
                return 'Appartement'
            case 'MAISON':
                return 'Maison'
            case 'LOCAL':
                return 'Local'
            case 'TERRAIN':
                return 'Terrain'
            default:
                return 'Autre'
        }
    }

    function buildImageUrl(url) {
        if (!url) return null
        if (url.startsWith('http')) return url
        return `${FILE_URL}${url}`
    }

    function getMainPhoto(property) {
        const url = property?.photos?.[0]?.url
        return buildImageUrl(url)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-snow flex items-center justify-center">
                <p className="text-indigo font-semibold">Chargement du bien...</p>
            </div>
        )
    }

    if (error || !bien) {
        return (
            <div className="min-h-screen bg-snow flex items-center justify-center px-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full text-center">
                    <h1 className="text-2xl font-black text-indigo mb-3">Bien introuvable</h1>
                    <p className="text-red-600 mb-6">{error || 'Ce bien n’existe pas.'}</p>
                    <Link
                        to="/biens"
                        className="inline-flex bg-indigo text-white px-5 py-3 rounded-xl font-bold"
                    >
                        Retour aux biens
                    </Link>
                </div>
            </div>
        )
    }

    const mainPhoto = getMainPhoto(bien)

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="max-w-7xl mx-auto">
                    <section className="mb-8">
                        <p className="text-sm text-indigo/70 mb-2">
                            Achat &gt; {formatType(bien.type)} &gt; {bien.city} ({bien.postalCode})
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-indigo leading-tight mb-3">
                            {bien.title}
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-indigo/80">
                            <p className="text-lg font-semibold">
                                {bien.city} ({bien.postalCode})
                            </p>
                            <span className="hidden sm:inline text-indigo/40">•</span>
                            <p className="text-base">
                                {formatType(bien.type)} • {bien.surface} m² • {bien.rooms} pièce(s)
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                                {mainPhoto && (
                                    <img
                                        src={mainPhoto}
                                        alt={bien.title}
                                        className="w-full h-[260px] sm:h-[380px] lg:h-[460px] object-cover"
                                    />
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {(bien.photos || []).slice(1, 4).map((photo) => {
                                    const url = buildImageUrl(photo.url)
                                    if (!url) return null
                                    return (
                                        <div
                                            key={photo.id}
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                        >
                                            <img
                                                src={url}
                                                alt={photo.alt || bien.title}
                                                className="w-full h-24 sm:h-32 object-cover"
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <aside className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 h-fit">
                            <p className="text-sm font-semibold text-indigo/70 uppercase tracking-wide mb-2">
                                Prix de vente
                            </p>
                            <p className="text-3xl sm:text-4xl font-black text-indigo mb-4">
                                {formatPrix(bien.price)}
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Surface</p>
                                    <p className="text-lg font-black text-indigo">{bien.surface} m²</p>
                                </div>
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Pièces</p>
                                    <p className="text-lg font-black text-indigo">{bien.rooms}</p>
                                </div>
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Chambres</p>
                                    <p className="text-lg font-black text-indigo">
                                        {bien.bedrooms ?? '—'}
                                    </p>
                                </div>
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Salle de bain</p>
                                    <p className="text-lg font-black text-indigo">
                                        {bien.bathrooms ?? '—'}
                                    </p>
                                </div>
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Étage</p>
                                    <p className="text-lg font-black text-indigo">{bien.floor ?? '—'}</p>
                                </div>
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Référence</p>
                                    <p className="text-lg font-black text-indigo">{bien.reference}</p>
                                </div>
                            </div>

                            {bien.agency && (
                                <div className="border-t border-indigo/10 pt-5">
                                    <p className="text-sm text-indigo/70 mb-1">Agence</p>
                                    <p className="text-lg font-black text-indigo">{bien.agency.name}</p>
                                    {bien.agency.address && (
                                        <p className="text-sm text-indigo/80 mt-2">{bien.agency.address}</p>
                                    )}
                                    {bien.agency.phone && (
                                        <p className="text-sm text-indigo/80">{bien.agency.phone}</p>
                                    )}
                                    {bien.agency.email && (
                                        <p className="text-sm text-indigo/80">{bien.agency.email}</p>
                                    )}
                                </div>
                            )}
                        </aside>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                                <h2 className="text-2xl font-black text-indigo mb-4">
                                    Description du bien
                                </h2>
                                <p className="text-indigo/80 leading-relaxed text-sm sm:text-base">
                                    {bien.description || 'Aucune description disponible.'}
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                                <h2 className="text-2xl font-black text-indigo mb-4">
                                    Caractéristiques
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Type</p>
                                        <p className="font-bold text-indigo">
                                            {bien.subType || formatType(bien.type)}
                                        </p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Ascenseur</p>
                                        <p className="font-bold text-indigo">
                                            {bien.elevator ? 'Oui' : 'Non'}
                                        </p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Parking</p>
                                        <p className="font-bold text-indigo">
                                            {bien.parking ? 'Oui' : 'Non'}
                                        </p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Balcon</p>
                                        <p className="font-bold text-indigo">
                                            {bien.balcony ? 'Oui' : 'Non'}
                                        </p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Terrasse</p>
                                        <p className="font-bold text-indigo">
                                            {bien.terrace ? 'Oui' : 'Non'}
                                        </p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">DPE / GES</p>
                                        <p className="font-bold text-indigo">
                                            {bien.dpe || '—'} / {bien.ges || '—'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {!!bien.highlights?.length && (
                                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                                    <h2 className="text-2xl font-black text-indigo mb-4">
                                        Les points forts
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {bien.highlights.map((point) => (
                                            <div
                                                key={point.id}
                                                className="bg-amber/30 text-indigo rounded-2xl px-4 py-3 font-semibold"
                                            >
                                                {point.label}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:px-8">
                                <h2 className="text-2xl font-black text-indigo mb-4">
                                    Localisation
                                </h2>
                                <p className="text-indigo font-semibold mb-2">
                                    {bien.address || `${bien.city} (${bien.postalCode})`}
                                </p>
                                {bien.district && (
                                    <p className="text-indigo/80 text-sm sm:text-base mb-2">
                                        {bien.district}
                                    </p>
                                )}
                                {bien.transportInfo && (
                                    <p className="text-indigo/80 text-sm sm:text-base">
                                        {bien.transportInfo}
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="bg-indigo text-white/60 text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default BienPage