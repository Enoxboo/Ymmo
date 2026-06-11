import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'
import { getProperties } from '../services/properties'
import { getUser } from '../services/auth'

const API_URL = import.meta.env.VITE_API_URL
const FILE_URL = import.meta.env.VITE_FILE_URL || API_URL.replace('/api', '')

function BienAllPage() {
    const [query, setQuery] = useState('')
    const [typeFilter, setTypeFilter] = useState('Tous')
    const [sortBy, setSortBy] = useState('recent')
    const [page, setPage] = useState(1)
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const currentUser = getUser()

    const PAGE_SIZE = 8
    const types = ['Tous', 'APPARTEMENT', 'MAISON', 'LOCAL', 'TERRAIN', 'AUTRE']

    useEffect(() => {
        async function loadProperties() {
            try {
                setLoading(true)
                setError('')

                const data = await getProperties({
                    q: query,
                    type: typeFilter,
                    page,
                    take: PAGE_SIZE,
                })

                setProperties(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadProperties()
    }, [query, typeFilter, page])

    const filtered = useMemo(() => {
        const list = [...properties]

        if (sortBy === 'price-asc') {
            list.sort((a, b) => a.price - b.price)
        } else if (sortBy === 'price-desc') {
            list.sort((a, b) => b.price - a.price)
        }

        return list
    }, [properties, sortBy])

    function goToPage(n) {
        setPage(Math.max(1, n))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(price)
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

    function getImage(property) {
        const url = property.photos?.[0]?.url

        if (!url) {
            return null
        }

        if (url.startsWith('http')) {
            return url
        }

        return `${FILE_URL}${url}`
    }

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <header className="bg-amber h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xl sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <Link to="/">
                        <img src={logo} alt="Ymmo" className="h-9 sm:h-10 lg:h-12 w-auto cursor-pointer" />
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/biens"
                        className="hidden sm:inline-block text-indigo font-semibold hover:opacity-80 transition-all"
                    >
                        Retour aux biens
                    </Link>

                    {currentUser ? (
                        <Link
                            to={currentUser.role === 'ADMIN' ? '/admin' : '/'}
                            className="bg-indigo text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl hover:bg-indigo/90 transition-all shadow-lg whitespace-nowrap"
                        >
                            {currentUser.role === 'ADMIN'
                                ? `Admin (${currentUser.email})`
                                : `Mon compte (${currentUser.email})`}
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-indigo text_white text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-indigo/90 transition-all shadow-lg whitespace-nowrap"
                        >
                            Se connecter
                        </Link>
                    )}
                </div>
            </header>

            <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
                <section className="max-w-7xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-indigo leading-tight mb-4">
                        Tous les biens
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div className="flex-1">
                            <label htmlFor="search" className="sr-only">
                                Rechercher
                            </label>
                            <input
                                id="search"
                                type="search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    setPage(1)
                                }}
                                placeholder="Recherche par titre, ville, code postal..."
                                className="w-full px-3 py-3 rounded-2xl border-2 border-indigo/10 bg-white/70 focus:outline-none focus:ring-4 focus:ring-amber/30 transition text-indigo text-sm"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <select
                                value={typeFilter}
                                onChange={(e) => {
                                    setTypeFilter(e.target.value)
                                    setPage(1)
                                }}
                                className="px-3 py-3 rounded-2xl border-2 border-indigo/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber transition min-w-[140px]"
                            >
                                {types.map((t) => (
                                    <option key={t} value={t}>
                                        {t === 'Tous' ? 'Tous' : formatType(t)}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-3 py-3 rounded-2xl border-2 border-indigo/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber transition min-w-[150px]"
                            >
                                <option value="recent">Par défaut</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                            </select>
                        </div>
                    </div>

                    {loading && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <p className="text-indigo">Chargement des biens...</p>
                        </div>
                    )}

                    {error && (
                        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <div className="mb-4 text-sm text-indigo/80">
                                <strong className="text-indigo">{filtered.length}</strong> résultat(s) — page {page}
                            </div>

                            {filtered.length === 0 ? (
                                <div className="bg-white rounded-2xl shadow-lg p-8">
                                    <p className="text-indigo/70">Aucun bien trouvé pour cette recherche.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filtered.map((p) => (
                                        <article
                                            key={p.id}
                                            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo/10"
                                        >
                                            <Link to={`/biens/${p.id}`} className="block">
                                                <div className="h-48 bg-snow overflow-hidden">
                                                    {getImage(p) && (
                                                        <img
                                                            src={getImage(p)}
                                                            alt={p.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>

                                                <div className="p-4">
                                                    <h2 className="text-lg font-bold text-indigo mb-1">
                                                        {p.title}
                                                    </h2>
                                                    <p className="text-amber font-black text-lg mb-2">
                                                        {formatPrice(p.price)}
                                                    </p>
                                                    <p className="text-xs text-indigo/70 mb-2">
                                                        {p.city} • {p.surface} m² • {p.rooms} pièce(s)
                                                    </p>

                                                    <div className="flex items-center justify-between mt-2">
                                                        <span className="inline-block bg-indigo text-white text-xs px-3 py-1 rounded-full">
                                                            Voir
                                                        </span>
                                                        <span className="text-xs text-indigo/60">
                                                            Type: {formatType(p.type)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </article>
                                    ))}
                                </div>
                            )}

                            <nav
                                className="flex items-center justify-between mt-6"
                                aria-label="Pagination"
                            >
                                <button
                                    onClick={() => goToPage(page - 1)}
                                    disabled={page === 1}
                                    className="inline-flex items-center justify-center bg-amber text-indigo px-4 py-2 rounded-2xl shadow-sm hover:bg-amber/90 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px]"
                                >
                                    Précédent
                                </button>

                                <div className="text-sm text-indigo/70">Page {page}</div>

                                <button
                                    onClick={() => goToPage(page + 1)}
                                    disabled={filtered.length < PAGE_SIZE}
                                    className="inline-flex items-center justify-center bg-indigo text-white px-4 py-2 rounded-2xl shadow-sm hover:bg-indigo/90 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px]"
                                >
                                    Suivant
                                </button>
                            </nav>
                        </>
                    )}
                </section>
            </main>

            <footer className="bg-indigo text-amber text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default BienAllPage