import { useState } from 'react'
import { UserPhysicalUpdate } from '../../models/User'
import { updatePhysical } from '../../api/UsersApi'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'

function PersonalInfoForm() {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [firstName, setFirstName] = useState<string>(user?.firstName ?? '')
    const [lastName, setLastName] = useState<string>(user?.lastName ?? '')
    const [infoLoading, setInfoLoading] = useState<boolean>(false)
    const [infoMessage, setInfoMessage] = useState<string>('')

    return (
        <form>
            <div className="font-bold">{t('profile.firstName')}</div>
            <input
                className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <div className="font-bold">{t('profile.lastName')}</div>
            <input
                className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />
            <button
                className="block bg-bg-extra p-2 rounded-md mt-5 mb-3"
                onClick={() => {
                    setInfoLoading(true)
                    updatePhysical(new UserPhysicalUpdate(firstName, lastName))
                        .then(() => {
                            setInfoMessage(t('profile.dataSuccessMessage') ?? '')
                        })
                        .finally(() => {
                            setInfoLoading(false)
                        })
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

export default PersonalInfoForm
