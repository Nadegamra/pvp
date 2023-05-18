import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { resetPassword } from '../api/UsersApi'
import { useTranslation } from 'react-i18next'
import { UserPasswordReset } from '../models/User'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Props {
    password: string
    repeatPassword: string
}

// Does not display the message correctly when StrictMode is enabled (index.tsx)
function ResetPasswordPage() {
    const { token } = useParams()
    const { t } = useTranslation()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [success, setSuccess] = useState<boolean>()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<Props>()

    const onSubmit: SubmitHandler<Props> = () => {
        setLoading(true)
        setError('')

        resetPassword(new UserPasswordReset(token ?? 'string', watch('password')))
            .then(() => {
                setMessage(t('passwordReset.success') ?? '')
            })
            .catch(() => {
                setError(t('passwordReset.failure') ?? '')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <form
            className="flex flex-col items-center select-none bg-bg-primary text-t-primary pt-10"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-80 bg-bg-secondary pb-5 rounded">
                <div className="py-6 text-fs-h1 text-center">
                    {t('passwordReset.passwordReset')}
                </div>
                <div className="mx-[30px]">
                    <input
                        type="password"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder="Password"
                        {...register('password', { required: true })}
                        disabled={loading}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.password?.type === 'required' ? 'Password is required' : ''}
                    </p>

                    <input
                        type="password"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder="Repeat Password"
                        {...register('repeatPassword', {
                            required: true,
                            validate: (repeatPassword: string) => {
                                if (watch('password') !== repeatPassword) {
                                    return 'match'
                                }
                            }
                        })}
                        disabled={loading}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.repeatPassword?.type === 'required'
                            ? 'Repeating the password is required'
                            : errors.repeatPassword?.type === 'validate'
                            ? 'Passwords do not match'
                            : ''}
                    </p>
                </div>
                <div className="flex flex-col items-center pt-3">
                    <button
                        type="submit"
                        className="bg-bg-extra py-1 px-7 rounded"
                        disabled={loading}>
                        {t('passwordReset.passwordReset')}
                    </button>
                </div>
            </div>
            <div className="pt-4 text-fs-primary text-danger-500 text-center">{error}</div>
            {error === '' && (
                <div className="pt-4 text-fs-primary text-success-500 text-center">{message}</div>
            )}
            {loading && (
                <div className="flex items-center justify-center pt-10">
                    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
        </form>
    )
}

export default ResetPasswordPage
