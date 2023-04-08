import { Route, Routes } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import ProfilePage from '../../pages/ProfilePage';
import CustomerRegisterPage from '../../pages/CustomerRegisterPage';
import AppRoute from './AppRoute';
import CompanyRegisterPage from '../../pages/CompanyRegisterPage';
import RegistrationApprovePage from '../../pages/RegistrationApprovePage';

export default function AppRoutes() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route element={<AppRoute condition={user === undefined} redirectionPath="/" />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<CustomerRegisterPage />} />
            </Route>
            <Route element={<AppRoute condition={user !== undefined} redirectionPath="/login" />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route
                element={<AppRoute condition={user?.role === 'admin'} redirectionPath="/login" />}>
                <Route path="/registerCompany" element={<CompanyRegisterPage />} />
                <Route path="/approveCompany" element={<RegistrationApprovePage />} />
            </Route>
            
        </Routes>
    );
}
