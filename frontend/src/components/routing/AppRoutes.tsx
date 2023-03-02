import { Route, Routes } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import ProfilePage from '../../pages/ProfilePage';
import RegisterPage from '../../pages/RegisterPage';
import AppRoute from './AppRoute';

export default function AppRoutes() {
    const { user } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<AppRoute condition={user === undefined} redirectionPath="/" />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<AppRoute condition={user !== undefined} redirectionPath="/login" />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
}
