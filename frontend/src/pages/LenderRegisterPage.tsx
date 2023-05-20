import { RegisterLegal, RegisterPhysical } from '../models/User'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { registerLenderLegal, registerLenderPhysical } from '../api/AuthApi'
import { t } from 'i18next'
import Button from '../components/ui/Button'

interface UserRegisterPlus {
    username: string
    firstName: string
    lastName: string
    email: string
    emailConfirmed: string
    password: string
    passwordConfirmed: string
    companyCode?: string
    companyName?: string
    isCompany: boolean
}

export default function LenderRegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<UserRegisterPlus>()
    const onSubmit: SubmitHandler<UserRegisterPlus> = () => {
        setLoading(true)
        setError('')
        if (watch('isCompany')) {
            registerLenderLegal(
                new RegisterLegal(
                    watch('email'),
                    watch('companyCode') ?? '',
                    watch('companyName') ?? '',
                    watch('email'),
                    watch('password')
                )
            )
                .then(() => {
                    setLoading(false)
                    setMessage(t('register.checkEmail') ?? '')
                })
                .catch((error) => setError(error))
        } else {
            registerLenderPhysical(
                new RegisterPhysical(
                    watch('email'),
                    watch('firstName'),
                    watch('lastName'),
                    watch('email'),
                    watch('password')
                )
            )
                .then(() => {
                    setLoading(false)
                    setMessage(t('register.checkEmail') ?? '')
                })
                .catch((error) => setError(error))
        }
    }
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState<boolean>(false)

    return (
        <form
            className="flex flex-col items-center select-none bg-bg-primary text-t-primary pt-10"
            onSubmit={handleSubmit(onSubmit)}>
            <div className="w-80 bg-bg-secondary pb-5 rounded">
                <div className="py-6 text-fs-h1 text-center">{t('register.title') ?? ''}</div>
                <div className="mx-[30px]">
                    <div className="flex items-center justify-between mb-3">
                        <label className="mr-3 text-fs-primary">
                            {t('register.asCompany') ?? ''}
                        </label>
                        <input
                            type="checkbox"
                            className="form-checkbox mr-[10px] w-4 h-4 rounded hover:bg-bg-extra checked:bg-bg-extra bg-bg-secondary focus:ring-0 focus:outline-none border-t-primary border-t-t-primary"
                            {...register('isCompany')}
                        />
                    </div>
                    {watch('isCompany') ? (
                        <>
                            <input
                                type="companyCode"
                                className="w-full bg-bg-primary border p-2 rounded-md"
                                placeholder={t('register.companyCode') ?? ''}
                                {...register('companyCode', { required: true })}
                                disabled={loading}
                            />
                            <p className="mb-3 text-fs-primary text-danger-500 h-3">
                                {errors.companyCode?.type === 'required'
                                    ? t('register.companyCodeError')
                                    : ''}
                            </p>

                            <input
                                type="companyName"
                                className="w-full bg-bg-primary border p-2 rounded-md"
                                placeholder={t('register.companyName') ?? ''}
                                {...register('companyName', { required: true })}
                                disabled={loading}
                            />
                            <p className="mb-3 text-fs-primary text-danger-500 h-3">
                                {errors.companyName?.type === 'required'
                                    ? t('register.companyNameError')
                                    : ''}
                            </p>
                        </>
                    ) : (
                        <>
                            <input
                                type="firstName"
                                className="w-full bg-bg-primary border p-2 rounded-md"
                                placeholder={t('register.firstName') ?? ''}
                                {...register('firstName', { required: true })}
                                disabled={loading}
                            />
                            <p className="mb-3 text-fs-primary text-danger-500 h-3">
                                {errors.firstName?.type === 'required'
                                    ? t('register.firstNameError')
                                    : ''}
                            </p>

                            <input
                                type="lastName"
                                className="w-full bg-bg-primary border p-2 rounded-md"
                                placeholder={t('register.lastName') ?? ''}
                                {...register('lastName', { required: true })}
                                disabled={loading}
                            />
                            <p className="mb-3 text-fs-primary text-danger-500 h-3">
                                {errors.lastName?.type === 'required'
                                    ? t('register.lastNameError')
                                    : ''}
                            </p>
                        </>
                    )}
                    <input
                        type="email"
                        className="w-full bg-bg-primary border p-2 rounded-md"
                        placeholder={t('register.email') ?? ''}
                        {...register('email', { required: true })}
                        disabled={loading}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.email?.type === 'required' ? t('register.emailError') : ''}
                    </p>

                    <input
                        type="password"
                        className="w-full bg-bg-primary border p-2 rounded-md"
                        placeholder={t('register.password') ?? ''}
                        {...register('password', { required: true })}
                        disabled={loading}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.password?.type === 'required' ? t('register.passwordError') : ''}
                    </p>

                    <input
                        type="password"
                        className="w-full bg-bg-primary border p-2 rounded-md"
                        placeholder={t('register.repeatPassword') ?? ''}
                        {...register('passwordConfirmed', {
                            required: true,
                            validate: (passwordConfirmed: string) => {
                                if (watch('password') != passwordConfirmed) {
                                    return 'match'
                                }
                            }
                        })}
                        disabled={loading}
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
                    <Button
                        text={t('register.registerButton') ?? ''}
                        disabled={loading}
                        submit={true}
                    />
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
