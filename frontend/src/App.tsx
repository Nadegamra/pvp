import React from 'react';
import SearchBar from './components/routing/SearchBar.component';
import AppRoutes from './components/routing/AppRoutes';

function App() {
    return (
        <div className="bg-bg-primary h-[100vh] w-full">
            <AppRoutes />
            <SearchBar />
        </div>
    );
}


export default App;
