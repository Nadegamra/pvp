import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { UserConsoleStatus } from '../models/UserConsole'
import BorrowingConsolesStatusSelectionAdmin from '../components/borrowings/BorrowingConsolesStatusSelectionAdmin'
import BorrowingsList from '../components/borrowings/BorrowingsList'

function AdminBorrowingsPage() {
    const [status, setStatus] = useState<UserConsoleStatus>(UserConsoleStatus.RESERVED)

    const { user } = useAuth()

    return (
        <div>
            <div id="userConsolesContainer" className="flex-1">
                <BorrowingsList />
            </div>
        </div>
    )
}

export default AdminBorrowingsPage
