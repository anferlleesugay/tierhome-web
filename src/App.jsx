import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Register from './pages/Register';
import Properties from './pages/Properties';
import AddProperty from './pages/AddProperty';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/properties" element={<PrivateRoute><Properties /></PrivateRoute>} />
                <Route path="/add-property" element={<PrivateRoute><AddProperty /></PrivateRoute>} />
            </Routes>
        </BrowserRouter>
    );
}