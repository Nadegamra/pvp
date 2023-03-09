import React, { useState, useContext, createContext, useEffect, useMemo } from 'react';
import { getProfile, login, logout, register } from '../api/AuthApi';
import { UserGet, UserLogin, UserRegister } from '../models/User';

export default interface AuthContextProps {
    user?: UserGet;
    loading: boolean;
    login: (loginData: UserLogin) => Promise<string>;
    register: (registerData: UserRegister) => Promise<string>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserGet>();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    useEffect(() => {
        getProfile()
            .then((result) => {
                if (result.data === ''){
                    setUser(new UserGet(0, '', '', '', '', '', false));
                }
                else{
                    setUser(result.data);
                }
                
            })
            .finally(() => setLoadingInitial(false));
    }, [loading]);

    async function handleLogin(loginData: UserLogin): Promise<string> {
        setLoading(true);

        return login(loginData)
            .then((result) => {
                setUser(result.data);
                setLoading(false);
                window.location.href = '/profile';
                return '';
            })
            .catch((error) => {
                setUser(undefined);
                setLoading(false);
                console.log(error);
                return error.response === undefined ? error.message : error.response.data;
            });
    }

    async function handleRegister(registerData: UserRegister): Promise<string> {
        setLoading(true);
        return register(registerData)
            .then((result) => {
                setUser(result.data);
                setLoading(false);
                return '';
            })
            .catch((error) => {
                setUser(undefined);
                setLoading(false);
                return error.response.data === undefined ? error.message : error.response.data;
            });
    }

    function handleLogout() {
        logout()
            .then(() => {
                setUser(undefined);
            })
            .finally(() => (window.location.href = '/login'));
    }

    const memoedValue = useMemo(
        () => ({
            user,
            loading,
            login: handleLogin,
            logout: handleLogout,
            register: handleRegister
        }),
        [user, loading]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);


