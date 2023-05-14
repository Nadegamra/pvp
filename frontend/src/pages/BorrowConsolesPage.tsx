import { t } from 'i18next'
import { Link } from 'react-router-dom'
import { UserConsoleGet, ConsoleStatus, UserConsolesStatusRequest } from '../models/UserConsole'
import { useEffect, useState } from 'react'
import { imagePathToURL } from '../models/Image'
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
            <div className="flex-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 m-3">
                {consoles?.slice(offset, offset + itemsPerPage).map((userConsole) => (
                    <Link
                        key={userConsole.id}
                        className="rounded-lg w-[250px] m-3 cursor-pointer select-none"
                        to={
                            user?.role !== 'admin'
                                ? `/borrowConsole/${userConsole.id}`
                                : `/userConsoles/${userConsole.id}`
                        }>
                        <div className="relative">
                            <div className="absolute right-1 bottom-1 bg-bg-primary rounded-md px-1">
                                x {userConsole.amount}
                            </div>
                            {userConsole.images.length > 0 && (
                                <img
                                    className="rounded-md"
                                    src={imagePathToURL(userConsole.images[0].path, 250)}
                                    alt={userConsole.images[0].name}
                                />
                            )}
                        </div>
                        <div className="text-t-secondary text-center">
                            {userConsole.console.name} ({userConsole.console.dailyPrice} €) 
                        </div>
                    </Link>
                ))}
        </div>
    )
}

export default BorrowConsolesPage
