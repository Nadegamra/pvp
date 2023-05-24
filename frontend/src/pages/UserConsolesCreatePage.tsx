import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ImageAdd } from '../models/Image'
import { useTranslation } from 'react-i18next'
import { UserConsoleAdd } from '../models/UserConsole'
import { addUserConsole } from '../api/UserConsolesApi'
import { ConsoleGet } from '../models/Console'
import { getConsoles } from '../api/ConsolesApi'
import Select from 'react-select'
import Button from '../components/ui/Button'

interface Props {
    consoleId: number
    amount: number
    accessories: string
    images: FileList
}

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
    })

function UserConsolesCreatePage() {
    const { t } = useTranslation()
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors, isValid },
        control,
        setValue,
        trigger
    } = useForm<Props>()
    const [error, setError] = useState('')
    const [categories, setCategories] = useState<ConsoleGet[]>()
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getConsoles().then((response) => {
            setCategories(response.data)
        })
    }, [])

    return (
        <form
            className="flex flex-col items-center select-none bg-bg-primary text-t-primary pt-10"
            onSubmit={handleSubmit(async (data) => {
                setError('')
                setLoading(true)
                const images: ImageAdd[] = []
                for (let i = 0; i < data.images.length; i++) {
                    const image = data.images.item(i)
                    if (image !== null) {
                        let base64 = await toBase64(image)
                        do {
                            base64 = base64.substring(1)
                        } while (base64[0] != ',')
                        base64 = base64.substring(1)
                        images.push(new ImageAdd(image.name, '', base64))
                    }
                }

                const userConsoleAdd: UserConsoleAdd = new UserConsoleAdd(
                    data.consoleId,
                    data.amount,
                    data.accessories,
                    images
                )
                addUserConsole(userConsoleAdd).then((response) => {
                    setLoading(false)
                    window.location.href = '/consoles'
                })
            })}>
            <div className="min-w-max bg-bg-secondary p-7 rounded">
                <div className="py-6 text-fs-h1 text-center">
                    {t('userConsoleManagementForm.title') ?? ''}
                </div>
                <div className="mx-[10px]">
                    <Controller
                        control={control}
                        name="consoleId"
                        rules={{ required: true }}
                        render={() => (
                            <Select
                                className="!text-t-primary"
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        text: `var(${'--color-text-primary'})`,
                                        neutral0: `var(${'--color-bg-secondary'})`,
                                        neutral80: `var(${'--color-text-primary'})`,
                                        primary25: `var(${'--color-bg-primary'})`,
                                        primary50: `var(${'--color-bg-primary'})`
                                    }
                                })}
                                defaultValue={{
                                    value: 0,
                                    label: t('userConsoleManagementForm.consoleCategory')
                                }}
                                options={categories?.map((consoleGet) => {
                                    return { value: consoleGet.id, label: consoleGet.name }
                                })}
                                onChange={(e) => {
                                    setValue('consoleId', e?.value ?? -1)
                                }}
                            />
                        )}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.consoleId?.type === 'required'
                            ? t('userConsoleManagementForm.consoleCategoryError')
                            : ''}
                    </p>

                    <input
                        type="number"
                        step={1}
                        className="w-full bg-bg-primary border p-2 rounded-md text-fs-h2"
                        placeholder={t('userConsoleManagementForm.amount') ?? ''}
                        {...register('amount', {
                            required: true,
                            validate: () => {
                                if (watch('amount') <= 0) {
                                    return 'nonPos'
                                }
                                if (watch('amount') % 1 > 0) {
                                    return 'nonInt'
                                }
                            }
                        })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.amount?.type === 'required'
                            ? t('userConsoleManagementForm.amountError')
                            : ''}
                        {errors.amount?.type === 'validate' &&
                            t('userConsoleManagementForm.invalidAmountError')}
                    </p>

                    <input
                        type="text"
                        className="w-full bg-bg-primary border p-2 rounded-md text-fs-h2"
                        placeholder={t('userConsoleManagementForm.accessories') ?? ''}
                        {...register('accessories', { required: true })}
                    />
                    <div
                        className="italic absolute text-sm text-neutral-500 peer-focus:text-primary dark:text-neutral-200 dark:peer-focus:text-primary text-[12px]"
                        data-te-input-helper-ref>
                        {t('userConsoleManagementForm.accessoriesTooltip')}
                    </div>
                    <p className="mt-3 mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.accessories?.type === 'required'
                            ? t('userConsoleManagementForm.accessoriesError')
                            : ''}
                    </p>

                    <label htmlFor="images" className="cursor-pointer flex flex-col sm:flex-row">
                        <span className="p-1 mr-1 bg-bg-primary text-t-primary rounded-sm border max-w-max">
                            {t('userConsoleManagementForm.selectImages')}
                        </span>
                        {watch('images') !== undefined &&
                            watch('images').length === 0 &&
                            t('userConsoleManagementForm.noImage')}
                        {watch('images') !== undefined &&
                            watch('images').length === 1 &&
                            watch('images').item(0)?.name}
                        {watch('images') !== undefined &&
                            watch('images').length > 1 &&
                            `${watch('images').length} ${t('userConsoleManagementForm.imagesL')}`}
                    </label>
                    <input
                        id="images"
                        type="file"
                        multiple
                        accept="image/*"
                        hidden
                        className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                        placeholder={t('userConsoleManagementForm.images') ?? ''}
                        {...register('images', {
                            required: true,
                            validate: (files) => {
                                if (files.length < 2) {
                                    return 'userConsoleManagementForm.imagesError'
                                }
                                for (let i = 0; i < files.length; i++) {
                                    const file = files.item(i)
                                    if (file === null || !file.type.startsWith('image/')) {
                                        return 'userConsoleManagementForm.invalidFileError'
                                    }
                                }
                            }
                        })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.images?.type === 'required' &&
                            t('userConsoleManagementForm.imagesError')}
                        {t(errors.images?.message ?? '')}
                    </p>
                </div>
                <div
                    className="flex flex-col items-center pt-5 text-fs-h2"
                    onClick={() => trigger()}>
                    <Button
                        text={t('userConsoleManagementForm.create') ?? ''}
                        submit={true}
                        disabled={!isValid}
                        dialog={true}
                        dialogBody={t('button.dialogBody8')}
                        onDisabledClick={() => trigger()}
                    />
                </div>
            </div>
            <div className="text-fs-primary text-danger-500 text-center">{error}</div>
            {loading && (
                <div className="flex items-center justify-center pt-10">
                    <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
        </form>
    )
}

export default UserConsolesCreatePage
