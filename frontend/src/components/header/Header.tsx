import { ReactNode, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useHeader } from '../../contexts/HeaderContext'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'

function Header() {
    const { t, i18n } = useTranslation()
    const [darkmode, setDarkmode] = useState<boolean>(
        (localStorage.getItem('data-theme') ?? 'dark') == 'dark'
    )
    const auth = useAuth()
    const toggleDarkMode = (darkmode: boolean) => {
        setDarkmode(darkmode)
        localStorage.setItem('data-theme', darkmode ? 'dark' : 'light')
        document.documentElement.setAttribute('data-theme', darkmode ? 'dark' : 'light')
    }

    const ButtonText = ({ children }: { children: ReactNode }) => {
        return <b className="hover:text-t-hover text-fs-h2">{children}</b>
    }

    const header = useHeader()

    useEffect(() => {
        document.documentElement.setAttribute(
            'data-theme',
            localStorage.getItem('data-theme') ?? 'dark'
        )
    }, [])

    return (
        <div>
            <div className="h-[50px] bg-bg-secondary flex">
                <Link
                    to="/"
                    className="pl-3 cursor-pointer select-none my-auto"
                    onClick={() => header.hideAll()}>
                    <ButtonText>{t('header.home')}</ButtonText>
                </Link>
                <div className="flex-1" onClick={() => header.hideAll()}></div>

                {auth.user !== undefined && auth.user.role === 'lender' && (
                    <Link
                        to="/consoles"
                        className="cursor-pointer select-none my-auto mr-7"
                        onClick={() => header.hideAll()}>
                        <ButtonText>{t('header.myConsoles')}</ButtonText>
                    </Link>
                )}
                {auth.user !== undefined && auth.user.role === 'borrower' && (
                    <Link
                        to="/borrowings"
                        className="cursor-pointer select-none my-auto mr-7"
                        onClick={() => header.hideAll()}>
                        <ButtonText>{t('header.myConsoles')}</ButtonText>
                    </Link>
                )}
                {auth.user !== undefined && auth.user.role === 'admin' && (
                    <Link
                        to="/manageConsoles"
                        className="cursor-pointer select-none my-auto mr-7"
                        onClick={() => header.hideAll()}>
                        <ButtonText>{t('header.manageConsoles')}</ButtonText>
                    </Link>
                )}
                {auth.user !== undefined && auth.user.role === 'admin' && (
                    <Link
                        to="/userConsoles"
                        className="cursor-pointer select-none my-auto mr-7"
                        onClick={() => header.hideAll()}>
                        <ButtonText>{t('header.lendRequests')}</ButtonText>
                    </Link>
                )}
                {auth.user !== undefined && (
                    <Link
                        to="/chats"
                        className="cursor-pointer select-none my-auto mr-7"
                        onClick={() => header.hideAll()}>
                        <ButtonText>{t('header.chats')}</ButtonText>
                    </Link>
                )}

                <Link
                    to="/contacts"
                    className="cursor-pointer select-none my-auto mr-7"
                    onClick={() => header.hideAll()}>
                    <ButtonText>{t('header.contacts')}</ButtonText>
                </Link>
                <Link
                    to="/faq"
                    className="cursor-pointer select-none my-auto mr-7"
                    onClick={() => header.hideAll()}>
                    <ButtonText>{t('header.FAQ')}</ButtonText>
                </Link>
                {auth.user === undefined && (
                    <Link
                        to="/login"
                        className="cursor-pointer select-none my-auto mr-7"
                        onClick={() => header.hideAll()}>
                        <ButtonText>{t('header.login')}</ButtonText>
                    </Link>
                )}
                {auth.user === undefined && (
                    <Link
                        to="/register"
                        className="cursor-pointer select-none my-auto mr-7"
                        onClick={() => header.hideAll()}>
                        <ButtonText>{t('header.register')}</ButtonText>
                    </Link>
                )}

                <button
                    className="pr-2 select-none"
                    value="en"
                    onClick={() => i18n.changeLanguage('en')}>
                    <ReactCountryFlag countryCode="GB" svg />
                </button>
                <button
                    className="pr-6 select-none"
                    value="lt"
                    onClick={() => i18n.changeLanguage('lt')}>
                    <ReactCountryFlag countryCode="LT" svg />
                </button>
                <div
                    className="my-auto"
                    onClick={() => {
                        toggleDarkMode(!darkmode)
                    }}>
                    <span className="material-symbols-outlined align-middle pr-3 cursor-pointer select-none">
                        {darkmode ?? false ? 'light_mode' : 'dark_mode'}
                    </span>
                </div>

                {auth.user !== undefined && (
                    <div className="mr-7 my-auto ml-3">
                        <button>
                            <span
                                className="material-symbols-outlined cursor-pointer select-none"
                                onClick={() =>
                                    header.profileShown ? header.hideAll() : header.showProfile()
                                }>
                                manage_accounts
                            </span>
                        </button>
                        {header.profileShown && (
                            <div className="fixed mt-5 translate-x-[-110px] w-[130px] bg-bg-secondary p-3 rounded-lg">
                                <Link
                                    onClick={() => header.hideAll()}
                                    to="/profile"
                                    className="pb-1">
                                    <span className="material-symbols-outlined align-middle pr-3 cursor-pointer select-none">
                                        person
                                    </span>
                                    <span className="cursor-pointer select-none">
                                        {t('header.profile.profile')}
                                    </span>
                                </Link>
                                <button
                                    className="pt-1"
                                    onClick={() => {
                                        auth.logout()
                                        header.hideAll()
                                    }}>
                                    <span className="material-symbols-outlined pr-3 align-middle">
                                        logout
                                    </span>
                                    <span className="cursor-pointer select-none">
                                        {t('header.profile.logout')}
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header
