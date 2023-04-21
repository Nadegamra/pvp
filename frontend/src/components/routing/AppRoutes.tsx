import { Route, Routes } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import ProfilePage from '../../pages/ProfilePage';
import LenderRegisterPage from '../../pages/LenderRegisterPage';
import AppRoute from './AppRoute';
import BorrowerRegisterPage from '../../pages/BorrowerRegisterPage';
import RegistrationApprovePage from '../../pages/RegistrationApprovePage';
import FAQPage from '../../pages/FAQPage';
import ContactInfoPage from '../../pages/ContactInfoPage';

export default function AppRoutes() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contacts" element={<ContactInfoPage />} />
            <Route element={<AppRoute condition={user === undefined} redirectionPath="/" />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<LenderRegisterPage />} />
            </Route>
            <Route element={<AppRoute condition={user !== undefined} redirectionPath="/login" />}>
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route
                element={<AppRoute condition={user?.role === 'admin'} redirectionPath="/login" />}>
                <Route path="/registerCompany" element={<BorrowerRegisterPage />} />
                <Route path="/approveCompany" element={<RegistrationApprovePage />} />
            </Route>
        </Routes>
    );
}
