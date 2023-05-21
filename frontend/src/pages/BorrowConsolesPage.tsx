import { t } from 'i18next'
import { UserConsoleGet, UserConsoleStatus, UserConsolesStatusRequest } from '../models/UserConsole'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { imagePathToURL } from '../models/Image'
import Button from '../components/ui/Button'
import { getUserConsoles, getUserConsolesByStatus } from '../api/UserConsolesApi'
import { useAuth } from '../contexts/AuthContext'
import ReactPaginate from 'react-paginate'
import { addBorrowing } from '../api/BorrowingsApi'
import { BorrowingAdd } from '../models/Borrowing'
import { getContainerHeight } from '../App'

function BorrowConsolesPage() {
    const [consoles, setConsoles] = useState<UserConsoleGet[]>()
    const { user } = useAuth()
    const itemsPerPage = 24
    const [loading, setLoading] = useState<boolean>(true)
    const [offset, setOffset] = useState<number>(0)
    const handlePageClick = (event: { selected: number }) => {
        setOffset((event.selected * itemsPerPage) % consoles!.length)
    }
    const [selectedConsoles, setSelectedConsoles] = useState<number[]>([])

    const toggleConsoleSelection = (consoleId: number) => {
        setSelectedConsoles((prevSelection) => {
            if (prevSelection.includes(consoleId)) {
                return prevSelection.filter((id) => id !== consoleId)
            } else {
                return [...prevSelection, consoleId]
            }
        })
    }

    useEffect(() => {
        if (user?.role === 'borrower') {
            getUserConsolesByStatus(new UserConsolesStatusRequest(UserConsoleStatus.AT_PLATFORM))
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
        <div className="flex flex-col" style={{ minHeight: getContainerHeight() }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-6">
                {consoles?.slice(offset, offset + itemsPerPage).map((userConsole) => (
                    <div key={userConsole.id}>
                        <div className="relative w-max h-max m-auto">
                            {userConsole.images.length > 0 && (
                                <div className="w-max h-max m-3">
                                    <img
                                        className="rounded-md cursor-pointer mx-auto"
                                        src={imagePathToURL(userConsole.images[0].path, 250)}
                                        alt={userConsole.images[0].name}
                                        onClick={() => toggleConsoleSelection(userConsole.id)}
                                    />
                                    {selectedConsoles.includes(userConsole.id) && (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="black"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="w-4 h-4 absolute top-4 left-7 z-10 bg-white rounded-lg">
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
                    </div>
                ))}
            </div>
            {selectedConsoles.length > 0 && (
                <div className="fixed bottom-10 right-10 z-50">
                    <Button
                        text={t('borrowerConsolePage.selectConsole')}
                        dialog={false}
                        dialogBody={t('button.dialogBody3')}
                        onClick={() => {
                            addBorrowing(new BorrowingAdd(selectedConsoles)).then(
                                () => (window.location.href = '/borrowings')
                            )
                        }}
                    />
                </div>
            )}
            <div className="flex-1" />
            {!loading && (
                <ReactPaginate
                    className="flex flex-row my-5 list-style-none select-none w-max pl-5"
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

export default BorrowConsolesPage
