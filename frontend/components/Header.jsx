import { Link, useNavigate } from 'react-router-dom'
import logo from '../src/assets/logo.webp'
import { getUser, logoutUser } from '../src/services/auth'

function Header() {
    const navigate = useNavigate()
    const currentUser = getUser()

    function handleLogout() {
        logoutUser()
        navigate('/login')
    }

    const isAdmin =
        currentUser &&
        (currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN')

    return (
        <header className="bg-amber h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xl sticky top-0 z-50">
            <div className="flex items-center space-x-2">
                <Link to="/">
                    <img
                        src={logo}
                        alt="Ymmo"
                        className="h-9 sm:h-10 lg:h-12 w-auto cursor-pointer"
                    />
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <Link
                    to="/about"
                    className="hidden sm:inline-block text-indigo font-semibold hover:opacity-80 transition-all"
                >
                    À propos
                </Link>

                {isAdmin && (
                    <Link
                        to="/admin"
                        className="hidden sm:inline-block text-indigo font-semibold hover:opacity-80 transition-all"
                    >
                        Admin
                    </Link>
                )}

                {currentUser ? (
                    <button
                        onClick={handleLogout}
                        className="bg-indigo text-white text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-xl hover:bg-indigo/90 transition-all shadow-lg whitespace-nowrap"
                    >
                        Déconnexion ({currentUser.email})
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-indigo text-white text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-indigo/90 transition-all shadow-lg whitespace-nowrap"
                    >
                        Se connecter
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Header