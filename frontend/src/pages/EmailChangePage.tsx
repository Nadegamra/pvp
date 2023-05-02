import { ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { changeEmail } from '../api/UsersApi'
import { Link } from 'react-router-dom'

const ButtonText = ({ children }: { children: ReactNode }) => {
    return <b className="hover:text-t-hover text-fs-h2">{children}</b>
}

function EmailChangePage() {
    const { token } = useParams()
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(true)
    const [success, setSuccess] = useState<boolean>()

    useEffect(() => {
        changeEmail(token ?? 'string')
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
            {!loading && (
                <div>
                    {success! ? (
                        <div className="m-auto bg-bg-secondary w-max mt-10 p-5 rounded-lg">
                            {t('emailChange.success')}
                            <Link to="/login" className="cursor-pointer select-none my-auto mr-7">
                                <ButtonText>{t('emailChange.login')}</ButtonText>
                            </Link>
                        </div>
                    ) : (
                        <div className="m-auto bg-bg-secondary w-max mt-10 p-5 rounded-lg">
                            {t('emailChange.failure')}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default EmailChangePage
