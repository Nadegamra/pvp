import { Route, Routes } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import ProfilePage from '../../pages/ProfilePage'
import LenderRegisterPage from '../../pages/LenderRegisterPage'
import AppRoute from './AppRoute'
import BorrowerRegisterPage from '../../pages/BorrowerRegisterPage'
import RegistrationApprovePage from '../../pages/RegistrationApprovePage'
import FAQPage from '../../pages/FAQPage'
import ContactInfoPage from '../../pages/ContactInfoPage'
import ConsolesManagementPage from '../../pages/ConsolesManagementPage'
import ConsoleManagementPage from '../../pages/ConsoleManagementPage'
import CreateConsolePage from '../../pages/CreateConsolePage'
import UserConsolesPage from '../../pages/UserConsolesPage'
import UserConsolePage from '../../pages/UserConsolePage'
import EmailConfirmationPage from '../../pages/EmailConfirmationPage'
import EmailChangePage from '../../pages/EmailChangePage'
import UserConsolesCreatePage from '../../pages/UserConsolesCreatePage'
import ChatsPage from '../../pages/ChatsPage'
import BorrowingsPage from '../../pages/BorrowingsPage'

export default function AppRoutes() {
    const { user } = useAuth()

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contacts" element={<ContactInfoPage />} />
            <Route path="/changeEmail/:token" element={<EmailChangePage />} />
            <Route element={<AppRoute condition={user === undefined} redirectionPath="/" />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<LenderRegisterPage />} />
                <Route path="/registerBorrower" element={<BorrowerRegisterPage />} />
                <Route path="/confirmEmail/:token" element={<EmailConfirmationPage />} />
            </Route>
            <Route element={<AppRoute condition={user !== undefined} redirectionPath="/" />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/chats" element={<ChatsPage />} />
                <Route path="/chats/:id" element={<ChatsPage />} />
            </Route>
            <Route element={<AppRoute condition={user?.role === 'admin'} redirectionPath="/" />}>
                <Route path="/approveRegistrations" element={<RegistrationApprovePage />} />
                <Route path="/manageConsoles" element={<ConsolesManagementPage />} />
                <Route path="/manageConsoles/:id" element={<ConsoleManagementPage />} />
                <Route path="/manageConsoles/new" element={<CreateConsolePage />} />
                <Route path="/userConsoles" element={<UserConsolesPage />} />
                <Route path="/userConsoles/:id" element={<UserConsolePage />} />
            </Route>
            <Route element={<AppRoute condition={user?.role === 'lender'} redirectionPath="/" />}>
                <Route path="/consoles" element={<UserConsolesPage />} />
                <Route path="/consoles/:id" element={<UserConsolePage />} />
                <Route path="/consoles/new" element={<UserConsolesCreatePage />} />
            </Route>
            <Route element={<AppRoute condition={user?.role === 'borrower'} redirectionPath="/" />}>
                <Route path="/borrowings" element={<BorrowingsPage />} />
                <Route path="/borrowings/:id" element={<UserConsolePage />} />
            </Route>
        </Routes>
    )
}
