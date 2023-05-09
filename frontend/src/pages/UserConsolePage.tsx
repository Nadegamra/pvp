import { useParams } from 'react-router'
import { ConsoleStatus, UserConsoleGet, getConsoleStatusString } from '../models/UserConsole'
import { useEffect, useState } from 'react'
import { getUserConsole, terminateContract } from '../api/UserConsolesApi'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { imagePathToURL } from '../models/Image'
import Button from '../components/ui/Button'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'

function UserConsolePage() {
    const { id } = useParams()
    const { t } = useTranslation()
    const [userConsole, setUserConsole] = useState<UserConsoleGet>()
    const { user } = useAuth()
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        getUserConsole(parseInt(id ?? '1')).then((result) => {
            setUserConsole(result.data)
            setLoading(false)
        })
    }, [])

    return (
        <div className="mt-10 mx-auto flex flex-col md:flex-row">
            <div className="md:h-[400px] md:w-[700px] text-center align-middle mx-10">
                {userConsole !== undefined && (
                    <Carousel>
                        {userConsole?.images.map((value) => (
                            <div>
                                <p className="legend">{value.name}</p>
                                <img src={imagePathToURL(value.path, 1080)} alt={value.name} />
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>
            <div className="ml-5 md:ml-0 mb-10 min-w-[400px]">
                <div className="text-fs-h1">{t('userConsolePage.consoleTitle')}</div>
                <hr className="pb-2" />
                <div className="font-bold">{t('userConsolePage.consoleName')}</div>
                <div className="ml-3">{userConsole?.console.name}</div>
                <div className="font-bold">{t('userConsolePage.consoleDescription')}</div>
                <div className="ml-3">{userConsole?.console.description}</div>
                <div className="font-bold">{t('userConsolePage.consoleIncome')}</div>
                <div className="ml-3">
                    {(Math.round((userConsole?.console.dailyPrice ?? 0) * 0.6 * 100) / 100) * 30} €
                </div>

                <div className="text-fs-h1 mt-5">{t('userConsolePage.lendTitle')}</div>
                <hr className="pb-2" />
                <div className="font-bold">{t('userConsolePage.lendAmount')}</div>
                <div className="ml-3">{userConsole?.amount}</div>
                <div className="font-bold">{t('userConsolePage.lendAccessories')}</div>
                <div className="ml-3">{userConsole?.accessories}</div>
                <div className="font-bold">{t('userConsolePage.lendStatus')}</div>
                <div className="ml-3">
                    {t(
                        getConsoleStatusString(
                            userConsole?.consoleStatus ?? ConsoleStatus.UNCONFIRMED
                        )
                    )}
                </div>
                {user?.role === 'lender' &&
                    !loading &&
                    userConsole?.consoleStatus !== ConsoleStatus.UNCONFIRMED &&
                    userConsole?.consoleStatus !== ConsoleStatus.AWAITING_TERMINATION && (
                        <div className="mt-5">
                            <Button
                                text={t('userConsolePage.initiateTermination')}
                                dialog={true}
                                onClick={() => {
                                    terminateContract(userConsole?.id ?? -1)
                                }}
                            />
                        </div>
                    )}
                {user?.role === 'admin' && (
                    <div>
                        <div className="text-fs-h1 mt-5">{t('userConsolePage.userTitle')}</div>
                        <hr className="pb-2" />
                        <div className="font-bold">{t('userConsolePage.userFname')}</div>
                        <div className="ml-3">{userConsole?.user.firstName}</div>
                        <div className="font-bold">{t('userConsolePage.userLname')}</div>
                        <div className="ml-3">{userConsole?.user.lastName}</div>
                        <div className="font-bold">{t('userConsolePage.userEmail')}</div>
                        <div className="ml-3 mb-3">{userConsole?.user.email}</div>
                        <Button
                            text={t('userConsolePage.contactUser')}
                            dialog={false}
                            onClick={() => {
                                terminateContract(userConsole?.id ?? -1)
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserConsolePage
