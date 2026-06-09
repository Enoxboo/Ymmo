const API_URL = import.meta.env.VITE_API_URL

export async function getProperties({ q = '', type = 'Tous', city = '', page = 1, take = 8 } = {}) {
    const skip = (page - 1) * take
    const params = new URLSearchParams()

    if (q) params.append('q', q)
    if (type && type !== 'Tous') params.append('type', type)
    if (city) params.append('city', city)
    params.append('skip', String(skip))
    params.append('take', String(take))

    const response = await fetch(`${API_URL}/properties?${params.toString()}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Impossible de charger les biens')
    }

    return data
}

export async function getPropertyById(id) {
    const response = await fetch(`${API_URL}/properties/${id}`)
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Impossible de charger le bien')
    }

    return data
}