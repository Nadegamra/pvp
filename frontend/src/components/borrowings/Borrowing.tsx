import { Link } from 'react-router-dom'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { BorrowingGet, BorrowingStatus, BorrowingUpdateStatus } from '../../models/Borrowing'
import { canDeleteBorrowing, deleteBorrowing, getBorrowingById } from '../../api/BorrowingsApi'
import { useAuth } from '../../contexts/AuthContext'
import { UserConsoleStatus } from '../../models/UserConsole'
import { imagePathToURL } from '../../models/Image'
import Button from '../ui/Button'
import { t } from 'i18next'
import { contactBorrower } from '../../api/ChatsApi'
import { getContainerHeight } from '../../App'
import { updateBorrowingStatus } from '../../api/BorrowingsApi'
import BorrowingConsolesStatusSelectionAdmin from './BorrowingConsolesStatusSelectionAdmin'

function Borrowing({
    id,
    status,
    setStatus
}: {
    id: number
    status: UserConsoleStatus
    setStatus: Dispatch<SetStateAction<UserConsoleStatus>>
}) {
    const [borrowing, setBorrowing] = useState<BorrowingGet>()
    const { user } = useAuth()
    const itemsPerPage = 24
    const [loading, setLoading] = useState<boolean>(true)
    const [offset, setOffset] = useState<number>(0)
    const handlePageClick = (event: { selected: number }) => {
        setOffset((event.selected * itemsPerPage) % borrowing!.userConsoles!.length)
    }
    const [canDelete, setCanDelete] = useState<boolean>()

    useEffect(() => {
        getBorrowingById(id)
            .then((response) => {
                setBorrowing(response.data)
            })
            .finally(() => {
                if (user?.role === 'admin') {
                    canDeleteBorrowing(id)
                        .then((response) => setCanDelete(response.data))
                        .finally(() => setLoading(false))
                } else {
                    setLoading(false)
                }
            })
    }, [id, status])

    return (
        <div
            className="flex flex-col"
            style={{
                minHeight:
                    getContainerHeight() -
                    (document.getElementById('adminUserConsolesButtons')?.clientHeight ?? 0)
            }}>
            <div className="text-center font-bold text-fs-h1">
                {t('borrowing.borrowing')} #{borrowing?.id}
            </div>

            {user?.role === 'borrower' && !loading && (
                <div className="flex flex-row content-around mb-3">
                    <span className="inline-block mr-auto ml-5">
                        <Button
                            id={1}
                            text={
                                borrowing?.status === BorrowingStatus.PENDING
                                    ? t('borrowing.getStatusPending')
                                    : borrowing?.status === BorrowingStatus.ACTIVE
                                    ? t('borrowing.getStatusActive')
                                    : t('borrowing.getStatusTerminating')
                            }
                            disabled={borrowing?.status === BorrowingStatus.AWAITING_TERMINATION}
                        />
                    </span>
                    {borrowing?.conversationId !== null && (
                        <span className="inline-block ml-auto mr-5">
                            <Button
                                id={2}
                                text={t('borrowing.contactBorrower')}
                                dialog={false}
                                dialogBody=""
                                onClick={() => {
                                    window.location.href = `/chats/${borrowing?.conversationId}`
                                }}
                            />
                        </span>
                    )}
                </div>
            )}
            {user?.role === 'admin' && (
                <span className="inline-block mx-auto mb-3">
                    <Button
                        id={1}
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
                            ).finally(() =>
                                getBorrowingById(id)
                                    .then((response) => {
                                        setBorrowing(response.data)
                                    })
                                    .finally(() =>
                                        canDeleteBorrowing(id)
                                            .then((response) => setCanDelete(response.data))
                                            .finally(() => setLoading(false))
                                    )
                            )
                        }}
                        disabled={borrowing?.status === BorrowingStatus.AWAITING_TERMINATION}
                    />
                </span>
            )}
            <div className="pb-3">
                {!loading && (
                    <BorrowingConsolesStatusSelectionAdmin
                        status={status}
                        setStatus={setStatus}
                        enabled={[
                            borrowing!.userConsoles.filter(
                                (x) => x.consoleStatus === UserConsoleStatus.RESERVED
                            ).length > 0,
                            borrowing!.userConsoles.filter(
                                (x) => x.consoleStatus === UserConsoleStatus.AT_LENDER
                            ).length > 0,
                            borrowing!.userConsoles.filter(
                                (x) =>
                                    x.consoleStatus ===
                                    UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER
                            ).length > 0,
                            borrowing!.userConsoles.filter(
                                (x) =>
                                    x.consoleStatus ===
                                    UserConsoleStatus.AWAITING_TERMINATION_BY_BORROWER
                            ).length > 0
                        ]}
                    />
                )}
            </div>
            {user?.role === 'admin' && (
                <div className="flex flex-row content-around">
                    <span className="ml-5">
                        {user?.role === 'admin' && !loading && (
                            <Button
                                text={t('userConsolePage.delete')}
                                id={3}
                                color="red"
                                onClick={() => {
                                    deleteBorrowing(borrowing!.id).then(
                                        () => (window.location.href = '/manageConsoles')
                                    )
                                }}
                                dialog={true}
                                disabled={!canDelete!}
                                dialogBody={t('button.dialogBody6')}
                            />
                        )}
                    </span>
                    <span className="inline-block ml-auto mr-5">
                        <Button
                            id={2}
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
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-6">
                {!loading &&
                    borrowing?.userConsoles
                        .filter((x) => x.consoleStatus === status)
                        ?.slice(offset, offset + itemsPerPage)
                        .map((userConsole) => (
                            <Link
                                key={userConsole.id}
                                className="rounded-lg cursor-pointer select-none w-max h-max mx-auto"
                                to={
                                    user?.role === 'lender'
                                        ? `/consoles/${userConsole.id}`
                                        : user?.role === 'admin'
                                        ? `/userConsoles/${userConsole.id}`
                                        : `/borrowedConsoles/${userConsole.id}`
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
            <div className="flex flex-row content-between">
                <span className="mr-auto">
                    {!loading && (
                        <ReactPaginate
                            className="ml-5 flex flex-row py-5 list-style-none select-none"
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
                </span>
            </div>
        </div>
    )
}

export default Borrowing
