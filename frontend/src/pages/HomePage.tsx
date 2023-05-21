import { imagePathToURL } from '../models/Image'
import { useTranslation } from 'react-i18next'
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
                    <div className="w-full px-4 text-left lg:w-8/12 mt-12">
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
                                <div className="flex flex-col items-center bg-[#161b22] border border-white rounded-lg p-5">
                                    <Typography variant="h3" className="mb-3 font-bold text-white">
                                        {t('home.selectBorrowText')}
                                    </Typography>
                                    <Link to="#besiskolinantiems" className="p-5 bg-bg-extra rounded-lg text-center m-3">
                                        {t('home.selectBorrowButton')}
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full md:w-5/12 lg:w-1/2 mt-6 md:mt-0">
                                <div className="flex flex-col items-center bg-[#161b22] border border-white rounded-lg p-5">
                                    <Typography variant="h3" className="mb-3 font-bold text-white">
                                        {t('home.selectLendText')}
                                    </Typography>
                                    <Link to="#skolintojams" className="p-5 bg-bg-extra rounded-lg text-center m-3">
                                        {t('home.selectLendButton')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-60"></div>
            <div id="besiskolinantiems" className="h-20"></div>
            <div className="bg-bg-tertiary mt-16 mb-8 py-5 h-96">
                <div className="ml-10 text-fs-h1">{t('home.borrowers1')}</div>
                <div className="ml-14 text-fs-h2">
                    {t('home.borrowers2')}
                    <div className="mt-5">
                        <Link to="/registerBorrower" className="cursor-pointer select-none my-auto mr-7 bg-bg-extra p-3 rounded-lg w-64">
                            {t('home.borrowers3')}
                        </Link>
                    </div>
                </div>
                <div className="flex justify-center">
                    {consoles?.map((console) => (
                        <div className="rounded-lg w-[250px] m-3 cursor-pointer select-none">
                            <img
                                className="rounded-md"
                                src={imagePathToURL(console.images[0].path, 250)}
                                alt={console.images[0].name}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div id="skolintojams" className="h-20"></div>
            <div className="bg-bg-tertiary mt-16 mb-80 py-5 h-96">
                <div className="ml-10 text-fs-h1">{t('home.lenders1')}</div>
                <div className="ml-14 text-fs-h2">
                    <div>{t('home.lenders2')}</div>
                    <div>{t('home.lenders3')}</div>
                    <div className="mt-5">
                        <Link to="/register" className="cursor-pointer select-none my-auto mr-7 bg-bg-extra p-3 rounded-lg w-64">
                            {t('home.lenders4')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage