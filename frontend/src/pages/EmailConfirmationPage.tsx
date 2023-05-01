import { ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { confirmEmail } from '../api/UsersApi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ButtonText = ({ children }: { children: ReactNode }) => {
    return <b className="hover:text-t-hover text-fs-h2">{children}</b>
}
// Does not display the message correctly when StrictMode is enabled (index.tsx)
function EmailConfirmationPage() {
    const { token } = useParams()
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(true)
    const [success, setSuccess] = useState<boolean>()

    useEffect(() => {
        confirmEmail(token ?? 'string')
            .then(() => {
                setSuccess(true)
            })
            .catch(() => {
                setSuccess(false)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <div>
            {!loading && success! ? (
                <div className="m-auto bg-bg-secondary w-max mt-10 p-5 rounded-lg">
                    {t('emailConfirmation.success')}
                    <Link to="/login" className="cursor-pointer select-none my-auto mr-7">
                        <ButtonText>{t('emailConfirmation.login')}</ButtonText>
                    </Link>
                </div>
            ) : (
                <div className="m-auto bg-bg-secondary w-max mt-10 p-5 rounded-lg">
                    {t('emailConfirmation.failure')}
                </div>
            )}
        </div>
    )
}

export default EmailConfirmationPage
