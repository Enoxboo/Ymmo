import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.webp'
import { getUser, logoutUser } from '../services/auth'
import {
    getProperties,
    createProperty,
    updateProperty,
    deleteProperty,
} from '../services/properties'
import { getAgencies } from '../services/agencies'
import { uploadFile } from '../services/upload'

function AdminPropertiesPage() {
    const navigate = useNavigate()
    const currentUser = getUser()

    const [properties, setProperties] = useState([])
    const [agencies, setAgencies] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [query, setQuery] = useState('')
    const PAGE_SIZE = 10

    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({
        title: '',
        price: '',
        city: '',
        postalCode: '',
        surface: '',
        rooms: '',
        available: true,
        type: 'APPARTEMENT',
        photoUrls: '',
        agencyId: '',
        description: '',
        bedrooms: '',
        bathrooms: '',
        floor: '',
        dpe: '',
    })

    useEffect(() => {
        async function load() {
            try {
                setLoading(true)
                setError('')

                const data = await getProperties({
                    q: query,
                    page,
                    take: PAGE_SIZE,
                })
                setProperties(data)

                const agenciesData = await getAgencies()
                setAgencies(agenciesData)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [page, query])

    function handleLogout() {
        logoutUser()
        navigate('/login')
    }

    function resetForm() {
        setForm({
            title: '',
            price: '',
            city: '',
            postalCode: '',
            surface: '',
            rooms: '',
            available: true,
            type: 'APPARTEMENT',
            photoUrls: '',
            agencyId: '',
            description: '',
            bedrooms: '',
            bathrooms: '',
            floor: '',
            dpe: '',
        })
        setEditing(null)
    }

    function startEdit(property) {
        setEditing(property)
        setForm({
            title: property.title || '',
            price: property.price || '',
            city: property.city || '',
            postalCode: property.postalCode || '',
            surface: property.surface || '',
            rooms: property.rooms || '',
            available: property.available,
            type: property.type,
            photoUrls: '',
            agencyId: property.agencyId || '',
            description: property.description || '',
            bedrooms: property.bedrooms ?? '',
            bathrooms: property.bathrooms ?? '',
            floor: property.floor ?? '',
            dpe: property.dpe || '',
        })
    }

    function handleChange(e) {
        const { name, value, type, checked } = e.target

        // Spécifique au code postal : on garde uniquement les chiffres, max 5
        if (name === 'postalCode') {
            const onlyDigits = value.replace(/\D/g, '').slice(0, 5)
            setForm((prev) => ({
                ...prev,
                postalCode: onlyDigits,
            }))
            return
        }

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    async function handleFileChange(e) {
        const file = e.target.files[0]
        if (!file) return

        try {
            setUploading(true)
            setError('')
            const result = await uploadFile(file)
            setForm((prev) => ({
                ...prev,
                photoUrls: prev.photoUrls
                    ? prev.photoUrls + '\n' + result.url
                    : result.url,
            }))
        } catch (err) {
            setError(err.message)
        } finally {
            setUploading(false)
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')

            const photoUrls = form.photoUrls
                .split('\n')
                .map((u) => u.trim())
                .filter((u) => u.length > 0)

            const payload = {
                title: form.title,
                price: Number(form.price),
                city: form.city,
                postalCode: form.postalCode,
                surface: Number(form.surface),
                rooms: Number(form.rooms),
                available: form.available,
                type: form.type,
                photos: photoUrls,
                agencyId: form.agencyId ? Number(form.agencyId) : undefined,
                description: form.description,
                bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
                bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
                floor: form.floor !== '' ? Number(form.floor) : null,
                dpe: form.dpe || null,
            }

            if (editing) {
                const updated = await updateProperty(editing.id, payload)
                setProperties((prev) =>
                    prev.map((p) => (p.id === editing.id ? { ...p, ...updated } : p)),
                )
            } else {
                const created = await createProperty(payload)
                setProperties((prev) => [created, ...prev])
            }

            resetForm()
        } catch (err) {
            setError(err.message)
        }
    }

    async function handleDelete(id) {
        if (!window.confirm('Supprimer ce bien ?')) return
        try {
            setError('')
            await deleteProperty(id)
            setProperties((prev) => prev.filter((p) => p.id !== id))
        } catch (err) {
            setError(err.message)
        }
    }

    function goToPage(n) {
        setPage(Math.max(1, n))
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(price)
    }

    return (
        <div className="min-h-screen bg-snow font-sans antialiased flex flex-col">
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
                        to="/admin"
                        className="hidden sm:inline-block text-indigo font-semibold hover:opacity-80 transition-all"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/"
                        className="hidden sm:inline-block text-indigo font-semibold hover:opacity-80 transition-all"
                    >
                        Retour au site
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="bg-indigo text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo/90 transition-all"
                    >
                        Déconnexion
                    </button>
                </div>
            </header>

            <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <div className="max-w-7xl mx-auto space-y-6">
                    <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                        <h1 className="text-3xl sm:text-4xl font-black text-indigo leading-tight">
                            Gestion des biens
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

                    {/* Formulaire de création / édition */}
                    <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                        <h2 className="text-xl font-black text-indigo mb-4">
                            {editing ? 'Modifier un bien' : 'Créer un bien'}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="title">
                                    Titre
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="price">
                                    Prix
                                </label>
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={form.price}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="city">
                                    Ville
                                </label>
                                <input
                                    id="city"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="postalCode">
                                    Code postal
                                </label>
                                <input
                                    id="postalCode"
                                    name="postalCode"
                                    value={form.postalCode}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="surface">
                                    Surface (m²)
                                </label>
                                <input
                                    id="surface"
                                    name="surface"
                                    type="number"
                                    value={form.surface}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="rooms">
                                    Pièces
                                </label>
                                <input
                                    id="rooms"
                                    name="rooms"
                                    type="number"
                                    value={form.rooms}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="type">
                                    Type
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                >
                                    <option value="APPARTEMENT">Appartement</option>
                                    <option value="MAISON">Maison</option>
                                    <option value="LOCAL">Local</option>
                                    <option value="TERRAIN">Terrain</option>
                                    <option value="AUTRE">Autre</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="agencyId">
                                    Agence
                                </label>
                                <select
                                    id="agencyId"
                                    name="agencyId"
                                    value={form.agencyId}
                                    onChange={handleChange}
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                >
                                    <option value="">Sélectionner une agence</option>
                                    {agencies.map((agency) => (
                                        <option key={agency.id} value={agency.id}>
                                            {agency.city} — {agency.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2 mt-4">
                                <input
                                    id="available"
                                    name="available"
                                    type="checkbox"
                                    checked={form.available}
                                    onChange={handleChange}
                                    className="h-4 w-4"
                                />
                                <label htmlFor="available" className="text-xs text-indigo/80">
                                    Disponible à la vente
                                </label>
                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="bedrooms">
                                    Chambres
                                </label>
                                <input
                                    id="bedrooms"
                                    name="bedrooms"
                                    type="number"
                                    value={form.bedrooms}
                                    onChange={handleChange}
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="bathrooms">
                                    Salles de bain
                                </label>
                                <input
                                    id="bathrooms"
                                    name="bathrooms"
                                    type="number"
                                    value={form.bathrooms}
                                    onChange={handleChange}
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="floor">
                                    Étage
                                </label>
                                <input
                                    id="floor"
                                    name="floor"
                                    type="number"
                                    value={form.floor}
                                    onChange={handleChange}
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="dpe">
                                    DPE
                                </label>
                                <select
                                    id="dpe"
                                    name="dpe"
                                    value={form.dpe}
                                    onChange={handleChange}
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                >
                                    <option value="">—</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="G">G</option>
                                </select>
                            </div>

                            {/* Upload fichier + URLs */}
                            <div className="md:col-span-2">
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="file">
                                    Ajouter une photo depuis votre ordinateur
                                </label>
                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full text-sm"
                                />
                                {uploading && (
                                    <p className="text-xs text-indigo/70 mt-1">
                                        Téléversement en cours...
                                    </p>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs text-indigo/70 mb-1" htmlFor="photoUrls">
                                    URLs des photos (une par ligne)
                                </label>
                                <textarea
                                    id="photoUrls"
                                    name="photoUrls"
                                    value={form.photoUrls}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                                    placeholder="https://...&#10;https://..."
                                />
                            </div>

                            <div className="md:col-span-2 flex gap-3 mt-4">
                                <button
                                    type="submit"
                                    className="bg-indigo text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo/90 transition-all"
                                >
                                    {editing ? 'Mettre à jour' : 'Créer'}
                                </button>
                                {editing && (
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="text-sm text-indigo/70 underline"
                                    >
                                        Annuler la modification
                                    </button>
                                )}
                            </div>
                        </form>
                    </section>

                    {/* Liste des biens */}
                    <section className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                            <h2 className="text-xl font-black text-indigo">Liste des biens</h2>
                            <input
                                type="search"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value)
                                    setPage(1)
                                }}
                                placeholder="Rechercher par titre, ville, code postal..."
                                className="w-full sm:w-64 border border-indigo/20 rounded-xl px-3 py-2 text-sm"
                            />
                        </div>

                        {loading ? (
                            <p className="text-indigo">Chargement des biens...</p>
                        ) : properties.length === 0 ? (
                            <p className="text-indigo/70">Aucun bien trouvé.</p>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full text-sm">
                                        <thead>
                                        <tr className="border-b border-indigo/10 text-left text-indigo/70">
                                            <th className="py-2 pr-4">ID</th>
                                            <th className="py-2 pr-4">Titre</th>
                                            <th className="py-2 pr-4">Ville</th>
                                            <th className="py-2 pr-4">Prix</th>
                                            <th className="py-2 pr-4">Surface</th>
                                            <th className="py-2 pr-4">Disponible</th>
                                            <th className="py-2 pr-4 text-right">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {properties.map((p) => (
                                            <tr key={p.id} className="border-b border-indigo/5">
                                                <td className="py-2 pr-4 text-indigo/70">{p.id}</td>
                                                <td className="py-2 pr-4 text-indigo font-medium">
                                                    {p.title}
                                                </td>
                                                <td className="py-2 pr-4 text-indigo/80">
                                                    {p.city} ({p.postalCode})
                                                </td>
                                                <td className="py-2 pr-4 text-indigo/80">
                                                    {formatPrice(p.price)}
                                                </td>
                                                <td className="py-2 pr-4 text-indigo/80">
                                                    {p.surface} m²
                                                </td>
                                                <td className="py-2 pr-4 text-indigo/80">
                                                    {p.available ? 'Oui' : 'Non'}
                                                </td>
                                                <td className="py-2 pr-4 text-right space-x-2">
                                                    <button
                                                        onClick={() => startEdit(p)}
                                                        className="text-xs text-indigo font-semibold hover:underline"
                                                    >
                                                        Modifier
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(p.id)}
                                                        className="text-xs text-red-600 font-semibold hover:underline"
                                                    >
                                                        Supprimer
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex items-center justify-between mt-4 text-sm text-indigo/70">
                                    <div>Page {page}</div>
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
                                            disabled={properties.length < PAGE_SIZE}
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

export default AdminPropertiesPage