import { Dispatch, SetStateAction } from 'react'
import { UserConsoleStatus } from '../../models/UserConsole'
import { t } from 'i18next'

function UserConsolesStatusSelectionAdmin({
    status,
    setStatus
}: {
    status: UserConsoleStatus
    setStatus: Dispatch<SetStateAction<UserConsoleStatus>>
}) {
    return (
        <div
            className="mx-auto w-max rounded-md shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            role="group">
            <button
                type="button"
                className={
                    status === UserConsoleStatus.UNCONFIRMED
                        ? 'select-none inline-block rounded-l bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                        : 'select-none inline-block rounded-l bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                }
                onClick={() => setStatus(UserConsoleStatus.UNCONFIRMED)}>
                {t('userConsolePage.statusUnconfirmed')}
            </button>
            <button
                type="button"
                className={
                    status === UserConsoleStatus.AT_PLATFORM
                        ? 'select-none inline-block rounded-r bg-primary-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                        : 'select-none inline-block rounded-r bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-primary-600 focus:bg-primary-600 focus:outline-none focus:ring-0 active:bg-primary-700'
                }
                onClick={() => setStatus(UserConsoleStatus.AT_PLATFORM)}>
                {t('userConsolePage.statusAtPlatform')}
            </button>
        </div>
    )
}

export default UserConsolesStatusSelectionAdmin
