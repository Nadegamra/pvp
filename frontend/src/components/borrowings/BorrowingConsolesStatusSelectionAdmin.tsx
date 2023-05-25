import { Dispatch, SetStateAction, useEffect } from 'react'
import { UserConsoleStatus } from '../../models/UserConsole'
import { t } from 'i18next'
import { useAuth } from '../../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

function BorrowingConsolesStatusSelectionAdmin({
    status,
    setStatus,
    enabled
}: {
    status: UserConsoleStatus
    setStatus: Dispatch<SetStateAction<UserConsoleStatus>>
    enabled: boolean[]
}) {
    const { user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        const search = location.search
        const state = new URLSearchParams(search).get('state')
        if (state !== null) {
            console.log(state)
            if (parseInt(state) === 2) {
                setStatus(UserConsoleStatus.RESERVED)
            }
            if (parseInt(state) === 3) {
                setStatus(UserConsoleStatus.AT_LENDER)
            }
            if (parseInt(state) === 4) {
                setStatus(UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER)
            }
            if (parseInt(state) === 5) {
                setStatus(UserConsoleStatus.AWAITING_TERMINATION_BY_BORROWER)
            }
        }
    }, [])
    return (
        <div
            className="flex flex-col md:flex-row mx-auto w-max rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group">
            {enabled[0] && (
                <button
                    type="button"
                    className={
                        status === UserConsoleStatus.RESERVED
                            ? 'select-none inline-block bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                            : 'select-none inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                    }
                    onClick={() => {
                        setStatus(UserConsoleStatus.RESERVED)
                        navigate(`?state=2`, { replace: true })
                    }}>
                    {t('userConsolePage.statusReserved')}
                </button>
            )}
            {enabled[1] && (
                <button
                    type="button"
                    className={
                        status === UserConsoleStatus.AT_LENDER
                            ? 'select-none inline-block bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                            : 'select-none inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                    }
                    onClick={() => {
                        setStatus(UserConsoleStatus.AT_LENDER)
                        navigate(`?state=3`, { replace: true })
                    }}>
                    {t('userConsolePage.statusAtLender')}
                </button>
            )}
            {enabled[2] && (
                <button
                    type="button"
                    className={
                        status === UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER
                            ? 'select-none inline-block bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                            : 'select-none inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                    }
                    onClick={() => {
                        setStatus(UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER)
                        navigate(`?state=4`, { replace: true })
                    }}>
                    {t('userConsolePage.statusTerminatingLender')}
                </button>
            )}
            {enabled[3] && (
                <button
                    type="button"
                    className={
                        status === UserConsoleStatus.AWAITING_TERMINATION_BY_BORROWER
                            ? 'select-none inline-block bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                            : 'select-none inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                    }
                    onClick={() => {
                        setStatus(UserConsoleStatus.AWAITING_TERMINATION_BY_BORROWER)
                        navigate(`?state=5`, { replace: true })
                    }}>
                    {t('userConsolePage.statusTerminatingBorrower')}
                </button>
            )}
        </div>
    )
}

export default BorrowingConsolesStatusSelectionAdmin
