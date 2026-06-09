const API_URL = import.meta.env.VITE_API_URL

export async function registerUser(payload) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de l’inscription')
    }

    return data
}

export async function loginUser(payload) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la connexion')
    }

    return data
}

export async function getAdminDashboard(token) {
    const response = await fetch(`${API_URL}/admin/dashboard`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Impossible de charger le dashboard admin')
    }

    return data
}

export function saveAuth(data) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
}

export function getToken() {
    return localStorage.getItem('token')
}

export function getUser() {
    try {
        const raw = localStorage.getItem('user')
        return raw ? JSON.parse(raw) : null
    } catch {
        return null
    }
}

export function isAuthenticated() {
    return !!localStorage.getItem('token')
}

export function logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}