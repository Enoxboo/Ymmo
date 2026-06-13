import { useEffect, useState } from 'react'
import Header from "../../components/Header.jsx";
import { getWhereToBuyStats, getMostExpensiveCities } from '../services/analytics'

function StatisticsPage() {
    const [whereToBuy, setWhereToBuy] = useState([])
    const [expensiveCities, setExpensiveCities] = useState([])

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadStats() {
            try {
                setLoading(true)
                setError('')

                const [zones, expensive] = await Promise.all([
                    getWhereToBuyStats(),
                    getMostExpensiveCities(),
                ])

                setWhereToBuy(zones)
                setExpensiveCities(expensive)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadStats()
    }, [])

    function formatPrice(value) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(value)
    }

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="max-w-7xl mx-auto space-y-6">
                    <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl font-black text-indigo leading-tight">
                            Statistiques immobilières
                        </h1>
                        <p className="mt-2 text-indigo/70 text-sm sm:text-base">
                            Cette page présente des indicateurs simples à partir des données de la
                            plateforme Ymmo : zones les plus consultées et villes où les prix moyens
                            sont les plus élevés.
                        </p>
                    </section>

                    {error && (
                        <section className="bg-white rounded-3xl shadow-2xl p-4">
                            <p className="text-red-600 font-medium">{error}</p>
                        </section>
                    )}

                    {loading ? (
                        <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                            <p className="text-indigo">Chargement des statistiques...</p>
                        </section>
                    ) : (
                        <>
                            <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-black text-indigo mb-4">
                                    Zones intéressantes où acheter
                                </h2>
                                <p className="text-sm text-indigo/70 mb-4">
                                    Ce classement combine le nombre de vues des annonces et le prix
                                    moyen des biens par zone (ville + code postal) pour mettre en
                                    avant les endroits qui suscitent le plus d&apos;intérêt.
                                </p>

                                {whereToBuy.length === 0 ? (
                                    <p className="text-indigo/70">
                                        Pas encore assez de données pour afficher ce classement.
                                    </p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm">
                                            <thead>
                                            <tr className="border-b border-indigo/10 text-left text-indigo/70">
                                                <th className="py-2 pr-4">#</th>
                                                <th className="py-2 pr-4">Ville</th>
                                                <th className="py-2 pr-4">Code postal</th>
                                                <th className="py-2 pr-4">Biens</th>
                                                <th className="py-2 pr-4">Prix moyen</th>
                                                <th className="py-2 pr-4">Vues totales</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {whereToBuy.map((row, index) => (
                                                <tr
                                                    key={`wtb-${row.city}-${row.postalCode}`}
                                                    className="border-b border-indigo/5"
                                                >
                                                    <td className="py-2 pr-4 text-indigo/60">
                                                        {index + 1}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo font-semibold">
                                                        {row.city}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo/80">
                                                        {row.postalCode}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo/80">
                                                        {row.propertiesCount}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo font-bold">
                                                        {formatPrice(row.averagePrice)}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo/80">
                                                        {row.totalViews}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </section>

                            <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                                <h2 className="text-xl sm:text-2xl font-black text-indigo mb-4">
                                    Villes les plus chères
                                </h2>
                                <p className="text-sm text-indigo/70 mb-4">
                                    Ce classement montre les villes où le prix moyen des biens
                                    publiés sur Ymmo est le plus élevé. Il est calculé à partir des
                                    biens actuellement présents dans la base.
                                </p>

                                {expensiveCities.length === 0 ? (
                                    <p className="text-indigo/70">
                                        Pas encore assez de données pour afficher ce classement.
                                    </p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full text-sm">
                                            <thead>
                                            <tr className="border-b border-indigo/10 text-left text-indigo/70">
                                                <th className="py-2 pr-4">#</th>
                                                <th className="py-2 pr-4">Ville</th>
                                                <th className="py-2 pr-4">Code postal</th>
                                                <th className="py-2 pr-4">Biens</th>
                                                <th className="py-2 pr-4">Prix moyen</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {expensiveCities.map((row, index) => (
                                                <tr
                                                    key={`exp-${row.city}-${row.postalCode}`}
                                                    className="border-b border-indigo/5"
                                                >
                                                    <td className="py-2 pr-4 text-indigo/60">
                                                        {index + 1}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo font-semibold">
                                                        {row.city}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo/80">
                                                        {row.postalCode}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo/80">
                                                        {row.propertiesCount}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo font-bold">
                                                        {formatPrice(row.averagePrice)}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </section>
                        </>
                    )}
                </div>
            </main>

            <footer className="bg-indigo text-white/60 text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default StatisticsPage