import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { updateAddress } from '../../api/UsersApi'
import { UserAddressUpdate } from '../../models/User'

function AddressForm() {
    const { t } = useTranslation()
    const { user } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<UserAddressUpdate>()
    const [addressLoading, setAddressLoading] = useState<boolean>(false)
    const [addressMessage, setAddressMessage] = useState<string>('')

    useEffect(() => {
        setValue('country', (user?.country ?? '') === '' ? 'Lietuva' : user?.country ?? '')
        setValue('county', user?.county ?? '')
        setValue('city', user?.city ?? '')
        setValue('streetAddress', user?.streetAddress ?? '')
        setValue('postalCode', user?.postalCode ?? '')
    }, [])

    return (
        <form
            onSubmit={handleSubmit(async (data, e) => {
                setAddressLoading(true)
                setAddressMessage('')
                updateAddress(
                    new UserAddressUpdate(
                        watch('country'),
                        watch('county'),
                        watch('city'),
                        watch('streetAddress'),
                        watch('postalCode')
                    )
                )
                    .then(() => {
                        setAddressMessage(t('addressForm.addressSuccessMessage') ?? '')
                    })
                    .finally(() => {
                        setAddressLoading(false)
                    })
                e?.preventDefault()
            })}>
            <div className="grid grid-cols-2 grid-rows-3 gap-x-5">
                <div>
                    <div className="font-bold">{t('addressForm.country')}</div>
                    <input
                        disabled
                        className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                        placeholder={t('addressForm.enterCountry') ?? ''}
                        {...register('country', { required: true })}
                    />
                    {errors.country?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {t('addressForm.countryError')}
                        </p>
                    )}
                </div>
                <div>
                    <div className="font-bold">{t('addressForm.county')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                        placeholder={t('addressForm.enterCounty') ?? ''}
                        {...register('county', { required: true })}
                    />
                    {errors.county?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {t('addressForm.countyError')}
                        </p>
                    )}
                </div>
                <div>
                    <div className="font-bold">{t('addressForm.city')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                        placeholder={t('addressForm.enterCity') ?? ''}
                        {...register('city', { required: true })}
                    />
                    {errors.city?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {t('addressForm.cityError')}
                        </p>
                    )}
                </div>
                <div>
                    <div className="font-bold">{t('addressForm.streetAddress')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                        placeholder={t('addressForm.enterStreetAddress') ?? ''}
                        {...register('streetAddress', { required: true })}
                    />
                    {errors.streetAddress?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {t('addressForm.streetAddressError')}
                        </p>
                    )}
                </div>
                <div>
                    <div className="font-bold">{t('addressForm.postalCode')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md mb-3 w-[300px]"
                        placeholder={t('addressForm.enterPostalCode') ?? ''}
                        {...register('postalCode', { required: true })}
                    />
                    {errors.postalCode?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {t('addressForm.postalCodeError')}
                        </p>
                    )}
                </div>
            </div>
            <button className="block bg-bg-extra p-2 rounded-md mt-5 mb-3" type="submit">
                {t('addressForm.saveChanges')}
            </button>
            {addressMessage !== '' && (
                <div className="pt-4 text-fs-primary text-success-500">{addressMessage}</div>
            )}
            {addressLoading && (
                <div>
                    <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
        </form>
    )
}

export default AddressForm
