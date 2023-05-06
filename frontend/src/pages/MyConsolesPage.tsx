import { t } from 'i18next'
import { Link } from 'react-router-dom'
import { UserConsoleGet } from '../models/UserConsole'
import { useEffect, useState } from 'react'
import { imagePathToURL } from '../models/Image'
import { getUserConsoles } from '../api/UserConsolesApi'

function MyConsolesPage() {
    const [consoles, setConsoles] = useState<UserConsoleGet[]>()

    useEffect(() => {
        getUserConsoles().then((result) => {
            setConsoles(result.data)
        })
    }, [])

    return (
        <div className="grid grid-rows-2 grid-cols-5">
            <Link
                className="bg-bg-secondary rounded-lg w-[250px] p-3 m-3 cursor-pointer select-none"
                to={`/consoles/new`}>
                <span className="material-symbols-outlined text-[150px] w-full text-center">
                    add_circle
                </span>
                <div className="text-t-secondary text-center">{t('consoleManagementForm.new')}</div>
            </Link>
            {consoles?.map((userConsole) => (
                <Link
                    className="bg-bg-secondary rounded-lg w-[250px] p-3 m-3 cursor-pointer select-none"
                    to={`/consoles/${userConsole.id}`}>
                    {userConsole.console.images.length > 0 && (
                        <img
                            src={imagePathToURL(userConsole.console.images[0].path, 250)}
                            alt={userConsole.console.images[0].name}
                        />
                    )}
                    <div className="text-t-secondary text-center">
                        {userConsole.amount} x {userConsole.console.name}
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default MyConsolesPage
