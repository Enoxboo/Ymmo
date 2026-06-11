// src/services/agencies.js
import { getToken } from './auth'

const API_URL = import.meta.env.VITE_API_URL

export async function getAgencies() {
    const token = getToken()

    const response = await fetch(`${API_URL}/agencies`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Impossible de charger les agences')
    }

    return data
}