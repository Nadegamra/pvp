import React, { useState, useContext, createContext, useEffect, useMemo } from 'react';
import { getProfile, login, logout } from '../api/AuthApi';
import { UserGet, UserLogin } from '../models/User';

export default interface AuthContextProps {
    user?: UserGet;
    loading: boolean;
    login: (loginData: UserLogin) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    loading: false,
    login: (loginData: UserLogin) => null,
    logout: () => null
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserGet>();
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

    useEffect(() => {
        getProfile()
            .then((result) => {
                setUser(result.data ?? undefined);
            })
            .finally(() => setLoadingInitial(false));
    }, []);

    async function handleLogin(loginData: UserLogin) {
        setLoading(true);

        return login(loginData)
            .then((result) => {
                setUser(result.data);
                setLoading(false);
                location.reload();
                return '';
            })
            .catch((error) => {
                setUser(undefined);
                setLoading(false);
                return error.response.data;
            });
    }

    async function handleLogout() {
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
        [user]
    );

    return (
        <AuthContext.Provider value={memoedValue}>
            {!loadingInitial && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
