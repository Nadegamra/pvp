import React from 'react'
import Header from './components/header/Header'
import AppRoutes from './components/routing/AppRoutes'
import { useHeader } from './contexts/HeaderContext'

function App() {
    const header = useHeader()

    return (
        <div className="flex flex-col bg-bg-primary text-t-primary min-h-[100vh]">
            <div className="sticky top-0 z-50">
                <Header />
            </div>
            <div id="container" className="flex-1" onClick={() => header.hideAll()}>
                <AppRoutes />
            </div>
        </div>
    )
}

export function getContainerHeight() {
    return (
        window.innerHeight -
        (document.getElementById('header')?.clientHeight ?? 0) -
        (document.getElementById('adminUserConsolesButtons')?.clientHeight ?? 0)
    )
}

export default App
