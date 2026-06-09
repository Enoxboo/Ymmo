import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import AboutPage from './pages/about'
import BienPage from './pages/bien.jsx'
import AdminPage from './pages/admin.jsx'
import HomePage from './pages/homepage'
import BienAllPage from './pages/bien-all'
import ProtectedRoute from '../components/ProtectedRoute'

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

                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                    <Route path="/admin" element={<AdminPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App