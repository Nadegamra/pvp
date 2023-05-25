import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { ConsoleGet } from '../../models/Console'
import { useForm } from 'react-hook-form'
import { ImageAdd, imagePathToURL } from '../../models/Image'
import Button from '../ui/Button'
import { addImage, getConsole, removeImage } from '../../api/ConsolesApi'

interface Props {
    images: FileList
}

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
    })

function ConsoleImagesUpdateForm() {
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
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getConsole(parseInt(id ?? '-1'))
            .then((response) => {
                setConsole(response.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return (
        <form
            className="mb-10"
            onSubmit={handleSubmit(async () => {
                setLoading(true)
                // Delete images
                const oldImages = consoleGet!.images
                for (let i = 0; i < oldImages.length; i++) {
                    if (oldImages[i].toDelete) {
                        await removeImage(oldImages[i].id)
                    }
                }
                // Add new images
                const newImageFiles = watch('images')
                for (let i = 0; i < newImageFiles.length; i++) {
                    const image = newImageFiles.item(i)
                    if (image !== null) {
                        let base64 = await toBase64(image)
                        do {
                            base64 = base64.substring(1)
                        } while (base64[0] != ',')
                        base64 = base64.substring(1)
                        await addImage(new ImageAdd(image.name, '', base64, consoleGet!.id))
                    }
                }
                // Refresh data
                await getConsole(parseInt(id ?? '-1')).then((response) => {
                    setConsole(response.data)
                })
                setMessage(t('profile.dataSuccessMessage') ?? '')
                setLoading(false)
            })}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 m-3">
                {consoleGet?.images
                    .filter((image) => !image.toDelete)
                    .map((image) => (
                        <div key={image.id} className="whitespace-nowrap mb-5 md:mb-0 mx-auto">
                            <div className="inline-block h-full align-middle"></div>
                            <span
                                className="material-symbols-outlined absolute translate-x-[-13px] translate-y-[-13px] cursor-pointer select-none"
                                onClick={() => {
                                    const copy: ConsoleGet = JSON.parse(JSON.stringify(consoleGet))

                                    for (let i = 0; i < copy.images.length; i++) {
                                        if (copy.images[i].id == image.id) {
                                            copy.images[i].toDelete = true
                                        }
                                    }
                                    setConsole(copy)
                                }}>
                                cancel
                            </span>
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
                    multiple
                    accept="image/*"
                    {...register('images', {
                        validate: (files) => {
                            for (let i = 0; i < files.length; i++) {
                                const file = files.item(i)
                                if (file === null || !file.type.startsWith('image/')) {
                                    return 'userConsoleManagementForm.invalidFileError'
                                }
                            }
                        }
                    })}
                />
                <p className="text-fs-primary text-danger-500 h-3">
                    {t(errors.images?.message ?? '')}
                </p>
            </div>
            <div className="pt-5 text-fs-h2">
                <Button
                    dialog={false}
                    text={t('consoleManagementForm.update') ?? ''}
                    dialogBody=""
                    submit={true}
                />
            </div>
            {message !== '' && (
                <div className="pt-4 text-fs-primary text-success-500">{message}</div>
            )}
            {loading && (
                <div>
                    <div className="w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin"></div>
                </div>
            )}
        </form>
    )
}

export default ConsoleImagesUpdateForm
