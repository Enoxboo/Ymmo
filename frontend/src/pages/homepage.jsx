import {useState} from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.webp'

function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [contactForm, setContactForm] = useState({name: '', email: '', message: ''})

    const properties = [
        {
            id: 1,
            title: 'Villa Prestige Aix',
            price: '750 000€',
            image: 'https://via.placeholder.com/400x300?text=Villa+Aix',
            location: 'Aix-en-Provence'
        },
        {
            id: 2,
            title: 'Appartement Moderne Paris',
            price: '450 000€',
            image: 'https://via.placeholder.com/400x300?text=Appart+Paris',
            location: 'Paris 8e'
        },
        {
            id: 3,
            title: 'Maison Côté Var',
            price: '580 000€',
            image: 'https://via.placeholder.com/400x300?text=Maison+Var',
            location: 'Saint-Raphaël'
        },
        {
            id: 4,
            title: 'Bureau Luxury Lyon',
            price: '320 000€',
            image: 'https://via.placeholder.com/400x300?text=Bureau+Lyon',
            location: 'Lyon Confluence'
        },
    ]

    const stats = [
        {value: '+2 450', label: 'Biens vendus en 2025', color: 'indigo'},
        {value: '5.2M€', label: 'Volume transactionnel', color: 'amber'},
        {value: '+18%', label: 'Croissance annuelle', color: 'indigo'},
        {value: '94%', label: 'Satisfaction clients', color: 'amber'},
    ]

    const popularProperties = [
        {name: 'Maisons Villée', count: '+340 ventes', trend: '+15%'},
        {name: 'Appartements T3', count: '+280 ventes', trend: '+12%'},
        {name: 'Bureaux Modernes', count: '+195 ventes', trend: '+8%'},
        {name: 'Commerces Prime', count: '+120 ventes', trend: '+5%'},
    ]

    const interestingZones = [
        {name: 'Aix-en-Provence', growth: '+22%', opportunity: 'Très haut potentiel'},
        {name: 'Lyon Confluence', growth: '+18%', opportunity: 'Urbain moderne'},
        {name: 'Côte d\'Azur', growth: '+14%', opportunity: 'Résidentiel premium'},
        {name: 'Île-de-France', growth: '+11%', opportunity: 'Stabilité garantie'},
    ]

    const predictions = [
        {month: 'Juin 2025', trend: '📈 Hausse 3-4%', description: 'Demande estivale'},
        {month: 'Juillet-Août', trend: '📊 Stabilité', description: 'Période creuse'},
        {month: 'Septembre 2025', trend: '📈 Croissance 5%', description: 'Rentrée active'},
    ]

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % properties.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + properties.length) % properties.length)
    }

    const handleContactSubmit = (e) => {
        e.preventDefault()
        console.log('Formulaire soumis:', contactForm)
        setContactForm({name: '', email: '', message: ''})
    }

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <header
                className="bg-amber h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xl sticky top-0 z-50 flex-shrink-0">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Ymmo" className="h-9 sm:h-10 lg:h-12 w-auto"/>
                </div>
                <Link
                    to="/login"
                    className="bg-indigo text-white text-sm px-4 sm:px-6 py-2 sm:py-2.5 lg:px-8 lg:py-3 rounded-xl hover:bg-indigo/90 transition-all shadow-lg whitespace-nowrap"
                >
                    Se connecter
                </Link>
            </header>

            <main className="flex-1 flex flex-col items-center px-4 sm:px-6 lg:px-12 py-8 sm:py-12">
                <section className="w-full max-w-7xl mb-12 sm:mb-16">
                    <div className="text-center mb-8 sm:mb-10">
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-indigo leading-tight tracking-tight mb-2 sm:mb-4">
                            Trouvez votre bien <span className="text-amber">idéal</span>
                        </h1>
                    </div>


                    <div className="relative bg-snow rounded-3xl overflow-hidden shadow-xl">
                        <div
                            className="aspect-video sm:aspect-auto h-64 sm:h-80 lg:h-96 relative overflow-hidden bg-snow">
                            <div className="absolute inset-0 flex transition-transform duration-500"
                                 style={{transform: `translateX(-${currentSlide * 100}%)`}}>
                                {properties.map((prop) => (
                                    <div key={prop.id}
                                         className="w-full flex-shrink-0 flex items-center justify-center bg-snow">
                                        <div className="text-center text-indigo px-6">
                                            <div
                                                className="h-40 sm:h-60 bg-white rounded-2xl mb-4 flex items-center justify-center shadow-md">
                                                <img src={prop.image} alt={prop.title}
                                                     className="w-full h-full object-cover rounded-2xl"/>
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-black text-indigo mb-1">{prop.title}</h2>
                                            <p className="text-amber text-lg sm:text-2xl font-bold mb-2">{prop.price}</p>
                                            <p className="text-indigo/70 text-sm">{prop.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button onClick={prevSlide} aria-label="Bien précédent"
                                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-amber text-indigo p-3 sm:p-4 rounded-full hover:bg-amber/90 transition-all z-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                            ←
                        </button>
                        <button onClick={nextSlide} aria-label="Bien suivant"
                                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-amber text-indigo p-3 sm:p-4 rounded-full hover:bg-amber/90 transition-all z-10 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                            →
                        </button>

                        <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                            {properties.map((_, index) => (
                                <button key={index} onClick={() => setCurrentSlide(index)}
                                        aria-label={`Aller à la propriété ${index + 1}`}
                                        aria-current={index === currentSlide}
                                        className={`rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-offset-2 min-w-[44px] min-h-[44px] flex items-center justify-center ${index === currentSlide ? 'bg-amber w-6 sm:w-8' : 'bg-amber/40 w-3 sm:w-4'}`}/>
                            ))}
                        </div>
                    </div>
                </section>
                <div className="text-center mt-8 sm:mt-10">
                    <Link to="/bien-all"
                          className="inline-block bg-indigo text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:bg-indigo/90 transition-all focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2">
                        Voir plus de biens
                    </Link>
                </div>
                <section className="w-full max-w-7xl mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo mb-6 sm:mb-8">Nos chiffres
                        2025</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`${stat.color === 'indigo' ? 'bg-indigo text-white' : 'bg-amber text-indigo'} rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-center shadow-lg hover:shadow-xl transition-shadow`}
                            >
                                <p className={`text-2xl sm:text-3xl lg:text-4xl font-black mb-1 sm:mb-2 ${stat.color === 'indigo' ? 'text-amber' : 'text-indigo'}`}>
                                    {stat.value}
                                </p>
                                <p className={`text-xs sm:text-sm font-medium ${stat.color === 'indigo' ? 'text-white/90' : 'text-indigo/80'}`}>
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-full max-w-7xl mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo mb-6 sm:mb-8">Biens les plus
                        populaires</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {popularProperties.map((prop, index) => (
                            <div
                                key={index}
                                className={`${index % 2 === 0 ? 'bg-indigo text-white' : 'bg-amber text-indigo'} rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow hover:scale-105 transform duration-300`}
                            >
                                <h3 className={`text-lg sm:text-xl font-black mb-2 ${index % 2 === 0 ? 'text-amber' : 'text-indigo'}`}>
                                    {prop.name}
                                </h3>
                                <p className={`text-2xl font-black mb-1 ${index % 2 === 0 ? 'text-amber' : 'text-indigo'}`}>
                                    {prop.count}
                                </p>
                                <p className={`text-xs sm:text-sm font-semibold ${index % 2 === 0 ? 'text-white/90' : 'text-indigo/80'}`}>
                                    Trend sur 12 mois: <span className="text-green-400">{prop.trend}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-full max-w-7xl mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo mb-6 sm:mb-8">Les zones où
                        acheter maintenant</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                        {interestingZones.map((zone, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-indigo to-indigo/80 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg text-white hover:shadow-xl transition-shadow"
                            >
                                <h3 className="text-lg sm:text-xl font-black text-amber mb-2">{zone.name}</h3>
                                <div className="space-y-2">
                                    <div className="text-2xl font-black text-amber">{zone.growth}</div>
                                    <p className="text-white/90 text-xs sm:text-sm font-semibold">{zone.opportunity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-full max-w-7xl mb-12 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-indigo mb-6 sm:mb-8">Nos prédictions
                        pour les 3 prochains mois</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        {predictions.map((pred, index) => (
                            <div
                                key={index}
                                className={`${index === 1 ? 'bg-amber text-indigo' : 'bg-indigo text-white'} rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-shadow`}
                            >
                                <p className="text-xs sm:text-sm font-semibold mb-2 opacity-90">{pred.month}</p>
                                <p className={`text-xl sm:text-2xl font-black mb-2 ${index === 1 ? 'text-indigo' : 'text-amber'}`}>
                                    {pred.trend}
                                </p>
                                <p className={`text-xs sm:text-sm ${index === 1 ? 'text-indigo/80' : 'text-white/90'}`}>
                                    {pred.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* FORMULAIRE DE CONTACT */}
                <section className="w-full max-w-4xl mb-16">
                    <div className="bg-indigo rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white text-center mb-2">Intéressé
                            ?</h2>
                        <p className="text-white/90 text-center text-sm sm:text-base mb-8">Contactez nos experts pour
                            trouver votre bien idéal</p>

                        <form onSubmit={handleContactSubmit} className="flex flex-col space-y-4 sm:space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-white">
                                    Votre nom
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm focus:border-amber focus:ring-4 ring-amber/30 transition-all text-white placeholder-white/60 text-sm"
                                    placeholder="Jean Dupont"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-white">
                                    Votre email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm focus:border-amber focus:ring-4 ring-amber/30 transition-all text-white placeholder-white/60 text-sm"
                                    placeholder="jean@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-white">
                                    Votre message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                                    className="w-full px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm focus:border-amber focus:ring-4 ring-amber/30 transition-all text-white placeholder-white/60 text-sm resize-none h-24 sm:h-32"
                                    placeholder="Dites-nous ce que vous cherchez..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber text-indigo py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-2xl hover:bg-amber/90 transition-all mt-2"
                            >
                                Nous contacter
                            </button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="bg-indigo text-amber text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default HomePage