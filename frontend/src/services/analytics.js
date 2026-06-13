const API_URL = import.meta.env.VITE_API_URL

export async function getWhereToBuyStats() {
    const res = await fetch(`${API_URL}/analytics/where-to-buy`)
    if (!res.ok) {
        throw new Error('Impossible de charger les statistiques des zones')
    }
    return await res.json()
}

export async function getMostExpensiveCities() {
    const res = await fetch(`${API_URL}/analytics/average-price-by-city`)
    if (!res.ok) {
        throw new Error('Impossible de charger les villes les plus chères')
    }
    return await res.json()
}