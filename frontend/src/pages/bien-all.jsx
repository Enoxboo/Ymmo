import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'

function BienAllPage() {
    const MOCK_PROPERTIES = [
        { id: 1, title: 'Villa Prestige Aix', price: '750 000€', type: 'Maison', location: 'Aix-en-Provence', image: 'https://via.placeholder.com/600x400?text=Villa+1', rooms: 5, area: '220 m²' },
        { id: 2, title: 'Appartement Moderne Paris', price: '450 000€', type: 'Appartement', location: 'Paris 8e', image: 'https://via.placeholder.com/600x400?text=Appart+2', rooms: 3, area: '78 m²' },
        { id: 3, title: 'Maison Côté Var', price: '580 000€', type: 'Maison', location: 'Saint-Raphaël', image: 'https://via.placeholder.com/600x400?text=Maison+3', rooms: 4, area: '140 m²' },
        { id: 4, title: 'Bureau Luxury Lyon', price: '320 000€', type: 'Local', location: 'Lyon Confluence', image: 'https://via.placeholder.com/600x400?text=Bureau+4', rooms: 2, area: '95 m²' },
        { id: 5, title: 'Studio Centre Marseille', price: '125 000€', type: 'Appartement', location: 'Marseille', image: 'https://via.placeholder.com/600x400?text=Studio+5', rooms: 1, area: '28 m²' },
        { id: 6, title: 'Maison de Village', price: '220 000€', type: 'Maison', location: 'Aveyron', image: 'https://via.placeholder.com/600x400?text=Maison+6', rooms: 3, area: '95 m²' },
        { id: 7, title: 'T3 Rénové Nantes', price: '260 000€', type: 'Appartement', location: 'Nantes', image: 'https://via.placeholder.com/600x400?text=T3+7', rooms: 3, area: '72 m²' },
        { id: 8, title: 'Loft Industriel', price: '510 000€', type: 'Appartement', location: 'Bordeaux', image: 'https://via.placeholder.com/600x400?text=Loft+8', rooms: 4, area: '160 m²' },
        { id: 9, title: 'Commerce Centre-ville', price: '390 000€', type: 'Local', location: 'Toulouse', image: 'https://via.placeholder.com/600x400?text=Commerce+9', rooms: 1, area: '120 m²' },
        { id: 10, title: 'Maison Campagne', price: '185 000€', type: 'Maison', location: 'Dordogne', image: 'https://via.placeholder.com/600x400?text=Maison+10', rooms: 4, area: '130 m²' },
        { id: 11, title: 'Appartement Vue Mer', price: '680 000€', type: 'Appartement', location: 'Nice', image: 'https://via.placeholder.com/600x400?text=Mer+11', rooms: 3, area: '110 m²' },
        { id: 12, title: 'Maison Contemporaine', price: '920 000€', type: 'Maison', location: 'Hyères', image: 'https://via.placeholder.com/600x400?text=Maison+12', rooms: 6, area: '300 m²' },
    ]

    const [query, setQuery] = useState('')
    const [typeFilter, setTypeFilter] = useState('Tous')
    const [sortBy, setSortBy] = useState('recent')
    const [page, setPage] = useState(1)
    const PAGE_SIZE = 8

    const filtered = useMemo(() => {
        let list = MOCK_PROPERTIES.filter((p) => {
            const q = query.trim().toLowerCase()
            return (
                (!q || p.title.toLowerCase().includes(q) || p.location.toLowerCase().includes(q)) &&
                (typeFilter === 'Tous' || p.type === typeFilter)
            )
        })

        if (sortBy === 'price-asc') {
            list = list.slice().sort((a, b) => parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, '')))
        } else if (sortBy === 'price-desc') {
            list = list.slice().sort((a, b) => parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, '')))
        } else {
            // eslint-disable-next-line no-self-assign
            list = list
        }

        return list
    }, [query, typeFilter, sortBy])

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    function goToPage(n) {
        setPage(Math.min(Math.max(1, n), totalPages))
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const types = ['Tous', ...Array.from(new Set(MOCK_PROPERTIES.map((p) => p.type)))]

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <header className="bg-amber h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xl sticky top-0 z-50 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Ymmo" className="h-9 sm:h-10 lg:h-12 w-auto" />
                </div>
                <Link
                    to="/login"
                    className="bg-indigo text-white text-sm px-4 sm:px-6 py-2 sm:py-2.5 lg:px-8 lg:py-3 rounded-xl hover:bg-indigo/90 transition-all shadow-lg whitespace-nowrap"
                >
                    Se connecter
                </Link>
            </header>

            <main className="flex-1 px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
                <section className="max-w-7xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-indigo leading-tight mb-4">
                        Tous les biens
                    </h1>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <div className="flex-1">
                            <label htmlFor="search" className="sr-only">Rechercher</label>
                            <input
                                id="search"
                                type="search"
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setPage(1) }}
                                placeholder="Recherche par titre ou localisation..."
                                className="w-full px-3 py-3 rounded-2xl border-2 border-indigo/10 bg-white/70 focus:outline-none focus:ring-4 focus:ring-amber/30 transition text-indigo text-sm"
                                aria-label="Rechercher des biens par titre ou localisation"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label htmlFor="type" className="sr-only">Type</label>
                            <select
                                id="type"
                                value={typeFilter}
                                onChange={(e) => { setTypeFilter(e.target.value); setPage(1) }}
                                className="px-3 py-3 rounded-2xl border-2 border-indigo/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber transition min-w-[120px]"
                                aria-label="Filtrer par type de bien"
                            >
                                {types.map((t) => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>

                            <label htmlFor="sort" className="sr-only">Trier</label>
                            <select
                                id="sort"
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value); setPage(1) }}
                                className="px-3 py-3 rounded-2xl border-2 border-indigo/10 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber transition min-w-[150px]"
                                aria-label="Trier les résultats"
                            >
                                <option value="recent">Par défaut</option>
                                <option value="price-asc">Prix croissant</option>
                                <option value="price-desc">Prix décroissant</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4 text-sm text-indigo/80">
                        <strong className="text-indigo">{filtered.length}</strong> résultat(s) — page {page} / {totalPages}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {paginated.map((p) => (
                            <article key={p.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-indigo/10">
                                <Link to={`/bien?id=${p.id}`} aria-label={`Voir le détail de ${p.title}`} className="block">
                                    <div className="h-48 bg-snow overflow-hidden">
                                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="p-4">
                                        <h2 className="text-lg font-bold text-indigo mb-1">{p.title}</h2>
                                        <p className="text-amber font-black text-lg mb-2">{p.price}</p>
                                        <p className="text-xs text-indigo/70 mb-2">{p.location} • {p.area} • {p.rooms} pièces</p>

                                        <div className="flex items-center justify-between mt-2">
                                            <span className="inline-block bg-indigo text-white text-xs px-3 py-1 rounded-full">Voir</span>
                                            <span className="text-xs text-indigo/60">Type: {p.type}</span>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>

                    <nav className="flex items-center justify-between mt-6" aria-label="Pagination">
                        <div>
                            <button
                                onClick={() => goToPage(page - 1)}
                                disabled={page === 1}
                                aria-label="Page précédente"
                                className="inline-flex items-center justify-center bg-amber text-indigo px-4 py-2 rounded-2xl shadow-sm hover:bg-amber/90 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-indigo"
                            >
                                Précédent
                            </button>
                        </div>

                        <div className="text-sm text-indigo/70">
                            Page {page} sur {totalPages}
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => goToPage(page + 1)}
                                disabled={page === totalPages}
                                aria-label="Page suivante"
                                className="inline-flex items-center justify-center bg-indigo text-white px-4 py-2 rounded-2xl shadow-sm hover:bg-indigo/90 disabled:opacity-50 disabled:cursor-not-allowed min-w-[44px] min-h-[44px] focus:outline-none focus:ring-2 focus:ring-amber"
                            >
                                Suivant
                            </button>
                        </div>
                    </nav>
                </section>
            </main>

            <footer className="bg-indigo text-amber text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default BienAllPage