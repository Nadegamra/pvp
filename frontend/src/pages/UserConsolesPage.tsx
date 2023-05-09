import { t } from 'i18next'
import { Link } from 'react-router-dom'
import { UserConsoleGet } from '../models/UserConsole'
import { useEffect, useState } from 'react'
import { imagePathToURL } from '../models/Image'
import { getUserConsoles } from '../api/UserConsolesApi'

function UserConsolesPage() {
    const [consoles, setConsoles] = useState<UserConsoleGet[]>()

    useEffect(() => {
        getUserConsoles().then((result) => {
            setConsoles(result.data)
        })
    }, [])

    return (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 m-3">
            {consoles?.map((userConsole) => (
                <Link
                    key={userConsole.id}
                    className="rounded-lg w-[250px] m-3 cursor-pointer select-none"
                    to={`/consoles/${userConsole.id}`}>
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
                    <div className="text-t-secondary text-center">{userConsole.console.name}</div>
                </Link>
            ))}
            <Link
                key={-1}
                className="fixed bottom-5 right-5 cursor-pointer select-none"
                to={`/consoles/new`}>
                <div className="">
                    <span className="material-symbols-outlined text-[100px] w-full text-center">
                        add_circle
                    </span>
                </div>
            </Link>
        </div>
    )
}

export default UserConsolesPage
