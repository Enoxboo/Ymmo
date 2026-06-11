import { getToken } from './auth'

const API_URL = import.meta.env.VITE_API_URL

export async function getProperties({ q = '', type = 'Tous', city = '', page = 1, take = 12 } = {}) {
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

export async function createProperty(data) {
    const token = getToken()

    const response = await fetch(`${API_URL}/properties`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })

    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.error || 'Impossible de créer le bien')
    }

    return json
}

export async function updateProperty(id, data) {
    const token = getToken()

    const response = await fetch(`${API_URL}/properties/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    })

    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.error || 'Impossible de mettre à jour le bien')
    }

    return json
}

export async function deleteProperty(id) {
    const token = getToken()

    const response = await fetch(`${API_URL}/properties/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    if (!response.ok) {
        let errorMessage = 'Impossible de supprimer le bien'
        try {
            const json = await response.json()
            if (json?.error) errorMessage = json.error
        } catch {
        }
        throw new Error(errorMessage)
    }

    return true
}