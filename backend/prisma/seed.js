import { apiFetch } from './api'

export async function getAgencies() {
    return apiFetch('/api/agencies')
}