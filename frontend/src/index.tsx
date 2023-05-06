import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import 'tw-elements'
import { HeaderProvider } from './contexts/HeaderContext'

import './components/languages/I18n'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    // <React.StrictMode>
    <AuthProvider>
        <HeaderProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </HeaderProvider>
    </AuthProvider>
    // </React.StrictMode>
)
