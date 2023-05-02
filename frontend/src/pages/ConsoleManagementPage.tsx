import { useParams } from 'react-router'
import { ConsoleGet, ConsoleUpdate } from '../models/Console'
import { useEffect, useState } from 'react'
import { getConsole, updateConsole } from '../api/ConsolesApi'
import { useForm } from 'react-hook-form'
import { imagePathToURL } from '../models/Image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { useTranslation } from 'react-i18next'
import { Carousel } from 'react-responsive-carousel'

interface Props {
    name: string
    description: string
    dailyPrice: number
}

function ConsoleManagementPage() {
    const { t } = useTranslation()
    const { id } = useParams()
    const [console, setConsole] = useState<ConsoleGet>()
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
            <div className="m-10 mr-32">
                <Carousel className="w-[800px] my-auto">
                    {console?.images.map((image) => (
                        <div>
                            <img
                                alt={image.name}
                                src={imagePathToURL(image.path, 800)}
                                className="rounded-lg"
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
            <form
                className="select-none bg-bg-primary text-t-primary pt-20"
                onSubmit={handleSubmit(async (data) => {
                    setError('')
                    await updateConsole(
                        new ConsoleUpdate(
                            console!.id,
                            watch('name'),
                            watch('description'),
                            watch('dailyPrice'),
                            []
                        )
                    )
                    window.location.reload()
                })}>
                <div className="pt-6 text-fs-h1 text-center">{console?.name}</div>
                <hr className="pb-3" />
                <div>
                    <div className="font-bold text-left">Name</div>
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

                    <div className="font-bold text-left">Description</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md w-[300px] mb-3"
                        type="text"
                        {...register('description', { required: true })}
                        placeholder={t('consoleManagementForm.description') ?? ''}
                    />
                    {errors.description?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            t('consoleManagementForm.descriptionError')
                        </p>
                    )}

                    <div className="font-bold text-left">Daily price</div>
                    <input
                        className="bg-bg-primary border p-2 rounded-md w-[300px] mb-3"
                        type="number"
                        {...register('dailyPrice', { required: true })}
                        placeholder={t('consoleManagementForm.dailyPrice') ?? ''}
                    />
                    {errors.dailyPrice?.type === 'required' && (
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            t('consoleManagementForm.dailyPrice')
                        </p>
                    )}

                    <div className="flex flex-col items-center pt-5 text-fs-h2">
                        <button className="bg-bg-extra py-1 px-7 rounded" type="submit">
                            {t('consoleManagementForm.update') ?? ''}
                        </button>
                    </div>
                </div>

                <div className="text-fs-primary text-danger-500 text-center">{error}</div>
            </form>
        </div>
    )
}

export default ConsoleManagementPage
