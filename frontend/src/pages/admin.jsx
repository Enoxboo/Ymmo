import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'

function AdminPage() {
    const properties = [
        {
            id: 'BIEN-001',
            title: 'Appartement T3 - Marseille 6e',
            type: 'Appartement',
            city: 'Marseille',
            price: '325 000 €',
            status: 'Publié',
            agency: 'Ymmo Marseille',
        },
        {
            id: 'BIEN-002',
            title: 'Local commercial - Aix-en-Provence',
            type: 'Local commercial',
            city: 'Aix-en-Provence',
            price: '540 000 €',
            status: 'En attente',
            agency: 'Ymmo Aix',
        },
        {
            id: 'BIEN-003',
            title: 'Maison 5 pièces - Lyon',
            type: 'Maison',
            city: 'Lyon',
            price: '610 000 €',
            status: 'Brouillon',
            agency: 'Ymmo Lyon',
        },
        {
            id: 'BIEN-004',
            title: 'Studio T1 - Talence',
            type: 'Studio',
            city: 'Talence',
            price: '148 000 €',
            status: 'Publié',
            agency: 'Ymmo Talence',
        },
    ]

    const getStatusClasses = (status) => {
        switch (status) {
            case 'Publié':
                return 'bg-green-100 text-green-700'
            case 'En attente':
                return 'bg-amber/30 text-indigo'
            case 'Brouillon':
                return 'bg-indigo/10 text-indigo/70'
            default:
                return 'bg-indigo/10 text-indigo/70'
        }
    }

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
            <header className="bg-amber h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shadow-xl sticky top-0 z-50">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Ymmo" className="h-9 sm:h-10 lg:h-12 w-auto" />
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/"
                        className="hidden sm:inline-block text-indigo font-semibold hover:opacity-80 transition-all"
                    >
                        Retour au site
                    </Link>
                </div>
            </header>

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="max-w-7xl mx-auto space-y-8">
                    <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-indigo leading-tight">
                            Gestion des biens
                        </h1>
                    </section>

                    <section className="w-full">
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full">
                            <div className="p-6 sm:p-8 border-b border-indigo/10 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
                                <div>
                                    <h2 className="text-2xl font-black text-indigo mb-1">
                                        Liste des biens
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="text"
                                            placeholder="Rechercher un bien..."
                                            className="bg-snow border border-indigo/10 rounded-2xl px-4 py-3 text-indigo placeholder:text-indigo/40 outline-none focus:ring-2 focus:ring-amber/40"
                                        />
                                        <select className="bg-snow border border-indigo/10 rounded-2xl px-4 py-3 text-indigo outline-none focus:ring-2 focus:ring-amber/40">
                                            <option>Tous statuts</option>
                                            <option>Publié</option>
                                            <option>En attente</option>
                                            <option>Brouillon</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 xl:justify-end">
                                        <button className=" bg-amber text-indigo px-4 py-3 rounded-2xl font-bold hover:bg-indigo/90 transition-all">
                                            Ajouter un bien
                                        </button>
                                        <button className=" bg-indigo text-white px-4 py-3 rounded-2xl font-bold hover:opacity-90 transition-all">
                                            Modifier un bien
                                        </button>
                                        <button className="bg-red-700 text-snow px-4 py-3 rounded-2xl font-semibold hover:bg-red-800 transition-all">
                                            Supprimer un bien
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[860px] table-auto">
                                    <thead className="bg-snow">
                                    <tr className="text-left">
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-indigo/50 font-semibold">
                                            Référence
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-indigo/50 font-semibold">
                                            Bien
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-indigo/50 font-semibold">
                                            Type
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-indigo/50 font-semibold">
                                            Ville
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-indigo/50 font-semibold">
                                            Prix
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-indigo/50 font-semibold">
                                            Statut
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-indigo/50 font-semibold">
                                            Agence
                                        </th>
                                        <th className="px-6 py-4 text-xs uppercase tracking-wider text-indigo/50 font-semibold text-right">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {properties.map((property) => (
                                        <tr
                                            key={property.id}
                                            className="border-t border-indigo/10 hover:bg-snow transition-all"
                                        >
                                            <td className="px-6 py-4 text-sm text-indigo/70">
                                                {property.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-indigo">
                                                    {property.title}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-indigo/75">
                                                {property.type}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-indigo/75">
                                                {property.city}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-indigo">
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
                                            <td className="px-6 py-4 text-sm text-indigo/75">
                                                {property.agency}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-2">
                                                    <button className="px-3 py-2 rounded-xl bg-snow text-indigo font-medium hover:bg-indigo/5 transition-all">
                                                        Voir
                                                    </button>
                                                    <button className="px-3 py-2 rounded-xl bg-indigo text-white font-medium hover:bg-indigo/90 transition-all">
                                                        Modifier
                                                    </button>
                                                    <button className="px-3 py-2 rounded-xl bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-all">
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
                    </section>
                </div>
            </main>

            <footer className="bg-indigo text-white/70 text-xs text-center py-6 mt-12">
                © {new Date().getFullYear()} Ymmo — Tous droits réservés
            </footer>
        </div>
    )
}

export default AdminPage