import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { changePassword } from '../../api/UsersApi'
import { UserPasswordChange } from '../../models/User'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'

interface Props {
    password: string
    newPassword: string
    repeatNewPassword: string
}

function PasswordChangeForm() {
    const { t } = useTranslation()
    const { user } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<Props>()

    const [passwordLoading, setPasswordLoading] = useState<boolean>(false)
    const [passwordMessage, setPasswordMessage] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

    return (
        <form
            onSubmit={handleSubmit(async (data, e) => {
                setPasswordLoading(true)
                setPasswordMessage('')
                setPasswordError('')
                changePassword(new UserPasswordChange(watch('password'), watch('newPassword')))
                    .then(() => {
                        setPasswordMessage(t('passwordChangeForm.passwordSuccessMessage') ?? '')
                    })
                    .catch(() => {
                        setPasswordError(t('passwordChangeForm.passwordFailureMessage') ?? '')
                    })
                    .finally(() => {
                        setPasswordLoading(false)
                    })
                e?.preventDefault()
            })}>
            <div className="font-bold">{t('passwordChangeForm.currentPassword')}</div>
            <input
                className="bg-bg-primary border p-2 rounded-md w-[300px]"
                type="password"
                placeholder={t('passwordChangeForm.enterCurrentPassword') ?? ''}
                {...register('password', { required: true })}
            />
            <p className="mb-3 text-fs-primary text-danger-500 h-3">
                {errors.password?.type === 'required' &&
                    t('passwordChangeForm.currentPasswordError')}
            </p>
            <div className="font-bold">{t('passwordChangeForm.newPassword')}</div>
            <input
                className="bg-bg-primary border p-2 rounded-md w-[300px]"
                type="password"
                placeholder={t('passwordChangeForm.enterNewPassword') ?? ''}
                {...register('newPassword', {
                    required: true,
                    validate: () => {
                        if (watch('newPassword').length < 8) {
                            return 'passwordChangeForm.shortError'
                        }
                        if (!/\d/.test(watch('newPassword'))) {
                            return 'passwordChangeForm.noDigitError'
                        }
                        if (!/[a-z]/.test(watch('newPassword'))) {
                            return 'passwordChangeForm.noLowerError'
                        }
                        if (!/[A-Z]/.test(watch('newPassword'))) {
                            return 'passwordChangeForm.noUpperError'
                        }
                        if (!/\W/.test(watch('newPassword'))) {
                            return 'passwordChangeForm.noNonAlphaError'
                        }
                    }
                })}
            />
            <p className="mb-3 text-fs-primary text-danger-500 h-3">
                {errors.newPassword?.type === 'required' &&
                    t('passwordChangeForm.newPasswordError')}
                {errors.newPassword?.message !== undefined && t(errors.newPassword?.message)}
            </p>
            <div className="font-bold">{t('passwordChangeForm.repeatNewPassword')}</div>
            <input
                className="bg-bg-primary border p-2 rounded-md w-[300px]"
                type="password"
                placeholder={t('passwordChangeForm.enterRepeatNewPassword') ?? ''}
                {...register('repeatNewPassword', {
                    required: true,
                    validate: (repeatNewPassword: string) => {
                        if (watch('newPassword') != repeatNewPassword) {
                            return 'match'
                        }
                    }
                })}
            />
            <p className="mb-3 text-fs-primary text-danger-500 h-3">
                {errors.repeatNewPassword?.type === 'required'
                    ? t('passwordChangeForm.repeatNewPasswordError')
                    : errors.repeatNewPassword?.type === 'validate'
                    ? t('passwordChangeForm.passwordMatchError')
                    : ''}
            </p>
            <Button text={t('passwordChangeForm.saveChanges')} submit={true} />
            {passwordMessage !== '' && (
                <div className="pt-4 text-fs-primary text-success-500">{passwordMessage}</div>
            )}
            {passwordError !== '' && (
                <div className="pt-4 text-fs-primary text-danger-500">{passwordError}</div>
            )}
            {passwordLoading && (
                <div>
                    <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
        </form>
    )
}

export default PasswordChangeForm
