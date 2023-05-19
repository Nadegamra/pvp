import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { BorrowingGet } from '../models/Borrowing'
import { UserConsoleGet, UserConsoleStatus } from '../models/UserConsole'
import { getAllBorrowings, getBorrowingsByUser } from '../api/BorrowingsApi'
import { useAuth } from '../contexts/AuthContext'
import Borrowing from '../components/borrowings/Borrowing'
import { Link } from 'react-router-dom'
import { getContainerHeight } from '../App'

function BorrowingsPage() {
    const [loading, setLoading] = useState<boolean>(true)
    const [borrowings, setBorrowings] = useState<BorrowingGet[]>()
    const [currentBorrowing, setCurrentBorrowing] = useState<number>(0)
    const [status, setStatus] = useState<UserConsoleStatus>(UserConsoleStatus.RESERVED)

    const { user } = useAuth()

    useEffect(() => {
        if (user?.role === 'admin') {
            getAllBorrowings()
                .then((response) => {
                    setBorrowings(response.data)
                    setBorrowingState((response.data as BorrowingGet[])[0].userConsoles)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else if (user?.role === 'borrower') {
            getBorrowingsByUser()
                .then((response) => {
                    setBorrowings(response.data)
                    setBorrowingState((response.data as BorrowingGet[])[0].userConsoles)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])

    const handleBorrowingClick = (event: { selected: number }) => {
        setCurrentBorrowing(event.selected)
        setBorrowingState(borrowings![event.selected].userConsoles)
    }

    const setBorrowingState = (userConsoles: UserConsoleGet[]) => {
        const states = [
            userConsoles.filter((x) => x.consoleStatus === UserConsoleStatus.RESERVED).length > 0,
            userConsoles.filter((x) => x.consoleStatus === UserConsoleStatus.AT_LENDER).length > 0,
            userConsoles.filter(
                (x) => x.consoleStatus === UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER
            ).length > 0,
            userConsoles.filter(
                (x) => x.consoleStatus === UserConsoleStatus.AWAITING_TERMINATION_BY_BORROWER
            ).length > 0
        ]
        for (let i = 0; i < states.length; i++) {
            if (states[i]) {
                setStatus(i + 2)
                break
            }
        }
    }

    return (
        <div>
            <div
                className="flex flex-col"
                id="userConsolesContainer"
                style={{ minHeight: getContainerHeight() }}>
                <div className="pt-3" id="adminUserConsolesButtons">
                    {!loading && (
                        <ReactPaginate
                            className="mx-auto flex flex-row py-5 list-style-none select-none w-max"
                            previousLabel="Previous"
                            nextLabel="Next"
                            activeClassName="!bg-bg-extra"
                            pageClassName="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 mx-1"
                            previousLinkClassName="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 mx-1"
                            nextLinkClassName="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 mx-1"
                            breakLabel="..."
                            onPageChange={(e) => handleBorrowingClick(e)}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(borrowings!.length)}
                            renderOnZeroPageCount={null}
                        />
                    )}
                </div>
                <div id="borrowingContainer" className="flex-1">
                    {!loading && borrowings !== undefined && borrowings.length > 0 && (
                        <Borrowing
                            id={borrowings[currentBorrowing].id}
                            status={status}
                            setStatus={setStatus}
                        />
                    )}
                </div>
            </div>
            {user?.role === 'borrower' && (
                <Link
                    key={-1}
                    className="fixed bottom-5 right-5 cursor-pointer select-none"
                    to={`/borrowings/new`}>
                    <div className="">
                        <span className="material-symbols-outlined text-[100px] w-full text-center">
                            add_circle
                        </span>
                    </div>
                </Link>
            )}
        </div>
    )
}

export default BorrowingsPage
