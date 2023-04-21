import { ReactNode } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ButtonText = ({ children }: { children: ReactNode }) => {
    return <b className="hover:text-t-hover text-fs-h2">{children}</b>
}

function Footer() {
    const { t, i18n } = useTranslation()
    return (
        <div className="bg-bg-secondary grid grid-rows-2 grid-cols-3 p-5 gap-10">
            <Link to="/contacts" className="cursor-pointer select-none my-auto mr-7">
                <ButtonText>{t('footer.contacts')}</ButtonText>
            </Link>
            <Link to="/faq" className="cursor-pointer select-none my-auto mr-7">
                <ButtonText>{t('footer.faq')}</ButtonText>
            </Link>
            <Link to="/register" className="cursor-pointer select-none my-auto mr-7">
                <ButtonText>{t('footer.register')}</ButtonText>
            </Link>
            <Link to="/registerBorrower" className="cursor-pointer select-none my-auto mr-7">
                <ButtonText>{t('footer.registerRequest')}</ButtonText>
            </Link>
            <div>
                {t('footer.languages')}
                <button className="pr-4" value="en" onClick={() => i18n.changeLanguage('en')}>
                    <ReactCountryFlag countryCode="GB" svg />
                    en
                </button>
                <button value="lt" onClick={() => i18n.changeLanguage('lt')}>
                    <ReactCountryFlag countryCode="LT" svg />
                    lt
                </button>
            </div>
        </div>
    )
}

export default Footer
