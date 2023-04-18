import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

interface HeaderContextProps {
    settingsShown: boolean;
    profileShown: boolean;
    showSettings: () => void;
    showProfile: () => void;
    hideAll: () => void;
}

const HeaderContext = createContext<HeaderContextProps>({} as HeaderContextProps);

export function HeaderProvider({ children }: { children: ReactNode }) {
    const [settingsShown, setSettingsShown] = useState<boolean>(false);
    const [profileShown, setProfileShown] = useState<boolean>(false);

    useEffect(() => {
        hideAll();
    }, []);

    function showSettings() {
        setSettingsShown(true);
        setProfileShown(false);
    }

    function showProfile() {
        setSettingsShown(false);
        setProfileShown(true);
    }

    function hideAll() {
        setSettingsShown(false);
        setProfileShown(false);
    }

    const memoedValue = useMemo(
        () => ({
            settingsShown,
            profileShown,
            showSettings,
            showProfile,
            hideAll
        }),
        [settingsShown, profileShown]
    );

    return <HeaderContext.Provider value={memoedValue}>{children}</HeaderContext.Provider>;
}

export const useHeader = () => useContext(HeaderContext);
