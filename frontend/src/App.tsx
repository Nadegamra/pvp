import React from 'react';
import Header from './components/header/Header';
import AppRoutes from './components/routing/AppRoutes';
import { useHeader } from './contexts/HeaderContext';

function App() {
    const header = useHeader();

    return (
        <div className="h-[100vh]">
            <div className="bg-bg-primary text-t-primary min-h-full">
                <div className="sticky top-0">
                    <Header />
                </div>
                <div onClick={() => header.hideAll()}>
                    <AppRoutes />
                </div>
                <div className="sticky bottom-0"></div>
            </div>
        </div>
    );
}

export default App;
