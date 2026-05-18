import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import AboutPage from './pages/about'
import BienPage from "./pages/bien.jsx";
import AdminPage from "./pages/admin.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path={"/about"} element={<AboutPage />} />
                <Route path={"/bien"} element={<BienPage />} />
                <Route path="/admin" element={<AdminPage />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App