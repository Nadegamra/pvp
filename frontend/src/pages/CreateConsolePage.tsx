import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { addConsole } from '../api/ConsolesApi'
import { ConsoleAdd } from '../models/Console'
import { ImageAdd } from '../models/Image'

interface Props {
    name: string
    description: string
    dailyPrice: number
    images: FileList
}

const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
    })

function CreateConsolePage() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm<Props>()
    const [error, setError] = useState('')

    return (
        <form
            className="flex flex-col items-center select-none bg-bg-primary text-t-primary pt-10"
            onSubmit={handleSubmit(async (data) => {
                setError('')
                const images: ImageAdd[] = []

                for (let i = 0; i < data.images.length; i++) {
                    const image = data.images.item(i)
                    if (image !== null) {
                        images.push(
                            new ImageAdd(image.name, '', -1, (await toBase64(image)).substring(23))
                        )
                    }
                }

                const consoleAdd: ConsoleAdd = new ConsoleAdd(
                    data.name,
                    data.description,
                    data.dailyPrice,
                    images
                )
                console.log(consoleAdd)
                addConsole(consoleAdd)
            })}>
            <div className="w-[400px] bg-bg-secondary p-7 rounded">
                <div className="py-6 text-fs-h1 text-center">New Console</div>
                <div className="mx-[10px]">
                    <input
                        type="text"
                        className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                        placeholder="Name"
                        {...register('name', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.name?.type === 'required' ? 'Name is required' : ''}
                    </p>

                    <input
                        type="text"
                        className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                        placeholder="Description"
                        {...register('description', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.description?.type === 'required' ? 'Description is required' : ''}
                    </p>

                    <input
                        type="number"
                        className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                        placeholder="Daily Price"
                        {...register('dailyPrice', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.dailyPrice?.type === 'required' ? 'Daily price is required' : ''}
                    </p>

                    <input
                        type="file"
                        multiple
                        className="w-full bg-bg-secondary border-b focus:outline-none text-fs-h2"
                        placeholder="Images"
                        {...register('images', { required: true })}
                    />
                    <p className="mb-3 text-fs-primary text-danger-500 h-3">
                        {errors.images?.type === 'required' ? 'Images are required' : ''}
                    </p>
                </div>
                <div className="flex flex-col items-center pt-5 text-fs-h2">
                    <button className="bg-bg-extra py-1 px-7 rounded" type="submit">
                        Create
                    </button>
                </div>
            </div>
            <div className="text-fs-primary text-danger-500 text-center">{error}</div>
        </form>
    )
}

export default CreateConsolePage
