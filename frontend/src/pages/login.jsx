import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'

function LoginPage() {
    return (
        <div className="min-h-screen bg-snow font-sans antialiased h-screen overflow-hidden flex flex-col">
            <header className="bg-amber h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xl sticky top-0 z-50 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Ymmo" className="h-9 sm:h-10 lg:h-12 w-auto" />
                </div>
                <a
                    href="/"
                    className="bg-indigo text-white text-sm px-4 sm:px-6 py-2 sm:py-2.5 lg:px-8 lg:py-3 rounded-xl font-bold hover:bg-indigo/90 transition-all shadow-lg whitespace-nowrap"
                >
                    Voir le site
                </a>
            </header>

            <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
                <section className="bg-indigo backdrop-blur-xl w-full max-w-md sm:max-w-lg lg:max-w-xl rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-white/20 text-white flex flex-col">
                    <div className="text-center mb-6 pb-5 border-b border-white/20">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3 leading-tight tracking-tight">
                            Se <span className="text-amber">Connecter</span>
                        </h1>
                        <p className="text-white text-sm sm:text-base lg:text-lg font-light max-w-sm mx-auto leading-relaxed">
                            Bon retour sur Ymmo
                        </p>
                    </div>

                    <form className="flex flex-col space-y-4 sm:space-y-5 mt-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="block text-xs sm:text-sm font-semibold text-white tracking-wide"
                            >
                                Email professionnel
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm focus:border-amber focus:ring-4 ring-amber/30 transition-all text-white placeholder-white/60 shadow-inner text-sm"
                                placeholder="agent@ymmo.fr"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="block text-xs sm:text-sm font-semibold text-white tracking-wide"
                            >
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm focus:border-amber focus:ring-4 ring-amber/30 transition-all text-white placeholder-white/60 shadow-inner text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-amber text-indigo py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:bg-amber/90 transition-all mt-2"
                        >
                            Se connecter
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-white/20">
                        <p className="text-center text-white/90 text-xs sm:text-sm">
                            Pas encore de compte ?{' '}
                            <Link
                                to="/register"
                                className="text-amber font-semibold hover:underline transition-all"
                            >
                                S'inscrire
                            </Link>
                        </p>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default LoginPage