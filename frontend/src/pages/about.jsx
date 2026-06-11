import { Link } from 'react-router-dom'
import france from '../assets/france.webp'
import { getUser } from '../services/auth'
import Header from "../../components/Header.jsx";

function AboutPage() {
    const currentUser = getUser()

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <Header />

            <main className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
                <section className="w-full max-w-6xl text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-indigo leading-tight tracking-tight mb-4">
                        À propos d'Ymmo
                    </h1>
                    <p className="text-indigo text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        Le réseau immobilier de demain, ancré dans les territoires français.
                    </p>
                </section>

                <section className="w-full max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 font-sans">
                    {[
                        { value: '12', label: 'Agences en France' },
                        { value: 'Aix', label: 'Siège social' },
                        { value: 'Beaucoup', label: 'de collaborateurs' },
                        { value: 'Une plateforme', label: 'de confiance' },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-indigo rounded-2xl p-6 text-center shadow-lg">
                            <p className="text-amber text-3xl sm:text-4xl font-black mb-1">{stat.value}</p>
                            <p className="text-white/90 text-xs sm:text-sm font-medium">{stat.label}</p>
                        </div>
                    ))}
                </section>

                <section className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 font-sans">
                    <div className="bg-indigo rounded-3xl p-8 sm:p-10 shadow-2xl text-white flex flex-col justify-center">
                        <h2 className="text-xl sm:text-2xl font-black mb-2">
                            Qui sommes-nous ?
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                            Ymmo est un groupe immobilier implanté en France avec siège basé à{' '}
                            <span className="text-amber font-semibold">Aix-en-Provence</span>.
                            Nous animons un réseau de{' '}
                            <span className="text-amber font-semibold">12 agences</span> réparties
                            sur le territoire national, spécialisées dans la vente et l'achat
                            de biens immobiliers résidentiels et professionnels.
                        </p>
                    </div>

                    <div className="bg-amber rounded-3xl p-8 sm:p-10 shadow-2xl text-indigo flex flex-col justify-center">
                        <h2 className="text-xl sm:text-2xl font-black mb-2">
                            Résidentiel & Professionnel
                        </h2>
                        <p className="text-indigo/80 text-sm sm:text-base leading-relaxed">
                            Appartements, maisons, bureaux, commerces — Ymmo couvre l'ensemble
                            du marché immobilier français.
                        </p>
                    </div>
                </section>

                <section className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 font-sans">
                    <div className="bg-amber rounded-3xl p-8 sm:p-10 shadow-2xl text-indigo flex flex-col justify-center">
                        <h2 className="text-xl sm:text-2xl font-black mb-2">
                            Plateforme centralisée
                        </h2>
                        <p className="text-indigo/80 text-sm sm:text-base leading-relaxed">
                            Une interface unique pour les agents et les clients, accessible
                            partout, à tout moment, depuis n'importe quel appareil.
                        </p>
                    </div>

                    <div className="bg-indigo rounded-3xl p-8 sm:p-10 shadow-2xl text-white flex flex-col justify-center">
                        <h2 className="text-xl sm:text-2xl font-black mb-2">
                            Notre mission
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                            Notre objectif est de simplifier les échanges{' '}
                            <span className="text-amber font-semibold">entre clients et agences</span>{' '}
                            pour garantir une optimisation de la gestion des opérations immobilières,
                            sur une seule plateforme.
                        </p>
                    </div>
                </section>

                <section className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 font-sans">
                    <div className="bg-indigo rounded-3xl p-8 sm:p-10 shadow-2xl text-white flex flex-col justify-center">
                        <h2 className="text-xl sm:text-2xl font-black mb-2">
                            Intelligence artificielle & Data
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                            Notre solution intègre des outils de traitement et d'analyse de
                            données afin d'exploiter les tendances du marché immobilier et de
                            guider les{' '}
                            <span className="text-amber font-semibold">décisions stratégiques</span>{' '}
                            d'achat et de vente.
                        </p>
                    </div>

                    <div className="bg-amber rounded-3xl p-8 sm:p-10 shadow-2xl text-indigo flex flex-col justify-center">
                        <h2 className="text-xl sm:text-2xl font-black mb-2">
                            Données & Tendances
                        </h2>
                        <p className="text-indigo/80 text-sm sm:text-base leading-relaxed">
                            Analyse prédictive, tendances de marché, aide à la décision —
                            Ymmo exploite l'IA pour donner un avantage concret à ses agents.
                        </p>
                    </div>
                </section>

                <section className="w-full max-w-6xl text-center mb-16">
                    <img
                        src={france}
                        alt="Carte de France"
                        className="mx-auto w-full max-w-2xl h-auto"
                    />
                </section>

                {!currentUser && (
                    <section className="w-full max-w-6xl text-center">
                        <p className="text-indigo text-sm mb-4">
                            Pas encore membre du réseau ? Rejoignez Ymmo.
                        </p>
                        <Link
                            to="/register"
                            className="inline-block bg-indigo text-white px-10 py-4 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:bg-indigo/90 transition-all"
                        >
                            Créer mon compte
                        </Link>
                    </section>
                )}
            </main>

            <footer className="bg-indigo text-amber text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default AboutPage