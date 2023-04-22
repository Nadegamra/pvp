import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

function HomePage() {
    const { t } = useTranslation()
    return (
        <div>
            <div className="bg-bg-tertiary py-3 pt-32">
                <div className="text-right text-fs-h1 mr-[20%] ">{t('home.title1')}</div>
                <div className="text-right text-fs-h1 mr-[20%]">ShareIt</div>
                <div className="text-right text-fs-h2 mr-[20%] mb-10">{t('home.title2')}</div>
                <div className="flex-row flex mt-60 mb-60">
                    <div className="flex-1"></div>
                    <div className="flex flex-col">
                        {t('home.selectBorrowText')}
                        <a
                            href="#besiskolinantiems"
                            className="p-5 bg-bg-extra rounded-lg text-center m-3">
                            {t('home.selectBorrowButton')}
                        </a>
                    </div>
                    <div className="flex-1"></div>
                    <div className="flex flex-col">
                        {t('home.selectLendText')}
                        <a
                            href="#skolintojams"
                            className="p-5 bg-bg-extra rounded-lg text-center m-3">
                            {t('home.selectLendButton')}
                        </a>
                    </div>
                    <div className="flex-1"></div>
                </div>
            </div>
            <div className="h-60"></div>
            <div id="besiskolinantiems" className="h-20"></div>
            <div className="bg-bg-tertiary mt-32 mb-80 py-5 h-96">
                <div className="text-fs-h1 ml-10 ">{t('home.borrowers1')}</div>
                <div className="text-fs-h2 ml-14">
                    {t('home.borrowers2')}
                    <div className="mt-5">
                        <Link
                            to="/registerBorrower"
                            className="cursor-pointer select-none my-auto mr-7 bg-bg-extra p-3 rounded-lg w-64">
                            {t('home.borrowers3')}
                        </Link>
                    </div>
                </div>
            </div>
            <div id="skolintojams" className="h-20"></div>
            <div className="bg-bg-tertiary mt-32 mb-80 py-5 h-96">
                <div className="text-fs-h1 ml-10">{t('home.lenders1')}</div>
                <div className="text-fs-h2 ml-14 mb-60">
                    <div>{t('home.lenders2')}</div>
                    <div>{t('home.lenders3')}</div>
                    <div className="mt-5">
                        <Link
                            to="/register"
                            className="cursor-pointer select-none my-auto mr-7 bg-bg-extra p-3 rounded-lg w-64">
                            {t('home.lenders4')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
