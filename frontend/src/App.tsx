import React from 'react';
import AppRoutes from './components/routing/AppRoutes';
import SearchBar from './components/searchBar/SearchBar.component';

function App() {
    return (
        <div className="bg-bg-primary h-[100vh] w-full">
            <AppRoutes />
            <SearchBar />
        </div>
    );
}


export default App;
