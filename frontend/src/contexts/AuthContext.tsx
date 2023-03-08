import React, { useState, useContext, createContext, useEffect, useMemo } from 'react';
import { getProfile, login, logout } from '../api/AuthApi';
import { UserGet, UserLogin } from '../models/User';

export default interface AuthContextProps {
    user?: UserGet;
    loading: boolean;
    login: (loginData: UserLogin) => Promise<string>;
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
                setUser(result.data === '' ? undefined : result.data);
            })
            .finally(() => setLoadingInitial(false));
    }, []);

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
            logout: handleLogout
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
