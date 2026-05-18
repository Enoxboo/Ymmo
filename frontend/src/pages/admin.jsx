import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'

function AdminPage() {
    const stats = [
        { value: '128', label: 'Biens publiés' },
        { value: '17', label: 'En attente' },
        { value: '9', label: 'Agences actives' },
        { value: '24h', label: 'Dernière mise à jour' },
    ]

    const properties = [
        {
            id: 'BIEN-001',
            title: 'Appartement T3 - Marseille 6e',
            type: 'Résidentiel',
            city: 'Marseille',
            price: '325 000 €',
            status: 'Publié',
            agency: 'Ymmo Marseille',
        },
        {
            id: 'BIEN-002',
            title: 'Local commercial - Aix-en-Provence',
            type: 'Professionnel',
            city: 'Aix-en-Provence',
            price: '540 000 €',
            status: 'En attente',
            agency: 'Ymmo Aix',
        },
        {
            id: 'BIEN-003',
            title: 'Maison 5 pièces - Lyon',
            type: 'Résidentiel',
            city: 'Lyon',
            price: '610 000 €',
            status: 'Brouillon',
            agency: 'Ymmo Lyon',
        },
        {
            id: 'BIEN-004',
            title: 'Bureaux - Paris 11e',
            type: 'Professionnel',
            city: 'Paris',
            price: '1 120 000 €',
            status: 'Publié',
            agency: 'Ymmo Paris',
        },
    ]

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Publié':
                return 'bg-green-500/15 text-green-300 border border-green-400/20'
            case 'En attente':
                return 'bg-amber/15 text-amber border border-amber/20'
            case 'Brouillon':
                return 'bg-white/10 text-white/70 border border-white/10'
            default:
                return 'bg-white/10 text-white/70 border border-white/10'
        }
    }

    return (
        <div className="min-h-screen bg-[#16181d] text-white font-sans antialiased flex">
            <aside className="hidden lg:flex w-72 bg-[#111318] border-r border-white/10 flex-col">
                <div className="h-20 px-6 flex items-center border-b border-white/10">
                    <img src={logo} alt="Ymmo" className="h-10 w-auto" />
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <button className="w-full bg-indigo text-white rounded-2xl px-4 py-3 text-left font-semibold shadow-lg">
                        Tableau de bord
                    </button>

                    <button className="w-full text-white/80 hover:text-white hover:bg-white/5 rounded-2xl px-4 py-3 text-left transition-all">
                        Gestion des biens
                    </button>

                    <button className="w-full text-white/80 hover:text-white hover:bg-white/5 rounded-2xl px-4 py-3 text-left transition-all">
                        Agences
                    </button>

                    <button className="w-full text-white/80 hover:text-white hover:bg-white/5 rounded-2xl px-4 py-3 text-left transition-all">
                        Utilisateurs
                    </button>

                    <button className="w-full text-white/80 hover:text-white hover:bg-white/5 rounded-2xl px-4 py-3 text-left transition-all">
                        Analytics
                    </button>

                    <button className="w-full text-white/80 hover:text-white hover:bg-white/5 rounded-2xl px-4 py-3 text-left transition-all">
                        Paramètres
                    </button>
                </nav>

                <div className="p-4 border-t border-white/10">
                    <Link
                        to="/"
                        className="block w-full text-center bg-amber text-indigo font-bold rounded-2xl px-4 py-3 hover:opacity-90 transition-all"
                    >
                        Retour au site
                    </Link>
                </div>
            </aside>

            <div className="flex-1 min-w-0">
                <header className="sticky top-0 z-40 bg-[#16181d]/95 backdrop-blur border-b border-white/10">
                    <div className="px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
                        <div>
                            <p className="text-white/50 text-sm">Administration</p>
                            <h1 className="text-2xl sm:text-3xl font-black text-white">
                                Gestion des biens
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="hidden sm:inline-flex bg-white/5 text-white/80 border border-white/10 rounded-xl px-4 py-2.5 hover:bg-white/10 transition-all">
                                Exporter
                            </button>
                            <button className="bg-amber text-indigo rounded-xl px-4 sm:px-5 py-2.5 font-bold shadow-lg hover:opacity-90 transition-all">
                                + Ajouter un bien
                            </button>
                        </div>
                    </div>
                </header>

                <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
                    <section className="bg-[#1d2027] border border-white/10 rounded-[28px] p-6 sm:p-8 shadow-2xl">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div className="max-w-3xl">
                                <p className="text-white/50 text-sm mb-3">Tâche principale</p>
                                <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-4">
                                    S'occuper de la page gestion des biens
                                </h2>

                                <div className="flex flex-wrap gap-3 mb-6">
                                    <button className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-all">
                                        + Ajouter
                                    </button>
                                    <button className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-all">
                                        Dates
                                    </button>
                                    <button className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-all">
                                        Checklist
                                    </button>
                                    <button className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-all">
                                        Pièce jointe
                                    </button>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                                    <div>
                                        <p className="text-white/50 text-sm mb-3">Membres</p>
                                        <div className="flex items-center -space-x-3">
                                            <div className="h-11 w-11 rounded-full bg-indigo border-2 border-[#1d2027] flex items-center justify-center font-bold">
                                                LA
                                            </div>
                                            <div className="h-11 w-11 rounded-full bg-amber text-indigo border-2 border-[#1d2027] flex items-center justify-center font-bold">
                                                YM
                                            </div>
                                            <button className="h-11 w-11 rounded-full bg-white/5 border-2 border-[#1d2027] flex items-center justify-center text-white/70 hover:bg-white/10 transition-all">
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-white/50 text-sm mb-3">Étiquettes</p>
                                        <div className="flex flex-wrap gap-2">
                                            <span className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-sm">
                                                HIGH
                                            </span>
                                            <span className="px-4 py-2 rounded-xl bg-fuchsia-700 text-white font-bold text-sm">
                                                FRONTEND
                                            </span>
                                            <span className="px-4 py-2 rounded-xl bg-pink-500 text-white font-bold text-sm">
                                                DEV
                                            </span>
                                            <button className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-all">
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:pt-2">
                                <button className="px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 transition-all">
                                    Modifier
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-white/60 text-sm mb-2">Description</p>
                            <p className="text-white/90 text-base sm:text-lg">
                                Page admin permettant d’ajouter, supprimer et modifier un bien,
                                avec gestion des statuts, recherche rapide et vue centralisée du parc immobilier.
                            </p>
                        </div>
                    </section>

                    <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="bg-[#1d2027] border border-white/10 rounded-3xl p-5 sm:p-6 shadow-xl"
                            >
                                <p className="text-amber text-2xl sm:text-3xl font-black mb-1">
                                    {stat.value}
                                </p>
                                <p className="text-white/65 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </section>

                    <section className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.9fr] gap-6">
                        <div className="bg-[#1d2027] border border-white/10 rounded-[28px] shadow-2xl overflow-hidden">
                            <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black">
                                        Liste des biens
                                    </h3>
                                    <p className="text-white/55 text-sm mt-1">
                                        Ajouter, modifier ou retirer un bien du réseau.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="text"
                                        placeholder="Rechercher un bien..."
                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/35 outline-none focus:ring-2 focus:ring-amber/40"
                                    />
                                    <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-amber/40">
                                        <option className="text-black">Tous statuts</option>
                                        <option className="text-black">Publié</option>
                                        <option className="text-black">En attente</option>
                                        <option className="text-black">Brouillon</option>
                                    </select>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[900px]">
                                    <thead className="bg-white/[0.03]">
                                    <tr className="text-left">
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/45 font-semibold">
                                            Référence
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/45 font-semibold">
                                            Bien
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/45 font-semibold">
                                            Type
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/45 font-semibold">
                                            Ville
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/45 font-semibold">
                                            Prix
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/45 font-semibold">
                                            Statut
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/45 font-semibold">
                                            Agence
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-white/45 font-semibold text-right">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {properties.map((property) => (
                                        <tr
                                            key={property.id}
                                            className="border-t border-white/10 hover:bg-white/[0.03] transition-all"
                                        >
                                            <td className="px-6 py-4 text-sm text-white/65">
                                                {property.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-white">
                                                    {property.title}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-white/75">
                                                {property.type}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-white/75">
                                                {property.city}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-white font-semibold">
                                                {property.price}
                                            </td>
                                            <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getStatusClasses(
                                                            property.status
                                                        )}`}
                                                    >
                                                        {property.status}
                                                    </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-white/75">
                                                {property.agency}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all">
                                                        Voir
                                                    </button>
                                                    <button className="px-3 py-2 rounded-xl bg-indigo text-white hover:bg-indigo/90 transition-all">
                                                        Modifier
                                                    </button>
                                                    <button className="px-3 py-2 rounded-xl bg-red-500/15 border border-red-400/20 text-red-300 hover:bg-red-500/20 transition-all">
                                                        Supprimer
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#1d2027] border border-white/10 rounded-[28px] p-6 shadow-2xl">
                                <h3 className="text-xl font-black mb-4">Actions rapides</h3>

                                <div className="space-y-3">
                                    <button className="w-full bg-amber text-indigo font-bold rounded-2xl px-4 py-3 hover:opacity-90 transition-all">
                                        Ajouter un bien
                                    </button>
                                    <button className="w-full bg-indigo text-white font-semibold rounded-2xl px-4 py-3 hover:bg-indigo/90 transition-all">
                                        Modifier un bien
                                    </button>
                                    <button className="w-full bg-white/5 border border-white/10 text-white/80 font-semibold rounded-2xl px-4 py-3 hover:bg-white/10 transition-all">
                                        Archiver un bien
                                    </button>
                                </div>
                            </div>

                            <div className="bg-[#1d2027] border border-white/10 rounded-[28px] p-6 shadow-2xl">
                                <h3 className="text-xl font-black mb-4">Checklist admin</h3>

                                <div className="space-y-3 text-sm">
                                    <label className="flex items-center gap-3 text-white/80">
                                        <input type="checkbox" className="accent-amber h-4 w-4" />
                                        Vérifier les informations du bien
                                    </label>
                                    <label className="flex items-center gap-3 text-white/80">
                                        <input type="checkbox" className="accent-amber h-4 w-4" />
                                        Contrôler les pièces jointes
                                    </label>
                                    <label className="flex items-center gap-3 text-white/80">
                                        <input type="checkbox" className="accent-amber h-4 w-4" />
                                        Valider le statut de publication
                                    </label>
                                    <label className="flex items-center gap-3 text-white/80">
                                        <input type="checkbox" className="accent-amber h-4 w-4" />
                                        Associer l’agence concernée
                                    </label>
                                </div>
                            </div>

                            <div className="bg-indigo rounded-[28px] p-6 shadow-2xl">
                                <p className="text-amber text-sm mb-2">Note système</p>
                                <p className="text-white/90 text-sm leading-relaxed">
                                    Cette interface est pensée pour centraliser la gestion
                                    des biens immobiliers sur une seule page, avec une lecture
                                    rapide et des actions immédiates.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default AdminPage