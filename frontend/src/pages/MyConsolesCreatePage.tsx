import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ImageAdd } from '../models/Image'
import { useTranslation } from 'react-i18next'
import { UserConsoleAdd } from '../models/UserConsole'
import { addUserConsole } from '../api/UserConsolesApi'
import { ConsoleGet } from '../models/Console'
import { getConsoles } from '../api/ConsolesApi'
import Select from 'react-select'

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

function MyConsolesCreatePage() {
    const { t } = useTranslation()
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        control,
        setValue
    } = useForm<Props>()
    const [error, setError] = useState('')
    const [categories, setCategories] = useState<ConsoleGet[]>()

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
                    window.location.href = '/consoles'
                })
            })}>
            <div className="min-w-[400px] w-max bg-bg-secondary p-7 rounded">
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
                                className="!bg-bg-secondary !text-[rgb(0,0,0)]"
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
                        type="text"
                        className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                        placeholder={t('userConsoleManagementForm.accessories') ?? ''}
                        {...register('accessories', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.accessories?.type === 'required'
                            ? t('userConsoleManagementForm.accessoriesError')
                            : ''}
                    </p>

                    <input
                        type="number"
                        className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                        placeholder={t('userConsoleManagementForm.amount') ?? ''}
                        {...register('amount', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.amount?.type === 'required'
                            ? t('userConsoleManagementForm.amountError')
                            : ''}
                    </p>
                    <label htmlFor="images" className="cursor-pointer">
                        <span className="p-1 mr-1 bg-[rgb(255,255,255)] text-[rgb(0,0,0)] rounded-sm">
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
                        hidden
                        className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                        placeholder={t('userConsoleManagementForm.images') ?? ''}
                        {...register('images', {
                            required: true,
                            validate: (files) => files.length > 1 || 'aaa'
                        })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.images?.type === 'required' || errors.images?.type === 'validate'
                            ? t('userConsoleManagementForm.imagesError')
                            : ''}
                    </p>
                </div>
                <div className="flex flex-col items-center pt-5 text-fs-h2">
                    <button className="bg-bg-extra py-1 px-7 rounded" type="submit">
                        {t('userConsoleManagementForm.create') ?? ''}
                    </button>
                </div>
            </div>
            <div className="text-fs-primary text-danger-500 text-center">{error}</div>
        </form>
    )
}

export default MyConsolesCreatePage
