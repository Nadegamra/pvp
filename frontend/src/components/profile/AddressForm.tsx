import { useTranslation } from 'react-i18next'
import { useAuth } from '../../contexts/AuthContext'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { updateAddress } from '../../api/UsersApi'
import { UserAddressUpdate } from '../../models/User'
import Button from '../ui/Button'

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
            })}>
            <div className="flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-3 sm:gap-x-5 ">
                <div>
                    <div className="font-bold">{t('addressForm.country')}</div>
                    <input
                        disabled
                        className="bg-bg-primary border p-2 rounded-md w-[300px]"
                        placeholder={t('addressForm.enterCountry') ?? ''}
                        {...register('country', { required: true })}
                    />
                    <p className="mb-2 text-fs-primary text-danger-500 h-3">
                        {errors.country?.type === 'required' && t('addressForm.countryError')}
                    </p>
                </div>
                <div>
                    <div className="font-bold">{t('addressForm.county')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md w-[300px]"
                        placeholder={t('addressForm.enterCounty') ?? ''}
                        {...register('county', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.county?.type === 'required' && t('addressForm.countyError')}
                    </p>
                </div>
                <div>
                    <div className="font-bold">{t('addressForm.city')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md w-[300px]"
                        placeholder={t('addressForm.enterCity') ?? ''}
                        {...register('city', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.city?.type === 'required' && t('addressForm.cityError')}
                    </p>
                </div>
                <div>
                    <div className="font-bold">{t('addressForm.streetAddress')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md w-[300px]"
                        placeholder={t('addressForm.enterStreetAddress') ?? ''}
                        {...register('streetAddress', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.streetAddress?.type === 'required' &&
                            t('addressForm.streetAddressError')}
                    </p>
                </div>
                <div>
                    <div className="font-bold">{t('addressForm.postalCode')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md w-[300px]"
                        placeholder={t('addressForm.enterPostalCode') ?? ''}
                        {...register('postalCode', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.postalCode?.type === 'required' && t('addressForm.postalCodeError')}
                    </p>
                </div>
            </div>
            <Button text={t('addressForm.saveChanges')} submit={true} />
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
