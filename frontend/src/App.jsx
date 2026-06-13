import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import AboutPage from './pages/about'
import BienPage from './pages/bien'
import AdminPage from './pages/admin'
import HomePage from './pages/homepage'
import BienAllPage from './pages/bien-all'
import AdminUsersPage from './pages/admin-users'
import AdminPropertiesPage from './pages/admin-properties'
import ProtectedRoute from '../components/ProtectedRoute'
import StatisticsPage from "./pages/statistics.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/biens" element={<BienAllPage />} />
                <Route path="/biens/:id" element={<BienPage />} />
                <Route path="/statistiques" element={<StatisticsPage />} />


                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <AdminUsersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/properties"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <AdminPropertiesPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App