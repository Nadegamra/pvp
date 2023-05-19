import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { getUnconfirmedEmails, sendEmailChangeToken } from '../../api/UsersApi'
import { UserEmailChange } from '../../models/User'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'

interface Props {
    newEmail: string
}

function EmailChangeForm() {
    const { t } = useTranslation()
    const { user } = useAuth()
    const [unconfirmedEmails, setUnconfirmedEmails] = useState<string[]>()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<Props>()

    const [email, setEmail] = useState<string>('')
    const [emailLoading, setEmailLoading] = useState<boolean>(false)

    useEffect(() => {
        getUnconfirmedEmails().then((response) => {
            setUnconfirmedEmails(response.data)
        })
    }, [])
    return (
        <form
            onSubmit={handleSubmit(async (data, e) => {
                setEmailLoading(true)
                sendEmailChangeToken(new UserEmailChange(email)).finally(() => {
                    getUnconfirmedEmails().then((response) => {
                        setUnconfirmedEmails(response.data)
                    })
                    setEmailLoading(false)
                })
                e?.preventDefault()
            })}>
            <div className="font-bold">{t('emailChangeForm.currentEmail')}</div>
            <div className="pl-2 pb-3">{user?.email}</div>
            {(unconfirmedEmails?.length ?? 0) > 0 && (
                <div>
                    <div className="font-bold">{t('emailChangeForm.unconfirmedEmails')}</div>
                    {unconfirmedEmails?.map((email) => (
                        <div className="pl-2 pb-3">{email}</div>
                    ))}
                </div>
            )}
            <div>
                <div className="font-bold">{t('emailChangeForm.newEmail')}</div>
                <input
                    className="bg-bg-primary border p-2 rounded-md w-[300px]"
                    disabled={emailLoading}
                    type="email"
                    placeholder={t('emailChangeForm.enterNewEmail') ?? ''}
                    {...register('newEmail', { required: true })}
                />
                <p className="mb-3 text-fs-primary text-danger-500 h-3">
                    {errors.newEmail?.type === 'required' &&
                        t('emailChangeForm.emailErrorRequired')}
                </p>
                <Button text={t('emailChangeForm.saveChanges')} submit={true} />
                {emailLoading && (
                    <div>
                        <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </form>
    )
}

export default EmailChangeForm
