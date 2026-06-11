import { getToken } from './auth'

const API_URL = import.meta.env.VITE_API_URL

export async function getUsers({ page = 1, take = 20 } = {}) {
    const skip = (page - 1) * take
    const token = getToken()

    const response = await fetch(`${API_URL}/users?skip=${skip}&take=${take}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Impossible de charger les utilisateurs')
    }

    return data
}

export async function updateUserRole(id, role) {
    const token = getToken()

    const response = await fetch(`${API_URL}/users/${id}/role`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Impossible de mettre à jour le rôle')
    }

    return data
}

export async function deleteUser(id) {
    const token = getToken()

    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Impossible de supprimer l’utilisateur')
    }

    return data
}