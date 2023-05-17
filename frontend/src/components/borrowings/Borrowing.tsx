import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { BorrowingGet, BorrowingStatus, BorrowingUpdateStatus } from '../../models/Borrowing'
import { getBorrowingById } from '../../api/BorrowingsApi'
import { useAuth } from '../../contexts/AuthContext'
import { UserConsoleStatus } from '../../models/UserConsole'
import { imagePathToURL } from '../../models/Image'
import Button from '../ui/Button'
import { t } from 'i18next'
import { contactBorrower } from '../../api/ChatsApi'
import { getContainerHeight } from '../../App'
import { updateBorrowingStatus } from '../../api/BorrowingsApi'

function Borrowing({ id, status }: { id: number; status: UserConsoleStatus }) {
    const [borrowing, setBorrowing] = useState<BorrowingGet>()
    const { user } = useAuth()
    const itemsPerPage = 24
    const [loading, setLoading] = useState<boolean>(true)
    const [offset, setOffset] = useState<number>(0)
    const handlePageClick = (event: { selected: number }) => {
        setOffset((event.selected * itemsPerPage) % borrowing!.userConsoles!.length)
    }

    useEffect(() => {
        getBorrowingById(id).then((response) => {
            setBorrowing(response.data)
            setLoading(false)
        })
    }, [id, status])

    return (
        <div className="flex flex-col" style={{ height: getContainerHeight() }}>
            <div className="text-center font-bold text-fs-h1">
                {t('borrowing.borrowing')} #{borrowing?.id}
            </div>
            <div className="flex flex-row content-around">
                <span className="inline-block ml-5">
                    <Button
                        text={
                            borrowing?.status === BorrowingStatus.PENDING
                                ? t('borrowing.setStatusActive')
                                : borrowing?.status === BorrowingStatus.ACTIVE
                                ? t('borrowing.setStatusTerminating')
                                : t('borrowing.getStatusTerminating')
                        }
                        dialog={false}
                        dialogBody=""
                        onClick={() => {
                            updateBorrowingStatus(
                                new BorrowingUpdateStatus(
                                    borrowing?.id ?? -1,
                                    borrowing?.status === BorrowingStatus.PENDING
                                        ? BorrowingStatus.ACTIVE
                                        : BorrowingStatus.AWAITING_TERMINATION
                                )
                            ).then(() => window.location.reload())
                        }}
                    />
                </span>
                <span className="inline-block ml-auto mr-5">
                    <Button
                        text={t('borrowing.contactBorrower')}
                        dialog={false}
                        dialogBody=""
                        onClick={() => {
                            contactBorrower(borrowing!.id).then(() => {
                                getBorrowingById(borrowing!.id).then((response) => {
                                    window.location.href = `/chats/${
                                        (response.data as BorrowingGet).conversationId
                                    }`
                                })
                            })
                        }}
                    />
                </span>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 m-3">
                {!loading &&
                    borrowing?.userConsoles
                        .filter((x) => x.consoleStatus === status)
                        ?.slice(offset, offset + itemsPerPage)
                        .map((userConsole) => (
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
                    pageCount={Math.ceil(borrowing!.userConsoles.length / itemsPerPage)}
                    renderOnZeroPageCount={null}
                />
            )}
        </div>
    )
}

export default Borrowing
