import { useParams } from 'react-router'
import {
    UserConsoleStatus,
    UserConsoleGet,
    UserConsoleStatusUpdate,
    getConsoleStatusString,
    getConsoleStatusStringBorrower
} from '../models/UserConsole'
import { useEffect, useState } from 'react'
import {
    deleteUserConsole,
    getUserConsole,
    terminateContractByBorrower,
    terminateContractByLender,
    updateUserConsoleStatus
} from '../api/UserConsolesApi'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { imagePathToURL } from '../models/Image'
import Button from '../components/ui/Button'
import { useAuth } from '../contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import { contactLender } from '../api/ChatsApi'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'
import { BorrowingGet, BorrowingStatus } from '../models/Borrowing'
import { getBorrowingById } from '../api/BorrowingsApi'

interface Props {
    status: UserConsoleStatus
}

function UserConsolePage() {
    const { id } = useParams()
    const { t } = useTranslation()
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
        control,
        setValue
    } = useForm<Props>()
    const options = [
        { value: UserConsoleStatus.UNCONFIRMED, label: t('userConsolePage.statusUnconfirmed') },
        { value: UserConsoleStatus.AT_PLATFORM, label: t('userConsolePage.statusAtPlatform') },
        { value: UserConsoleStatus.RESERVED, label: t('userConsolePage.statusReserved') },
        { value: UserConsoleStatus.AT_LENDER, label: t('userConsolePage.statusAtLender') },
        {
            value: UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER,
            label: t('userConsolePage.statusTerminatingLender')
        },
        {
            value: UserConsoleStatus.AWAITING_TERMINATION_BY_BORROWER,
            label: t('userConsolePage.statusTerminatingBorrower')
        }
    ]
    const [borrowing, setBorrowing] = useState<BorrowingGet>()
    const [userConsole, setUserConsole] = useState<UserConsoleGet>()
    const { user } = useAuth()
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        update()
    }, [])

    const update = () => {
        getUserConsole(parseInt(id ?? '1')).then((result) => {
            setUserConsole(result.data)
            if (user?.role === 'borrower' || user?.role === 'admin') {
                if (result.data.borrowingId !== undefined) {
                    getBorrowingById((result.data as UserConsoleGet).borrowingId)
                        .then((response) => {
                            setBorrowing(response.data)
                        })
                        .finally(() => setLoading(false))
                }
            } else {
                setLoading(false)
            }
        })
    }

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
            <div className="ml-5 pr-10 md:pr-0 mb-10 min-w-[300px] md:min-w-[400px] w-screen  md:max-w-max">
                <div className="text-fs-h1">{t('userConsolePage.consoleTitle')}</div>
                <hr className="pb-2" />
                <div className="font-bold">{t('userConsolePage.consoleName')}</div>
                <div className="ml-3">{userConsole?.console.name}</div>
                <div className="font-bold">{t('userConsolePage.consoleDescription')}</div>
                <div className="ml-3">{userConsole?.console.description}</div>
                <div className="font-bold">{t('userConsolePage.dailyPrice')}</div>
                <div className="ml-3">
                    {user?.role !== 'borrower'
                        ? (Math.round((userConsole?.console.dailyPrice ?? 0) * 0.6 * 100) / 100) *
                          30
                        : userConsole?.console.dailyPrice}{' '}
                    €
                </div>

                <div className="text-fs-h1 mt-5">{t('userConsolePage.lendTitle')}</div>
                <hr className="pb-2" />
                <div className="font-bold">{t('userConsolePage.lendAmount')}</div>
                <div className="ml-3">{userConsole?.amount}</div>
                <div className="font-bold">{t('userConsolePage.lendAccessories')}</div>
                <div className="ml-3">{userConsole?.accessories}</div>
                <div className="font-bold">{t('userConsolePage.lendStatus')}</div>
                {user?.role === 'borrower' && !loading && (
                    <div className="ml-3">
                        {t(
                            getConsoleStatusStringBorrower(
                                userConsole?.consoleStatus ?? UserConsoleStatus.AT_LENDER
                            )
                        )}
                    </div>
                )}
                {user?.role === 'lender' && !loading && (
                    <div className="ml-3">
                        {t(
                            getConsoleStatusString(
                                userConsole?.consoleStatus ?? UserConsoleStatus.UNCONFIRMED
                            )
                        )}
                    </div>
                )}
                {user?.role === 'admin' && !loading && (
                    <div>
                        <Controller
                            control={control}
                            name="status"
                            rules={{ required: true }}
                            render={() => (
                                <Select
                                    className="mb-5 max-w-[300px]"
                                    defaultValue={
                                        options.filter(
                                            (x) => x.value === userConsole?.consoleStatus
                                        )[0]
                                    }
                                    theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                            ...theme.colors,
                                            text: `var(${'--color-text-primary'})`,
                                            neutral0: `var(${'--color-bg-secondary'})`,
                                            neutral80: `var(${'--color-text-primary'})`,
                                            primary25: `var(${'--color-bg-primary'})`,
                                            primary50: `var(${'--color-bg-primary'})`
                                        }
                                    })}
                                    options={options}
                                    onChange={(e) => {
                                        setValue(
                                            'status',
                                            e?.value ?? UserConsoleStatus.UNCONFIRMED
                                        )
                                    }}
                                />
                            )}
                        />
                        <Button
                            text={t('userConsolePage.changeStatus')}
                            dialog={true}
                            dialogBody={t('button.dialogBody2')}
                            onClick={() => {
                                updateUserConsoleStatus(
                                    new UserConsoleStatusUpdate(userConsole!.id, watch('status'))
                                ).then(() => {
                                    update()
                                })
                            }}
                        />
                    </div>
                )}
                {user?.role === 'lender' &&
                    !loading &&
                    (userConsole?.consoleStatus === UserConsoleStatus.AT_PLATFORM ||
                        userConsole?.consoleStatus === UserConsoleStatus.RESERVED ||
                        userConsole?.consoleStatus === UserConsoleStatus.AT_LENDER) && (
                        <div className="mt-5">
                            <Button
                                text={t('userConsolePage.initiateTermination')}
                                id={1}
                                dialog={true}
                                dialogBody={t('button.dialogBody1')}
                                onClick={() => {
                                    terminateContractByLender(userConsole?.id ?? -1).then(() =>
                                        update()
                                    )
                                }}
                            />
                        </div>
                    )}
                {user?.role === 'borrower' &&
                    borrowing?.status === BorrowingStatus.ACTIVE &&
                    !loading &&
                    userConsole?.consoleStatus === UserConsoleStatus.AT_LENDER && (
                        <div className="mt-5">
                            <Button
                                text={t('userConsolePage.initiateTermination')}
                                id={2}
                                dialog={true}
                                dialogBody={t('button.dialogBody1')}
                                onClick={() => {
                                    terminateContractByBorrower(userConsole?.id ?? -1).then(() =>
                                        update()
                                    )
                                }}
                            />
                        </div>
                    )}
                {user?.role === 'admin' && !loading && borrowing !== undefined && (
                    <div>
                        <div className="text-fs-h1 mt-5">{t('userConsolePage.borrowerTitle')}</div>
                        <hr className="pb-2" />
                        <div className="font-bold">{t('userConsolePage.borrowerCompanyName')}</div>
                        <div className="ml-3">{borrowing?.user.companyName}</div>
                        <div className="font-bold">{t('userConsolePage.borrowerCompanyCode')}</div>
                        <div className="ml-3">{borrowing?.user.companyCode}</div>
                        <div className="font-bold">{t('userConsolePage.borrowerEmail')}</div>
                        <div className="ml-3 mb-3">{borrowing?.user.email}</div>
                    </div>
                )}
                {user?.role === 'admin' && !loading && (
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
                            id={3}
                            onClick={() => {
                                contactLender(userConsole!.id).then(() => {
                                    getUserConsole(parseInt(id ?? '1')).then((result) => {
                                        window.location.href = `/chats/${result.data.conversationId}`
                                    })
                                })
                            }}
                        />
                    </div>
                )}
                {user?.role === 'admin' && !loading && (
                    <div className=" w-max mt-10">
                        <Button
                            text={t('userConsolePage.delete')}
                            id={4}
                            color="red"
                            onClick={() => {
                                deleteUserConsole(userConsole!.id).then(
                                    () => (window.location.href = '/userConsoles')
                                )
                            }}
                            dialog={true}
                            disabled={userConsole?.consoleStatus !== UserConsoleStatus.UNCONFIRMED}
                            dialogBody={t('button.dialogBody4')}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserConsolePage
