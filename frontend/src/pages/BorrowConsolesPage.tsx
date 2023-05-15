import { t } from 'i18next'
import { Link } from 'react-router-dom'
import { UserConsoleGet, ConsoleStatus, UserConsolesStatusRequest } from '../models/UserConsole'
import { useEffect, useState } from 'react'
import { imagePathToURL } from '../models/Image'
import Button from '../components/ui/Button'
import { getUserConsoles, getUserConsolesByStatus } from '../api/UserConsolesApi'
import { useAuth } from '../contexts/AuthContext'
import ReactPaginate from 'react-paginate'

function BorrowConsolesPage() {
    const [consoles, setConsoles] = useState<UserConsoleGet[]>()
    const { user } = useAuth()
    const itemsPerPage = 24
    const [loading, setLoading] = useState<boolean>(true)
    const [offset, setOffset] = useState<number>(0)
    const handlePageClick = (event: { selected: number }) => {
        setOffset((event.selected * itemsPerPage) % consoles!.length)
    }
    const [status, setStatus] = useState<ConsoleStatus>(ConsoleStatus.AT_PLATFORM)
    const [selectedConsole, setSelectedConsole] = useState<string>('') // Added state for selected console

    const toggleConsoleSelection = (consoleId: string) => {
        setSelectedConsole((prevSelection) => (prevSelection === consoleId ? '' : consoleId))
      }

    useEffect(() => {
        if (user?.role === 'borrower') {
            getUserConsolesByStatus(new UserConsolesStatusRequest(status))
                .then((response) => {
                    setConsoles(response.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            getUserConsoles()
                .then((result) => {
                    setConsoles(result.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [status])

    return (
        <div className="relative">
        <div className="flex-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 m-3">
            {consoles?.slice(offset, offset + itemsPerPage).map((userConsole) => (
                <div>
                    <div className="relative">
                        {userConsole.images.length > 0 && (
                            <div className="whitespace-nowrap">
                            <img
                                className="rounded-md cursor-pointer"
                                src={imagePathToURL(userConsole.images[0].path, 250)}
                                alt={userConsole.images[0].name}
                                onClick={() => toggleConsoleSelection(userConsole.console.name)}
                            />
                            {selectedConsole === userConsole.console.name && (
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 absolute top-2 left-2 z-10"
                                >
                                <path d="M20 6L9 17l-5-5" />
                                </svg>
                            )}
                            </div>
                        )}
                        </div>
                    <div className="text-t-secondary text-center">
                        {userConsole.console.name} x {userConsole.amount}
                        
                     </div>
                    <div className="text-t-secondary text-center">
                        {userConsole.accessories}
                    </div>
                    {selectedConsole === userConsole.console.name && (
                    <div className="fixed bottom-2 right-2">
                    <Button
                            text={t('borrowerConsolePage.selectConsole')}
                            dialog={false}
                            dialogBody={t('button.dialogBody3')}
                            onClick={() => {
                                setStatus(ConsoleStatus.AT_LENDER)
                            }}
                        />
                        </div>
                    )}
        </div>
      ))}
    </div>
    </div>
  )
}

export default BorrowConsolesPage
