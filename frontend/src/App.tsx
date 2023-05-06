import React from 'react'
import Header from './components/header/Header'
import AppRoutes from './components/routing/AppRoutes'
import { useHeader } from './contexts/HeaderContext'

function App() {
    const header = useHeader()

    return (
        <div className="flex flex-col bg-bg-primary text-t-primary min-h-[100vh]">
            <div className="sticky top-0">
                <Header />
            </div>
            <div className="flex-1" onClick={() => header.hideAll()}>
                <AppRoutes />
            </div>
            {/* <div onClick={() => header.hideAll()}>
                <Footer />
            </div> */}
        </div>
    )
}

export default App
