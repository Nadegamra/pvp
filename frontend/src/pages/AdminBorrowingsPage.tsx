import BorrowingsList from '../components/borrowings/BorrowingsList'

function AdminBorrowingsPage() {
    return (
        <div>
            <div id="userConsolesContainer" className="flex-1">
                <BorrowingsList />
            </div>
        </div>
    )
}

export default AdminBorrowingsPage
