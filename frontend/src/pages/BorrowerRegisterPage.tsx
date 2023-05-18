import { useAuth } from '../contexts/AuthContext'
import { RegisterLegal } from '../models/User'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { submitRegisterRequest } from '../api/AuthApi'
import { t } from 'i18next'

interface UserRegisterPlus {
    username: string
    companyCode: string
    companyName: string
    email: string
    emailConfirmed: string
    password: string
    passwordConfirmed: string
    status: string
}

export default function BorrowerRegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserRegisterPlus>()
    const onSubmit: SubmitHandler<UserRegisterPlus> = () => {
        setError('')
        submitRegisterRequest(
            new RegisterLegal(
                watch('email'),
                watch('companyCode'),
                watch('companyName'),
                watch('email'),
                watch('password')
            )
        )
            .then(() => {
                setMessage(t('register.requestSuccess') ?? '')
            })
            .catch((error) => setError(error))
    }
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const auth = useAuth()
    return (
        <form
            className="flex flex-col items-center select-none bg-bg-primary text-t-primary pt-10"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-80 bg-bg-secondary pb-5 rounded">
                <div className="py-6 text-center text-fs-h1">{t('register.titleBorrowers')}</div>
                <div className="mx-[30px]">
                    <input
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder={t('register.companyCode') ?? ''}
                        {...register('companyCode', { required: true })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.companyCode?.type === 'required'
                            ? t('register.companyCodeError')
                            : ''}
                    </p>

                    <input
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder={t('register.companyName') ?? ''}
                        {...register('companyName', { required: true })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.companyName?.type === 'required'
                            ? t('register.companyNameError')
                            : ''}
                    </p>

                    <input
                        type="email"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder={t('register.email') ?? ''}
                        {...register('email', { required: true })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.email?.type === 'required' ? t('register.emailError') : ''}
                    </p>

                    <input
                        type="password"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder={t('register.password') ?? ''}
                        {...register('password', { required: true })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.password?.type === 'required' ? t('register.passwordError') : ''}
                    </p>

                    <input
                        type="password"
                        className="w-full bg-bg-secondary border-b focus:outline-none"
                        placeholder={t('register.repeatPassword') ?? ''}
                        {...register('passwordConfirmed', {
                            required: true,
                            validate: (passwordConfirmed: string) => {
                                if (watch('password') != passwordConfirmed) {
                                    return 'match'
                                }
                            }
                        })}
                        disabled={auth.loading}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.passwordConfirmed?.type === 'required'
                            ? t('register.passwordError')
                            : errors.passwordConfirmed?.type === 'validate'
                            ? t('register.passwordMismatchError')
                            : ''}
                    </p>
                </div>
                <div className="flex flex-col items-center pt-3">
                    <button
                        type="submit"
                        className="bg-bg-extra py-1 px-7 rounded"
                        disabled={auth.loading}>
                        {t('register.requestButton') ?? ''}
                    </button>
                </div>
            </div>
            <div className="pt-4 text-fs-primary text-danger-500 text-center">{error}</div>
            {error === '' && (
                <div className="pt-4 text-fs-primary text-success-500 text-center">{message}</div>
            )}
            {auth.loading && (
                <div className="flex items-center justify-center pt-10">
                    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
        </form>
    )
}
