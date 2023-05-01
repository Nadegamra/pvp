import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import { changePassword, getUnconfirmedEmails, sendEmailChangeToken } from '../api/UsersApi'
import { UserEmailChange, UserPasswordChange } from '../models/User'

function ProfilePage() {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [unconfirmedEmails, setUnconfirmedEmails] = useState<string[]>()

    const [email, setEmail] = useState<string>('')

    const [password, setPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')

    useEffect(() => {
        getUnconfirmedEmails().then((response) => {
            setUnconfirmedEmails(response.data)
        })
    }, [])
    return (
        <div className="flex justify-center content-center">
            <div className="w-[30rem] mt-20 rounded-lg p-5">
                {user !== undefined && !user.isCompany && (
                    <div>
                        <div className="font-bold text-left text-[25px]">
                            {t('profile.personalInfo')}
                        </div>
                        <hr className="pb-3" />
                        <div className="font-bold">{t('profile.firstName')}</div>
                        <div className="pl-2 pb-3">{user?.firstName}</div>
                        <div className="font-bold">{t('profile.lastName')}</div>
                        <div className="pl-2">{user?.lastName}</div>
                    </div>
                )}
                {user !== undefined && user.isCompany && (
                    <div>
                        <div className="font-bold text-left text-[25px]">
                            {t('profile.companyInfo')}
                        </div>
                        <hr className="pb-3" />
                        <div className="font-bold">{t('profile.companyCode')}</div>
                        <div className="pl-2 pb-3">{user?.companyCode}</div>
                        <div className="font-bold">{t('profile.companyName')}</div>
                        <div className="pl-2">{user?.companyName}</div>
                    </div>
                )}
                <div>
                    <div className="font-bold text-left text-[25px] pt-5">{t('profile.email')}</div>
                    <hr className="pb-2" />
                    <div className="font-bold">{t('profile.currentEmail')}</div>
                    <div className="pl-2 pb-3">{user?.email}</div>
                    {(unconfirmedEmails?.length ?? 0) > 0 && (
                        <div>
                            <div className="font-bold">{t('profile.unconfirmedEmails')}</div>
                            {unconfirmedEmails?.map((email) => (
                                <div className="pl-2 pb-3">{email}</div>
                            ))}
                        </div>
                    )}
                    <div>
                        <div className="font-bold">{t('profile.newEmail')}</div>
                        <input
                            className="bg-bg-primary border p-2 rounded-md w-[300px]"
                            name="newEmail"
                            type="text"
                            placeholder={t('profile.enterNewEmail') ?? ''}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="block bg-bg-extra p-2 rounded-md mt-5"
                            onClick={() =>
                                sendEmailChangeToken(new UserEmailChange(email)).then(() =>
                                    getUnconfirmedEmails().then((response) => {
                                        setUnconfirmedEmails(response.data)
                                    })
                                )
                            }>
                            {t('profile.saveChanges')}
                        </button>
                    </div>
                </div>
                <div>
                    <div className="font-bold text-left text-[25px] pt-5">
                        {t('profile.security')}
                    </div>
                    <hr className="pb-3" />
                    <div className="font-bold">{t('profile.currentPassword')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                        type="password"
                        placeholder={t('profile.enterCurrentPassword') ?? ''}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="font-bold">{t('profile.newPassword')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md mb-1 w-[300px]"
                        type="password"
                        placeholder={t('profile.enterNewPassword') ?? ''}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button
                        className="block bg-bg-extra p-2 rounded-md mt-5"
                        onClick={() =>
                            changePassword(new UserPasswordChange(password, newPassword))
                        }>
                        {t('profile.saveChanges')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
