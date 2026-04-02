import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import AboutPage from './pages/about'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path={"/about"} element={<AboutPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App