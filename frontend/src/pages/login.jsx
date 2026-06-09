import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, saveAuth } from '../services/auth'

function LoginPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
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
            const data = await loginUser(form)
            saveAuth(data)

            if (data.user.role === 'ADMIN') {
                navigate('/admin')
            } else {
                navigate('/')
            }
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-snow px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
                <h1 className="text-3xl font-black text-indigo mb-6">Connexion</h1>

                {error && (
                    <p className="mb-4 text-red-600 font-medium">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-semibold text-indigo">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full rounded-xl border border-gray-300 px-4 py-3"
                            placeholder="exemple@ymmo.fr"
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
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo text-white py-3 rounded-xl font-bold hover:bg-indigo/90 transition-all"
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>
                </form>

                <p className="mt-6 text-sm text-indigo/70">
                    Pas encore de compte ?{' '}
                    <Link to="/register" className="font-bold text-indigo">
                        S’inscrire
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default LoginPage