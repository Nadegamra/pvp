import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useHeader } from '../../contexts/HeaderContext';

function Header() {
    const [darkmode, setDarkmode] = useState<boolean>(
        (localStorage.getItem('data-theme') ?? 'dark') == 'dark'
    );
    const auth = useAuth();
    const toggleDarkMode = (darkmode: boolean) => {
        setDarkmode(darkmode);
        localStorage.setItem('data-theme', darkmode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', darkmode ? 'dark' : 'light');
    };

    const ButtonText = ({ children }: { children: ReactNode }) => {
        return <b className="hover:text-t-hover text-fs-h2">{children}</b>;
    };

    const header = useHeader();

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            localStorage.getItem('data-theme') ?? 'dark'
        );
    }, []);

    return (
        <div>
            <div className="h-[50px] bg-bg-secondary flex">
                <Link
                    to="/"
                    className="pl-3 cursor-pointer select-none my-auto"
                    onClick={() => header.hideAll()}>
                    <ButtonText>Home</ButtonText>
                </Link>
                <div className="flex-1" onClick={() => header.hideAll()}></div>
                <Link
                    to="/contacts"
                    className="cursor-pointer select-none my-auto mr-7"
                    onClick={() => header.hideAll()}>
                    <ButtonText>Contacts</ButtonText>
                </Link>
                <Link
                    to="/faq"
                    className="cursor-pointer select-none my-auto mr-7"
                    onClick={() => header.hideAll()}>
                    <ButtonText>FAQ</ButtonText>
                </Link>
                {auth.user === undefined && (
                    <Link
                        to="/login"
                        className="cursor-pointer select-none my-auto mr-7"
                        onClick={() => header.hideAll()}>
                        <ButtonText>Login</ButtonText>
                    </Link>
                )}
                {auth.user === undefined && (
                    <Link
                        to="/register"
                        className="cursor-pointer select-none my-auto mr-7"
                        onClick={() => header.hideAll()}>
                        <ButtonText>Register</ButtonText>
                    </Link>
                )}
                <div className="mr-7 my-auto">
                    <span
                        className="material-symbols-outlined cursor-pointer select-none"
                        onClick={() =>
                            header.settingsShown ? header.hideAll() : header.showSettings()
                        }>
                        settings
                    </span>
                    {header.settingsShown && (
                        <div
                            className="fixed mt-5 translate-x-[-180px] w-[190px] bg-bg-secondary p-3 rounded-lg"
                            onClick={() => {
                                toggleDarkMode(!darkmode);
                            }}>
                            <span className="material-symbols-outlined align-middle pr-3 cursor-pointer select-none">
                                {darkmode ?? false ? 'light_mode' : 'dark_mode'}
                            </span>
                            <span className="cursor-pointer select-none">
                                Toggle {darkmode ?? false ? 'light' : 'dark'} mode
                            </span>
                        </div>
                    )}
                </div>
                {auth.user !== undefined && (
                    <div className="mr-7 my-auto">
                        <button>
                            <span
                                className="material-symbols-outlined  cursor-pointer select-none"
                                onClick={() =>
                                    header.profileShown ? header.hideAll() : header.showProfile()
                                }>
                                manage_accounts
                            </span>
                        </button>
                        {header.profileShown && (
                            <div className="fixed mt-5 translate-x-[-110px] w-[120px] bg-bg-secondary p-3 rounded-lg">
                                <Link
                                    onClick={() => header.hideAll()}
                                    to="/profile"
                                    className="pb-1">
                                    <span className="material-symbols-outlined align-middle pr-3 cursor-pointer select-none">
                                        person
                                    </span>
                                    <span className="cursor-pointer select-none">Profile</span>
                                </Link>
                                <button
                                    className="pt-1"
                                    onClick={() => {
                                        auth.logout();
                                        header.hideAll();
                                    }}>
                                    <span className="material-symbols-outlined pr-3 align-middle">
                                        logout
                                    </span>
                                    <span className="cursor-pointer select-none">Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
