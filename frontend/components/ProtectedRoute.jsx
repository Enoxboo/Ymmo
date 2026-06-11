import { Navigate } from 'react-router-dom'
import { getUser } from '../src/services/auth'

function ProtectedRoute({ children, requiredRole = 'ADMIN' }) {
    const user = getUser()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (user.role === 'SUPER_ADMIN') {
        return children
    }

    if (requiredRole && user.role !== requiredRole) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute