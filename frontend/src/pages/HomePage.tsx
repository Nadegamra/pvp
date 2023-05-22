import { imagePathToURL } from '../models/Image'
import { useTranslation } from 'react-i18next'
import { Carousel } from 'react-responsive-carousel'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'

import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
    IconButton,
    Input,
    Textarea
} from '@material-tailwind/react'
import { ConsoleGet } from '../models/Console'
import { getConsoles } from '../api/ConsolesApi'
import { useEffect, useState } from 'react'

function HomePage() {
    const { t } = useTranslation()
    const [consoles, setConsoles] = useState<ConsoleGet[]>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getConsoles().then((response) => {
            setConsoles(response.data)
            setLoading(false)
        })
    }, [])

    return (
        <div className="bg-[url('https://images8.alphacoders.com/922/922129.png')] bg-black/75 bg-repeat-y w-full">
            <div className="max-w-8xl container relative mx-auto">
                <div className="content-around w-full flex flex-wrap items-center">
                    <div className="w-full px-4 text-right mt-12">
                        <Typography variant="h1" color="black" className="mb-6 font-black">
                            {t('home.title1')}
                        </Typography>
                        <Typography variant="h1" color="black" className="mb-6 font-black">
                            ShareIt
                        </Typography>
                        <Typography variant="h1" color="black" className="mb-6 font-black">
                            {t('home.title2')}
                        </Typography>
                    </div>
                    <div className="w-full mt-16 bg-gray-50 px-4 pb-20 pt-4">
                        <div className="flex flex-wrap items-center justify-center">
                            <div className="w-full md:w-5/12 lg:w-1/2">
                                <div className="flex flex-col items-center bg-bg-tertiary border rounded-lg p-5">
                                    <Typography variant="h3" className="mb-3 text-fs-h2">
                                        {t('home.selectBorrowText')}
                                    </Typography>
                                    <HashLink
                                        to="#besiskolinantiems"
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                        {t('home.selectBorrowButton')}
                                    </HashLink>
                                </div>
                            </div>
                            <div className="w-full md:w-5/12 lg:w-1/2 mt-6 md:mt-0">
                                <div className="flex flex-col items-center bg-bg-tertiary border rounded-lg p-5">
                                    <Typography variant="h3" className="mb-3 text-fs-h2">
                                        {t('home.selectLendText')}
                                    </Typography>
                                    <HashLink
                                        to="#skolintojams"
                                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                        {t('home.selectLendButton')}
                                    </HashLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-60"></div>
            <div id="besiskolinantiems" className="h-20"></div>
            <div className="bg-bg-tertiary mt-16 mb-8 border py-5 h-96 flex flex-col lg:flex-row h-max">
                <div className="flex-1">
                    <div className="ml-10 text-fs-h1">{t('home.borrowers1')}</div>
                    <div className="mx-14 text-fs-h2">
                        {t('home.borrowers2')} {t('home.borrowers4')} {t('home.borrowers5')}{' '} 
                        {t('home.borrowers6')}
                        <div className="ml-14 mt-5">
                            <Link
                                to="/register"
                                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                                {t('home.borrowers3')}
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex justify-end w-full my-5 md:my-0 ml-6 md:ml-0">
                    <div className="max-w-[1000px] mr-12">
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            infiniteLoop={true}
                            autoPlay={true}
                            interval={3000}
                            transitionTime={500}
                            emulateTouch={true}>
                            {consoles?.map((console) => (
                                <div
                                    key={console.id}
                                    className="rounded-lg cursor-pointer select-none">
                                    <img
                                        className="rounded-md"
                                        src={imagePathToURL(console.images[0].path, 1000)}
                                        alt={console.images[0].name}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </div>
            <div id="skolintojams" className="h-20"></div>
            <div className="bg-bg-tertiary mt-16 border py-5 h-96 flex-1 h-max">
                <div className="ml-10 text-fs-h1">{t('home.lenders1')}</div>
                <div className="mx-14 text-fs-h2">
                    <div>{t('home.lenders2')}</div>
                    <div>{t('home.lenders3')}</div>
                    <div>{t('home.lenders5')}</div>
                    <div className="mt-5">
                        <Link
                            to="/register"
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                            {t('home.lenders4')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
