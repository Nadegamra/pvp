import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { getUserConsoles, getUserConsolesByStatus } from '../../api/UserConsolesApi'
import {
    UserConsoleGet,
    UserConsoleStatus,
    UserConsolesStatusRequest
} from '../../models/UserConsole'
import { Link } from 'react-router-dom'
import { imagePathToURL } from '../../models/Image'
import ReactPaginate from 'react-paginate'
import { getContainerHeight } from '../../App'

function UserConsolesGrid({ status }: { status: UserConsoleStatus }) {
    const [consoles, setConsoles] = useState<UserConsoleGet[]>()
    const [loading, setLoading] = useState<boolean>(true)
    const [offset, setOffset] = useState<number>(0)

    const { user } = useAuth()

    const itemsPerPage = 24

    useEffect(() => {
        if (user?.role === 'admin') {
            getUserConsolesByStatus(new UserConsolesStatusRequest(status))
                .then((response) => {
                    setConsoles(response.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else if (user?.role === 'lender') {
            getUserConsoles()
                .then((result) => {
                    setConsoles(result.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [status])

    const handlePageClick = (event: { selected: number }) => {
        setOffset((event.selected * itemsPerPage) % consoles!.length)
    }

    return (
        <div className="flex flex-col" style={{ minHeight: getContainerHeight() }}>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 m-3">
                {consoles?.slice(offset, offset + itemsPerPage).map((userConsole) => (
                    <Link
                        key={userConsole.id}
                        className="rounded-lg w-[250px] m-3 cursor-pointer select-none"
                        to={
                            user?.role !== 'admin'
                                ? `/consoles/${userConsole.id}`
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
                            {userConsole.console.name}
                        </div>
                    </Link>
                ))}
                {user?.role !== 'admin' && (
                    <Link
                        key={-1}
                        className="fixed bottom-5 right-5 cursor-pointer select-none"
                        to={`/consoles/new`}>
                        <div className="">
                            <span className="material-symbols-outlined text-[100px] w-full text-center">
                                add_circle
                            </span>
                        </div>
                    </Link>
                )}
            </div>
            <div className="flex-1" />
            {!loading && (
                <ReactPaginate
                    className="ml-5 flex flex-row my-5 list-style-none select-none"
                    previousLabel="Previous"
                    nextLabel="Next"
                    activeClassName="!bg-bg-extra"
                    pageClassName="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 mx-1"
                    previousLinkClassName="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 mx-1"
                    nextLinkClassName="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 mx-1"
                    breakLabel="..."
                    onPageChange={(e) => handlePageClick(e)}
                    pageRangeDisplayed={5}
                    pageCount={Math.ceil(consoles!.length / itemsPerPage)}
                    renderOnZeroPageCount={null}
                />
            )}
        </div>
    )
}

export default UserConsolesGrid
