import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProfile } from '../../api/AuthApi';
import { useAuth } from '../../contexts/AuthContext';
function Header() {
    const [darkmode, setDarkmode] = useState<boolean>(
        (localStorage.getItem('data-theme') ?? 'dark') == 'dark'
    );
    const [state, setState] = useState<number>(0);
    const auth = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const toggleDarkMode = (darkmode: boolean) => {
        setDarkmode(darkmode);
        localStorage.setItem('data-theme', darkmode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', darkmode ? 'dark' : 'light');
    };
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', darkmode ? 'dark' : 'light');
        getProfile().then((response) => setIsAdmin(response.data.role === 'admin'));
    }, []);

    const ButtonText = ({ children }: { children: ReactNode }) => {
        return <b className="hover:text-t-hover">{children}</b>;
    };

    return (
        <div>
            {auth.user !== undefined ? (
                <div className="w-[100%] h-[50px] bg-bg-secondary">
                    <div className="flex flex-row h-[50px]">
                        <div className="flex flex-row w-[50px] my-auto mr-[20px]">
                            <div className="fixed top-[15px]">
                                <button className="flex flex-row">
                                    <div className="mr-[5px]"></div>
                                    <span
                                        className="material-symbols-outlined cursor-pointer select-none"
                                        onClick={() => setState(state == 2 ? 0 : 2)}>
                                        settings
                                    </span>
                                </button>
                                <button
                                    className="flex flex-row"
                                    onClick={() => {
                                        toggleDarkMode(!(darkmode ?? false));
                                        setState(0);
                                    }}>
                                    {state === 2 && (
                                        <ul className="relative w-[200px] mt-[20px] bg-bg-secondary translate-x-[-80%] p-3">
                                            {darkmode ?? false ? (
                                                <span className="material-symbols-outlined align-middle pr-[10px]">
                                                    light_mode
                                                </span>
                                            ) : (
                                                <span className="material-symbols-outlined align-middle pr-[10px]">
                                                    dark_mode
                                                </span>
                                            )}
                                            Toggle {darkmode ?? false ? 'light' : 'dark'} mode
                                        </ul>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row w-[50px] my-auto mr-[20px]">
                            <div className="fixed top-[15px]">
                                <button className="flex flex-row">
                                    <div className="mr-[5px]"></div>
                                    <span
                                        className="material-symbols-outlined  cursor-pointer select-none"
                                        onClick={() => setState(state == 3 ? 0 : 3)}>
                                        manage_accounts
                                    </span>
                                </button>
                                {state === 3 && (
                                    <ul className="relative w-[120px] mt-[20px] bg-bg-secondary translate-x-[-60%] p-3">
                                        <Link
                                            onClick={() => setState(0)}
                                            to="/profile"
                                            className="pb-1">
                                            <span className="material-symbols-outlined pr-3 align-middle">
                                                person
                                            </span>
                                            <div className="inline">Profile</div>
                                        </Link>
                                        <button
                                            className="pt-1"
                                            onClick={() => {
                                                auth.logout();
                                                setState(0);
                                            }}>
                                            <span className="material-symbols-outlined pr-3 align-middle">
                                                logout
                                            </span>
                                            <div className="inline">Logout</div>
                                        </button>
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-[100%] h-[50px] bg-bg-secondary static">
                    <div className="flex flex-row h-[inherit]">
                        <div className="w-[10%]"></div>
                        <div className="w-[80%]"></div>
                        <div className="flex flex-row w-[200px] my-auto">
                            <Link to="/login" className="align-middle pr-[30px]">
                                <ButtonText>Login</ButtonText>
                            </Link>
                            <Link to="/register" className="align-middle">
                                <ButtonText>Register</ButtonText>
                            </Link>
                        </div>
                        <div className="flex flex-row w-[50px] my-auto mr-[20px]">
                            <div className="group fixed top-[15px]">
                                <button className="flex flex-row">
                                    <div className="mr-[5px]"></div>
                                    <span className="material-symbols-outlined">settings</span>
                                </button>
                                <button
                                    className="flex flex-row"
                                    onClick={() => toggleDarkMode(!(darkmode ?? false))}>
                                    <ul className="hidden group-hover:block relative w-[200px] mt-[20px] bg-bg-secondary translate-x-[-80%] p-3">
                                        {darkmode ?? false ? (
                                            <span className="material-symbols-outlined align-middle pr-[10px]">
                                                light_mode
                                            </span>
                                        ) : (
                                            <span className="material-symbols-outlined align-middle pr-[10px]">
                                                dark_mode
                                            </span>
                                        )}
                                        Toggle {darkmode ?? false ? 'light' : 'dark'} mode
                                    </ul>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Header;
