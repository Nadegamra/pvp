import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import { updateLegal } from '../../api/UsersApi'
import { UserLegalUpdate } from '../../models/User'

function CompanyInfoForm() {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [companyCode, setCompanyCode] = useState<string>(user?.companyCode ?? '')
    const [companyName, setCompanyName] = useState<string>(user?.companyName ?? '')
    const [infoLoading, setInfoLoading] = useState<boolean>(false)
    const [infoMessage, setInfoMessage] = useState<string>('')

    return (
        <form>
            <div className="font-bold">{t('profile.companyCode')}</div>
            <input
                className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                value={companyCode}
                onChange={(e) => setCompanyCode(e.target.value)}
            />
            <div className="font-bold">{t('profile.companyName')}</div>
            <input
                className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
            />
            <button
                className="block bg-bg-extra p-2 rounded-md mt-5 mb-3"
                onClick={(e) => {
                    setInfoLoading(true)
                    setInfoMessage('')
                    updateLegal(new UserLegalUpdate(companyCode, companyName))
                        .then(() => {
                            setInfoMessage(t('profile.dataSuccessMessage') ?? '')
                        })
                        .finally(() => {
                            setInfoLoading(false)
                        })
                    e.preventDefault()
                }}>
                {t('profile.saveChanges')}
            </button>
            {infoMessage !== '' && (
                <div className="pt-4 text-fs-primary text-success-500">{infoMessage}</div>
            )}
            {infoLoading && (
                <div>
                    <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
        </form>
    )
}

export default CompanyInfoForm
