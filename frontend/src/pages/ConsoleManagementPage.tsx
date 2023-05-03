import { useParams } from 'react-router'
import { ConsoleGet, ConsoleUpdate } from '../models/Console'
import { useEffect, useState } from 'react'
import { getConsole, removeImage, updateConsole } from '../api/ConsolesApi'
import { useForm } from 'react-hook-form'
import { imagePathToURL } from '../models/Image'
import { useTranslation } from 'react-i18next'
import Button from '../components/ui/Button'

interface Props {
    name: string
    description: string
    dailyPrice: number
}

function ConsoleManagementPage() {
    const { t } = useTranslation()
    const { id } = useParams()
    const [consoleGet, setConsole] = useState<ConsoleGet>()
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<Props>()
    const [error, setError] = useState('')

    useEffect(() => {
        getConsole(parseInt(id ?? '-1')).then((response) => {
            setConsole(response.data)
            setValue('name', response.data.name ?? '')
            setValue('description', response.data.description ?? '')
            setValue('dailyPrice', response.data.dailyPrice ?? 0)
        })
    }, [])

    return (
        <div className="flex flex-row">
            <form className="select-none bg-bg-primary text-t-primary pt-10 mx-auto">
                <div className="pt-6 text-fs-h1">{t('consoleManagementForm.console')}</div>
                <hr className="pb-3" />
                <div>
                    <div className="font-bold text-left">{t('consoleManagementForm.name')}</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md w-[300px] mb-3"
                        type="text"
                        {...register('name', { required: true })}
                        placeholder={t('consoleManagementForm.name') ?? ''}
                    />
                    {errors.name?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {t('consoleManagementForm.nameError')}
                        </p>
                    )}

                    <div className="font-bold text-left">
                        {t('consoleManagementForm.description')}
                    </div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md w-[300px] mb-3"
                        type="text"
                        {...register('description', { required: true })}
                        placeholder={t('consoleManagementForm.description') ?? ''}
                    />
                    {errors.description?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {t('consoleManagementForm.descriptionError')}
                        </p>
                    )}

                    <div className="font-bold text-left">
                        {t('consoleManagementForm.dailyPrice')}
                    </div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md w-[300px] mb-3"
                        type="number"
                        {...register('dailyPrice', { required: true })}
                        placeholder={t('consoleManagementForm.dailyPrice') ?? ''}
                    />
                    {errors.dailyPrice?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {t('consoleManagementForm.dailyPrice')}
                        </p>
                    )}
                    <div className="pt-5 text-fs-h2">
                        <Button
                            text={t('consoleManagementForm.update') ?? ''}
                            onClick={handleSubmit(async () => {
                                setError('')
                                await updateConsole(
                                    new ConsoleUpdate(
                                        consoleGet!.id,
                                        watch('name'),
                                        watch('description'),
                                        watch('dailyPrice'),
                                        []
                                    )
                                )
                                window.location.reload()
                            })}
                        />
                        {/* <button className="bg-bg-extra py-1 px-7 rounded" type="submit"></button> */}
                    </div>
                </div>
                <div className="pt-6 text-fs-h1">{t('consoleManagementForm.images')}</div>
                <hr className="pb-3" />
                <div className="mb-10">
                    <div className="grid grid-cols-4 gap-2 items-center">
                        {consoleGet?.images.map((image) => (
                            <div
                                key={image.id}
                                className="w-[200px] h-[140px] border whitespace-nowrap">
                                <div className="inline-block h-full align-middle"></div>
                                <img
                                    alt={image.name}
                                    key={image.id}
                                    src={imagePathToURL(image.path, 200)}
                                    className="rounded-lg align-middle before:inline-block w-[200px] inline-block"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="mb-3 mt-3">
                        <input
                            className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            id="formFileLg"
                            type="file"
                        />
                    </div>
                    <div className="text-fs-primary text-danger-500 text-center">{error}</div>
                    <div className="pt-5 text-fs-h2">
                        <Button
                            text={t('consoleManagementForm.update') ?? ''}
                            onClick={(e) => {
                                console.log('a')
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ConsoleManagementPage
