import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { BorrowingGet } from '../../models/Borrowing'
import { getAllBorrowings } from '../../api/BorrowingsApi'
import { useAuth } from '../../contexts/AuthContext'
import { UserConsoleStatus } from '../../models/UserConsole'
import Borrowing from '../borrowings/Borrowing'

function BorrowingsList({ status }: { status: UserConsoleStatus }) {
    const [loading, setLoading] = useState<boolean>(true)
    const [borrowings, setBorrowings] = useState<BorrowingGet[]>()
    const [currentBorrowing, setCurrentBorrowing] = useState<number>(0)

    const { user } = useAuth()

    useEffect(() => {
        if (user?.role === 'admin') {
            getAllBorrowings()
                .then((response) => {
                    setBorrowings(
                        (response.data as BorrowingGet[]).filter(
                            (x) =>
                                x.userConsoles.filter((x) => x.consoleStatus === status).length > 0
                        )
                    )
                })
                .finally(() => setLoading(false))
        }
    }, [status])

    const handleBorrowingClick = (event: { selected: number }) => {
        setCurrentBorrowing(event.selected)
    }

    return (
        <div>
            {!loading && borrowings !== undefined && borrowings.length > 0 && (
                <div>
                    {!loading && (
                        <ReactPaginate
                            className="mx-auto flex flex-row my-5 list-style-none select-none w-max"
                            previousLabel="Previous"
                            nextLabel="Next"
                            activeClassName="!bg-bg-extra"
                            pageClassName="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 mx-1"
                            previousLinkClassName="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 mx-1"
                            nextLinkClassName="relative block rounded bg-primary-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300 mx-1"
                            breakLabel="..."
                            onPageChange={(e) => handleBorrowingClick(e)}
                            pageRangeDisplayed={5}
                            pageCount={Math.ceil(
                                borrowings.filter(
                                    (x) =>
                                        x.userConsoles.filter((x) => x.consoleStatus === status)
                                            .length > 0
                                ).length
                            )}
                            renderOnZeroPageCount={null}
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
