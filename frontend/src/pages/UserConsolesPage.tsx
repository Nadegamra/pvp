import { UserConsoleStatus } from '../models/UserConsole'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import UserConsoleStatusSelectionAdmin from '../components/userConsoles/UserConsolesStatusSelectionAdmin'
import UserConsolesGrid from '../components/userConsoles/UserConsolesGrid'
import BorrowingsList from '../components/borrowings/BorrowingsList'
import { getContainerHeight } from '../App'

function UserConsolesPage() {
    const [status, setStatus] = useState<UserConsoleStatus>(UserConsoleStatus.UNCONFIRMED)

    const { user } = useAuth()

    return (
        <div className="flex flex-col" style={{ minHeight: getContainerHeight() }}>
            <div id="userConsolesContainer" className="flex-1">
                {user?.role === 'admin' && (
                    <UserConsoleStatusSelectionAdmin status={status} setStatus={setStatus} />
                )}
                {status <= UserConsoleStatus.AT_PLATFORM && <UserConsolesGrid status={status} />}
                {status === UserConsoleStatus.RESERVED && <BorrowingsList status={status} />}
                {status === UserConsoleStatus.AT_LENDER && <BorrowingsList status={status} />}
                {status === UserConsoleStatus.AWAITING_TERMINATION_BY_LENDER && (
                    <BorrowingsList status={status} />
                )}
                {status === UserConsoleStatus.AWAITING_TERMINATION_BY_BORROWER && (
                    <BorrowingsList status={status} />
                )}
            </div>
        </div>
    )
}

export default UserConsolesPage
