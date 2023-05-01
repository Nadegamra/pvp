import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import {
    changePassword,
    getUnconfirmedEmails,
    sendEmailChangeToken,
    updateLegal,
    updatePhysical
} from '../api/UsersApi'
import {
    UserEmailChange,
    UserLegalUpdate,
    UserPasswordChange,
    UserPhysicalUpdate
} from '../models/User'

function ProfilePage() {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [unconfirmedEmails, setUnconfirmedEmails] = useState<string[]>()

    const [firstName, setFirstName] = useState<string>(user?.firstName ?? '')
    const [lastName, setLastName] = useState<string>(user?.lastName ?? '')
    const [companyCode, setCompanyCode] = useState<string>(user?.companyCode ?? '')
    const [companyName, setCompanyName] = useState<string>(user?.companyName ?? '')
    const [infoLoading, setInfoLoading] = useState<boolean>(false)
    const [infoMessage, setInfoMessage] = useState<string>('')

    const [email, setEmail] = useState<string>('')
    const [emailLoading, setEmailLoading] = useState<boolean>(false)

    const [password, setPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [passwordLoading, setPasswordLoading] = useState<boolean>(false)
    const [passwordMessage, setPasswordMessage] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

    useEffect(() => {
        getUnconfirmedEmails().then((response) => {
            setUnconfirmedEmails(response.data)
        })
    }, [])
    return (
        <div className="flex justify-center content-center">
            <div className="w-[30rem] mt-20 rounded-lg p-5 pb-20">
                {user !== undefined && !user.isCompany && (
                    <div>
                        <div className="font-bold text-left text-[25px]">
                            {t('profile.personalInfo')}
                        </div>
                        <hr className="pb-3" />
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
                            className="block bg-bg-extra p-2 rounded-md mt-5"
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
                            <div className="pt-4 text-fs-primary text-success-500">
                                {infoMessage}
                            </div>
                        )}
                        {infoLoading && (
                            <div>
                                <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                            </div>
                        )}
                    </div>
                )}
                {user !== undefined && user.isCompany && (
                    <div>
                        <div className="font-bold text-left text-[25px]">
                            {t('profile.companyInfo')}
                        </div>
                        <hr className="pb-3" />
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
                            className="block bg-bg-extra p-2 rounded-md mt-5"
                            onClick={() => {
                                setInfoLoading(true)
                                updateLegal(new UserLegalUpdate(companyCode, companyName))
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
                            <div className="pt-4 text-fs-primary text-success-500">
                                {infoMessage}
                            </div>
                        )}
                        {infoLoading && (
                            <div>
                                <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                            </div>
                        )}
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
                            disabled={emailLoading}
                            type="text"
                            placeholder={t('profile.enterNewEmail') ?? ''}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="block bg-bg-extra p-2 rounded-md mt-5"
                            onClick={() => {
                                setEmailLoading(true)
                                sendEmailChangeToken(new UserEmailChange(email)).then(() =>
                                    getUnconfirmedEmails()
                                        .then((response) => {
                                            setUnconfirmedEmails(response.data)
                                        })
                                        .finally(() => {
                                            setEmailLoading(false)
                                        })
                                )
                            }}>
                            {t('profile.saveChanges')}
                        </button>
                        {emailLoading && (
                            <div>
                                <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                            </div>
                        )}
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
                        onClick={() => {
                            setPasswordLoading(true)
                            setPasswordMessage('')
                            setPasswordError('')
                            changePassword(new UserPasswordChange(password, newPassword))
                                .then(() => {
                                    setPasswordMessage(t('profile.passwordSuccessMessage') ?? '')
                                })
                                .catch(() => {
                                    setPasswordError(t('profile.passwordFailureMessage') ?? '')
                                })
                                .finally(() => {
                                    setPasswordLoading(false)
                                })
                        }}>
                        {t('profile.saveChanges')}
                    </button>
                    {passwordMessage !== '' && (
                        <div className="pt-4 text-fs-primary text-success-500">
                            {passwordMessage}
                        </div>
                    )}
                    {passwordError !== '' && (
                        <div className="pt-4 text-fs-primary text-danger-500">{passwordError}</div>
                    )}
                    {passwordLoading && (
                        <div>
                            <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
