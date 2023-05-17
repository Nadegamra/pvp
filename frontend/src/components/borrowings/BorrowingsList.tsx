import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { BorrowingGet } from '../../models/Borrowing'
import { getAllBorrowings } from '../../api/BorrowingsApi'
import { useAuth } from '../../contexts/AuthContext'
import { UserConsoleStatus } from '../../models/UserConsole'
import Borrowing from './Borrowing'
import BorrowingConsolesStatusSelectionAdmin from './BorrowingConsolesStatusSelectionAdmin'

function BorrowingsList() {
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
                    setBorrowingState(response.data)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])

    const handleBorrowingClick = (event: { selected: number }) => {
        setCurrentBorrowing(event.selected)
        setBorrowingState(borrowings!)
    }

    const setBorrowingState = (borrowings: BorrowingGet[]) => {
        const states = [
            borrowings![currentBorrowing].userConsoles.filter(
                (x) => x.consoleStatus === UserConsoleStatus.RESERVED
            ).length > 0,
            borrowings![currentBorrowing].userConsoles.filter(
                (x) => x.consoleStatus === UserConsoleStatus.AT_LENDER
            ).length > 0,
            borrowings![currentBorrowing].userConsoles.filter(
                (x) => x.consoleStatus === UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER
            ).length > 0,
            borrowings![currentBorrowing].userConsoles.filter(
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
            <div className="pt-3" id="adminUserConsolesButtons">
                <div id="borrowingsListPagination">
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
            </div>
            {!loading && borrowings !== undefined && borrowings.length > 0 && (
                <div>
                    {user?.role === 'admin' && (
                        <BorrowingConsolesStatusSelectionAdmin
                            status={status}
                            setStatus={setStatus}
                            enabled={[
                                borrowings[currentBorrowing].userConsoles.filter(
                                    (x) => x.consoleStatus === UserConsoleStatus.RESERVED
                                ).length > 0,
                                borrowings[currentBorrowing].userConsoles.filter(
                                    (x) => x.consoleStatus === UserConsoleStatus.AT_LENDER
                                ).length > 0,
                                borrowings[currentBorrowing].userConsoles.filter(
                                    (x) =>
                                        x.consoleStatus ===
                                        UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER
                                ).length > 0,
                                borrowings[currentBorrowing].userConsoles.filter(
                                    (x) =>
                                        x.consoleStatus ===
                                        UserConsoleStatus.AWAITING_TERMINATION_BY_BORROWER
                                ).length > 0
                            ]}
                        />
                    )}
                    {borrowings[currentBorrowing].userConsoles.filter(
                        (x) => x.consoleStatus === status
                    ).length > 0 && (
                        <Borrowing id={borrowings[currentBorrowing].id} status={status} />
                    )}
                </div>
            )}
        </div>
    )
}

export default BorrowingsList
