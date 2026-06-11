import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, saveAuth } from '../services/auth'

function RegisterPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const data = await registerUser({
                firstName: form.firstName,
                lastName: form.lastName,
                email: form.email,
                password: form.password,
            })

            saveAuth(data)
            navigate('/')
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-snow px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                <h1 className="text-3xl font-black text-indigo mb-6">Inscription</h1>

                {error && (
                    <p className="mb-4 text-red-600 font-medium">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-indigo">
                            Prénom
                        </label>
                        <input
                            type="text"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                            placeholder="Benoit"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-indigo">
                            Nom
                        </label>
                        <input
                            type="text"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                            placeholder="Pascal"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-indigo">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                            placeholder="test@ymmo.fr"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-semibold text-indigo">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                            placeholder="Mot de passe"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo text-white py-3 rounded-xl font-bold hover:bg-indigo/90 transition-all disabled:opacity-60"
                    >
                        {loading ? 'Inscription...' : 'Créer un compte'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-indigo/70">
                    Déjà inscrit ?{' '}
                    <Link to="/login" className="font-bold text-indigo">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage