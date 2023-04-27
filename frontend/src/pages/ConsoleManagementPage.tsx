import { useParams } from 'react-router'

function ConsoleManagementPage() {
    const { id } = useParams()
    return <div>This is console #{id} management page!</div>
}

export default ConsoleManagementPage
