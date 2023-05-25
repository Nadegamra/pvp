import { Dispatch, SetStateAction, useEffect } from 'react'
import { UserConsoleStatus } from '../../models/UserConsole'
import { t } from 'i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

function UserConsolesStatusSelectionAdmin({
    status,
    setStatus
}: {
    status: UserConsoleStatus
    setStatus: Dispatch<SetStateAction<UserConsoleStatus>>
}) {
    const { user } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        if (user?.role === 'admin') {
            const search = location.search
            const state = new URLSearchParams(search).get('state')
            if (state !== null) {
                console.log(state)
                if (parseInt(state) === 0) {
                    setStatus(UserConsoleStatus.UNCONFIRMED)
                }
                if (parseInt(state) === 1) {
                    setStatus(UserConsoleStatus.AT_PLATFORM)
                }
                if (parseInt(state) === 4) {
                    setStatus(UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER)
                }
            }
        }
    }, [])
    return (
        <div
            className="flex flex-col md:flex-row mx-auto w-max rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group">
            <button
                type="button"
                className={
                    status === UserConsoleStatus.UNCONFIRMED
                        ? 'select-none inline-block rounded-l bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                        : 'select-none inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                }
                onClick={() => {
                    setStatus(UserConsoleStatus.UNCONFIRMED)
                    if (user?.role === 'admin') {
                        navigate(`/userConsoles?state=0`, { replace: true })
                    }
                }}>
                {t('userConsolePage.statusUnconfirmed')}
            </button>
            <button
                type="button"
                className={
                    status === UserConsoleStatus.AT_PLATFORM
                        ? 'select-none inline-block bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                        : 'select-none inline-block bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                }
                onClick={() => {
                    setStatus(UserConsoleStatus.AT_PLATFORM)
                    if (user?.role === 'admin') {
                        navigate(`/userConsoles?state=1`, { replace: true })
                    }
                }}>
                {t('userConsolePage.statusAtPlatform')}
            </button>
            <button
                type="button"
                className={
                    status === UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER
                        ? 'select-none inline-block rounded-r bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                        : 'select-none inline-block rounded-r bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                }
                onClick={() => {
                    setStatus(UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER)
                    if (user?.role === 'admin') {
                        navigate(`/userConsoles?state=4`, { replace: true })
                    }
                }}>
                {t('userConsolePage.statusTerminatingLender')}
            </button>
        </div>
    )
}

export default UserConsolesStatusSelectionAdmin
