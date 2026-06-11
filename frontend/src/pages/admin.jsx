import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getAdminDashboard, getToken, getUser } from '../services/auth'
import Header from "../../components/Header.jsx";

function AdminPage() {
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const user = getUser()

    useEffect(() => {
        async function loadDashboard() {
            try {
                const token = getToken()

                if (!token) {
                    navigate('/login')
                    return
                }

                const data = await getAdminDashboard(token)
                setStats(data.stats)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadDashboard()
    }, [navigate])

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="max-w-7xl mx-auto space-y-8">
                    <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-indigo leading-tight">
                            Dashboard admin
                        </h1>
                        <p className="mt-3 text-indigo/70">
                            Connecté en tant que : {user?.email} ({user?.role})
                        </p>
                    </section>

                    {loading && (
                        <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                            <p className="text-indigo">Chargement...</p>
                        </section>
                    )}

                    {error && (
                        <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                            <p className="text-red-600 font-medium">{error}</p>
                        </section>
                    )}

                    {stats && (
                        <>
                            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <article className="bg-white rounded-3xl shadow-2xl p-6">
                                    <p className="text-sm text-indigo/60">Utilisateurs</p>
                                    <p className="text-3xl font-black text-indigo mt-2">{stats.users}</p>
                                </article>

                                <article className="bg-white rounded-3xl shadow-2xl p-6">
                                    <p className="text-sm text-indigo/60">Biens</p>
                                    <p className="text-3xl font-black text-indigo mt-2">{stats.properties}</p>
                                </article>

                                <article className="bg-white rounded-3xl shadow-2xl p-6">
                                    <p className="text-sm text-indigo/60">Agences</p>
                                    <p className="text-3xl font-black text-indigo mt-2">{stats.agencies}</p>
                                </article>
                            </section>

                            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <article className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-black text-indigo mb-2">
                                            Gérer les utilisateurs
                                        </h2>
                                    </div>
                                    <div>
                                        <Link
                                            to="/admin/users"
                                            className="inline-flex items-center bg-indigo text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo/90 transition-all"
                                        >
                                            Accéder à la gestion utilisateurs
                                        </Link>
                                    </div>
                                </article>

                                <article className="bg-white rounded-3xl shadow-2xl p-6 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-xl font-black text-indigo mb-2">
                                            Gérer les biens
                                        </h2>
                                    </div>
                                    <div>
                                        <Link
                                            to="/admin/properties"
                                            className="inline-flex items-center bg-amber text-indigo px-4 py-2 rounded-xl text-sm font-semibold hover:bg-amber/90 transition-all"
                                        >
                                            Accéder à la gestion des biens
                                        </Link>
                                    </div>
                                </article>
                            </section>
                        </>
                    )}
                </div>
            </main>

            <footer className="bg-indigo text-white/70 text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default AdminPage