import { useEffect, useState } from 'react'
import { getUser } from '../services/auth'
import { getUsers, updateUserRole, deleteUser } from '../services/users'
import Header from '../../components/Header.jsx'

function AdminUsersPage() {
    const currentUser = getUser()
    const [users, setUsers] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const PAGE_SIZE = 10

    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true)
                setError('')
                const data = await getUsers({ page, take: PAGE_SIZE })
                setUsers(data.items)
                setTotal(data.total)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        loadUsers()
    }, [page])

    async function handleRoleChange(id, newRole) {
        try {
            setError('')
            const updated = await updateUserRole(id, newRole)
            setUsers((prev) =>
                prev.map((u) => (u.id === id ? { ...u, role: updated.role } : u)),
            )
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Supprimer cet utilisateur ?')) return

        try {
            setError('')
            await deleteUser(id)
            setUsers((prev) => prev.filter((u) => u.id !== id))
            setTotal((t) => t - 1)
        } catch (err) {
            setError(err.message)
        }
    }

    function goToPage(n) {
        setPage(Math.max(1, n))
    }

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="max-w-7xl mx-auto space-y-6">
                    <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl font-black text-indigo leading-tight">
                            Gestion des utilisateurs
                        </h1>
                        <p className="mt-2 text-indigo/70 text-sm">
                            Connecté en tant que {currentUser?.email} ({currentUser?.role})
                        </p>
                    </section>

                    {error && (
                        <section className="bg-white rounded-3xl shadow-2xl p-4">
                            <p className="text-red-600 font-medium">{error}</p>
                        </section>
                    )}

                    <section className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6">
                        {loading ? (
                            <p className="text-indigo">Chargement des utilisateurs...</p>
                        ) : users.length === 0 ? (
                            <p className="text-indigo/70">Aucun utilisateur trouvé.</p>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                        <tr className="border-b border-indigo/10 text-left text-indigo/70">
                                            <th className="py-2 pr-4">ID</th>
                                            <th className="py-2 pr-4">Email</th>
                                            <th className="py-2 pr-4">Nom</th>
                                            <th className="py-2 pr-4">Rôle</th>
                                            <th className="py-2 pr-4">Créé le</th>
                                            <th className="py-2 pr-4 text-right">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((u) => {
                                            const isCurrentUser = u.id === currentUser?.id
                                            const isSuperAdmin = u.role === 'SUPER_ADMIN'

                                            return (
                                                <tr key={u.id} className="border-b border-indigo/5">
                                                    <td className="py-2 pr-4 text-indigo/70">{u.id}</td>
                                                    <td className="py-2 pr-4 text-indigo font-medium">
                                                        {u.email}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo/80">
                                                        {(u.firstName || '') +
                                                            ' ' +
                                                            (u.lastName || '')}
                                                    </td>
                                                    <td className="py-2 pr-4">
                                                        {isSuperAdmin ? (
                                                            <span className="text-xs font-bold text-indigo">
                                                                    SUPER_ADMIN
                                                                </span>
                                                        ) : (
                                                            <select
                                                                value={u.role}
                                                                onChange={(e) =>
                                                                    handleRoleChange(
                                                                        u.id,
                                                                        e.target.value,
                                                                    )
                                                                }
                                                                className="border border-indigo/20 rounded-lg px-2 py-1 text-xs"
                                                            >
                                                                <option value="USER">USER</option>
                                                                <option value="ADMIN">ADMIN</option>
                                                            </select>
                                                        )}
                                                    </td>
                                                    <td className="py-2 pr-4 text-indigo/70">
                                                        {new Date(
                                                            u.createdAt,
                                                        ).toLocaleDateString('fr-FR')}
                                                    </td>
                                                    <td className="py-2 pr-4 text-right">
                                                        {isSuperAdmin ? (
                                                            <span className="text-xs text-indigo font-semibold">
                                                                    Super admin protégé
                                                                </span>
                                                        ) : isCurrentUser ? (
                                                            <span className="text-xs text-indigo">
                                                                    (vous)
                                                                </span>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleDelete(u.id)}
                                                                className="text-xs text-red-600 font-semibold hover:underline"
                                                            >
                                                                Supprimer
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between mt-4 text-sm text-indigo/70">
                                    <div>
                                        Total : {total} utilisateur(s) — page {page}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => goToPage(page - 1)}
                                            disabled={page === 1}
                                            className="px-3 py-1 rounded-lg border border-indigo/20 disabled:opacity-40"
                                        >
                                            Précédent
                                        </button>
                                        <button
                                            onClick={() => goToPage(page + 1)}
                                            disabled={page * PAGE_SIZE >= total}
                                            className="px-3 py-1 rounded-lg border border-indigo/20 disabled:opacity-40"
                                        >
                                            Suivant
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </section>
                </div>
            </main>

            <footer className="bg-indigo text-white/70 text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default AdminUsersPage