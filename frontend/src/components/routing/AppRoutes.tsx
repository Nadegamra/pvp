import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProfilePage from '../pages/ProfilePage';
import RegisterPage from '../pages/RegisterPage';
import AppRoute from './AppRoute';

export default function AppRoutes() {
    const isLoggedIn = false;
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<AppRoute condition={!isLoggedIn} redirectionPath="/" />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<AppRoute condition={isLoggedIn} redirectionPath="/login" />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
}
