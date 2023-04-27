import { useParams } from 'react-router'
import { ConsoleGet, ConsoleUpdate } from '../models/Console'
import { useEffect, useState } from 'react'
import { getConsole, updateConsole } from '../api/ConsolesApi'
import { useForm } from 'react-hook-form'
import { imagePathToURL } from '../models/Image'
import 'pure-react-carousel/dist/react-carousel.es.css'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel'
import { useTranslation } from 'react-i18next'

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
            <div className="w-[500px] h-[400px] m-10 bg-bg-tertiary">
                <CarouselProvider
                    naturalSlideWidth={500}
                    naturalSlideHeight={400}
                    totalSlides={console?.images.length ?? 0}>
                    <Slider>
                        {console?.images.map((image, index) => (
                            <Slide index={index}>
                                <img
                                    alt={image.name}
                                    src={imagePathToURL(image.path, 500)}
                                    className="rounded-lg"
                                />
                            </Slide>
                        ))}
                    </Slider>
                    <ButtonBack className="translate-y-[-200px] translate-x-[-20px] text-fs-h1">
                        {'<'}
                    </ButtonBack>
                    <ButtonNext className="translate-y-[-200px] translate-x-[500px] text-fs-h1">
                        {'>'}
                    </ButtonNext>
                </CarouselProvider>
            </div>
            <form
                className="flex flex-col items-center select-none bg-bg-primary text-t-primary pt-10"
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
                <div className="bg-bg-secondary p-7 rounded w-[400px]">
                    <div className="py-6 text-fs-h1 text-center">{console?.name}</div>

                    <div className="flex flex-col mx-[10px]">
                        <input
                            className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                            type="text"
                            {...register('name', { required: true })}
                            placeholder={t('consoleManagementForm.name') ?? ''}
                        />
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {errors.name?.type === 'required'
                                ? t('consoleManagementForm.nameError')
                                : ''}
                        </p>

                        <input
                            className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                            type="text"
                            {...register('description', { required: true })}
                            placeholder={t('consoleManagementForm.description') ?? ''}
                        />
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {errors.description?.type === 'required'
                                ? t('consoleManagementForm.descriptionError')
                                : ''}
                        </p>

                        <input
                            className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                            type="number"
                            {...register('dailyPrice', { required: true })}
                            placeholder={t('consoleManagementForm.dailyPrice') ?? ''}
                        />
                        <p className="mb-3 text-fs-primary text-danger-500 h-3">
                            {errors.dailyPrice?.type === 'required'
                                ? t('consoleManagementForm.dailyPrice')
                                : ''}
                        </p>

                        <div className="flex flex-col items-center pt-5 text-fs-h2">
                            <button className="bg-bg-extra py-1 px-7 rounded" type="submit">
                                {t('consoleManagementForm.update') ?? ''}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-fs-primary text-danger-500 text-center">{error}</div>
            </form>
        </div>
    )
}

export default ConsoleManagementPage
