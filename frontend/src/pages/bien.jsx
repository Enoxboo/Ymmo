import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'
import france from '../assets/france.webp'

function BienPage() {
    const bien = {
        id: '00674709',
        titre: 'Studio T1 / F1 31 m² à vendre',
        prix: 148000,
        ville: 'Talence',
        codePostal: '33400',
        type: 'Appartement',
        sousType: 'Studio T1 / F1',
        surface: 31,
        pieces: 1,
        chambre: 0,
        salleDeBain: 1,
        etage: 2,
        ascenseur: true,
        parking: false,
        balcon: false,
        terrasse: false,
        dpe: 'D',
        ges: 'B',
        description:
            "Situé à Talence, ce studio de 31 m² représente une belle opportunité pour un premier achat ou un investissement locatif. Le bien se compose d'une pièce principale lumineuse, d'un espace cuisine, d'une salle d'eau avec WC et d'un agencement fonctionnel proche des commodités et des transports.",
        pointsForts: [
            'Proche commerces et transports',
            'Idéal primo-accédant ou investisseur',
            'Résidence sécurisée',
            'Pièce de vie lumineuse',
            'Bonne optimisation de l’espace',
        ],
        localisation: {
            adresse: 'Talence (33400)',
            quartier: 'Secteur résidentiel proche commodités',
            transport: 'Tram et bus accessibles rapidement',
        },
        agence: {
            nom: 'Ymmo Talence',
            telephone: '05 56 00 00 00',
            email: 'contact@ymmo.fr',
            adresse: '162 cours Gambetta, 33400 Talence',
        },
        photos: [
            france,
            france,
            france,
        ],
    }

    const formatPrix = (prix) =>
        new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(prix)

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <header className="bg-amber h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xl sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Ymmo" className="h-9 sm:h-10 lg:h-12 w-auto" />
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/biens"
                        className="hidden sm:inline-block text-indigo font-semibold hover:opacity-80 transition-all"
                    >
                        Retour aux biens
                    </Link>
                    <Link
                        to="/login"
                        className="bg-indigo text-white text-sm px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl hover:bg-indigo/90 transition-all shadow-lg whitespace-nowrap"
                    >
                        Se connecter
                    </Link>
                </div>
            </header>

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="max-w-7xl mx-auto">
                    <section className="mb-8">
                        <p className="text-sm text-indigo/70 mb-2">
                            Achat &gt; Appartement &gt; {bien.ville} ({bien.codePostal})
                        </p>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-indigo leading-tight mb-3">
                            {bien.titre}
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-indigo/80">
                            <p className="text-lg font-semibold">
                                {bien.ville} ({bien.codePostal})
                            </p>
                            <span className="hidden sm:inline text-indigo/40">•</span>
                            <p className="text-base">
                                {bien.type} • {bien.surface} m² • {bien.pieces} pièce
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 space-y-4">
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                                <img
                                    src={bien.photos[0]}
                                    alt={bien.titre}
                                    className="w-full h-[260px] sm:h-[380px] lg:h-[460px] object-cover"
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                {bien.photos.slice(1).map((photo, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden"
                                    >
                                        <img
                                            src={photo}
                                            alt={`Photo ${index + 2} du bien`}
                                            className="w-full h-24 sm:h-32 object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 h-fit">
                            <p className="text-sm font-semibold text-indigo/70 uppercase tracking-wide mb-2">
                                Prix de vente
                            </p>
                            <p className="text-3xl sm:text-4xl font-black text-indigo mb-4">
                                {formatPrix(bien.prix)}
                            </p>

                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Surface</p>
                                    <p className="text-lg font-black text-indigo">{bien.surface} m²</p>
                                </div>
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Pièces</p>
                                    <p className="text-lg font-black text-indigo">{bien.pieces}</p>
                                </div>
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Étage</p>
                                    <p className="text-lg font-black text-indigo">{bien.etage}</p>
                                </div>
                                <div className="bg-snow rounded-2xl p-4 text-center">
                                    <p className="text-xs text-indigo/60 mb-1">Salle d’eau</p>
                                    <p className="text-lg font-black text-indigo">{bien.salleDeBain}</p>
                                </div>
                            </div>

                            <div className="border-t border-indigo/10 pt-5">
                                <p className="text-sm text-indigo/70 mb-1">Agence</p>
                                <p className="text-lg font-black text-indigo">{bien.agence.nom}</p>
                                <p className="text-sm text-indigo/80 mt-2">{bien.agence.adresse}</p>
                                <p className="text-sm text-indigo/80">{bien.agence.telephone}</p>
                                <p className="text-sm text-indigo/80">{bien.agence.email}</p>
                            </div>
                        </aside>
                    </section>

                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                                <h2 className="text-2xl font-black text-indigo mb-4">
                                    Description du bien
                                </h2>
                                <p className="text-indigo/80 leading-relaxed text-sm sm:text-base">
                                    {bien.description}
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                                <h2 className="text-2xl font-black text-indigo mb-4">
                                    Caractéristiques
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Type</p>
                                        <p className="font-bold text-indigo">{bien.sousType}</p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Ascenseur</p>
                                        <p className="font-bold text-indigo">
                                            {bien.ascenseur ? 'Oui' : 'Non'}
                                        </p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Parking</p>
                                        <p className="font-bold text-indigo">
                                            {bien.parking ? 'Oui' : 'Non'}
                                        </p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Balcon</p>
                                        <p className="font-bold text-indigo">
                                            {bien.balcon ? 'Oui' : 'Non'}
                                        </p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">Terrasse</p>
                                        <p className="font-bold text-indigo">
                                            {bien.terrasse ? 'Oui' : 'Non'}
                                        </p>
                                    </div>
                                    <div className="bg-snow rounded-2xl p-4">
                                        <p className="text-sm text-indigo/60">DPE / GES</p>
                                        <p className="font-bold text-indigo">
                                            {bien.dpe} / {bien.ges}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                                <h2 className="text-2xl font-black text-indigo mb-4">
                                    Les points forts
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {bien.pointsForts.map((point, index) => (
                                        <div
                                            key={index}
                                            className="bg-amber/30 text-indigo rounded-2xl px-4 py-3 font-semibold"
                                        >
                                            {point}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                                <h2 className="text-2xl font-black text-indigo mb-4">
                                    Localisation
                                </h2>
                                <p className="text-indigo font-semibold mb-2">
                                    {bien.localisation.adresse}
                                </p>
                                <p className="text-indigo/80 text-sm sm:text-base mb-2">
                                    {bien.localisation.quartier}
                                </p>
                                <p className="text-indigo/80 text-sm sm:text-base">
                                    {bien.localisation.transport}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="bg-indigo text-white/60 text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default BienPage