import { getToken } from './auth'

const API_URL = import.meta.env.VITE_API_URL

export async function uploadFile(file) {
    const token = getToken()
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error || 'Impossible de téléverser le fichier')
    }

    return data // { url, filename }
}