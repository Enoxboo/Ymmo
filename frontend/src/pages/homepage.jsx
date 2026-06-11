import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProperties } from '../services/properties'
import Header from '../../components/Header.jsx'

function HomePage() {
    const [latest, setLatest] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadLatest() {
            try {
                setLoading(true)
                setError('')
                const data = await getProperties({ page: 1, take: 3 })
                setLatest(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadLatest()
    }, [])

    function formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(price)
    }

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1 px-4 sm:px-6 lg:px-12 py-10">
                <section className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 mb-10">
                    <h1 className="text-4xl font-black text-indigo mb-4">
                        Bienvenue sur Ymmo
                    </h1>
                    <p className="text-indigo/70 text-lg">
                        Plateforme immobilière centralisée pour les clients, les agences et l’administration.
                    </p>
                </section>

                <section className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-black text-indigo">
                            Derniers biens ajoutés
                        </h2>
                        <Link to="/biens" className="text-sm font-semibold text-indigo">
                            Voir tous les biens
                        </Link>
                    </div>

                    {loading && (
                        <p className="text-indigo/70">Chargement des biens...</p>
                    )}

                    {error && (
                        <p className="text-red-600 font-medium">{error}</p>
                    )}

                    {!loading && !error && latest.length === 0 && (
                        <p className="text-indigo/70">
                            Aucun bien disponible pour le moment.
                        </p>
                    )}

                    {!loading && !error && latest.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {latest.map((p) => (
                                <Link
                                    key={p.id}
                                    to={`/biens/${p.id}`}
                                    className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition"
                                >
                                    <h3 className="font-bold text-indigo mb-1">{p.title}</h3>
                                    <p className="text-amber font-black mb-1">
                                        {formatPrice(p.price)}
                                    </p>
                                    <p className="text-xs text-indigo/70">
                                        {p.city} ({p.postalCode}) • {p.surface} m² • {p.rooms} pièces
                                    </p>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <footer className="bg-indigo text-amber text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default HomePage