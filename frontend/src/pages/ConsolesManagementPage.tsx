import { useEffect, useState } from 'react'
import { ConsoleGet } from '../models/Console'
import { getConsoles } from '../api/ConsolesApi'
import { imagePathToURL } from '../models/Image'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function ConsolesManagementPage() {
    const { t } = useTranslation()
    const [consoles, setConsoles] = useState<ConsoleGet[]>()

    useEffect(() => {
        getConsoles().then((response) => {
            setConsoles(response.data)
        })
    }, [])

    return (
        <div className="grid grid-rows-2 grid-cols-5">
            <Link
                className="bg-bg-secondary rounded-lg w-[250px] p-3 m-3 cursor-pointer select-none"
                to={`/admin/consoles/new`}>
                <span className="material-symbols-outlined text-[150px] w-full text-center">
                    add_circle
                </span>
                <div className="text-t-secondary text-center">{t('consoleManagementForm.new')}</div>
            </Link>
            {consoles?.map((console) => (
                <Link
                    className="bg-bg-secondary rounded-lg w-[250px] p-3 m-3 cursor-pointer select-none"
                    to={`/admin/consoles/${console.id}`}>
                    {console.images.length > 0 && <img src={imagePathToURL(console.images[0].path, 250)} alt={console.images[0].name} />}
                    
                    <div className="text-t-secondary text-center">{console.name}</div>
                </Link>
            ))}
        </div>
    )
}

export default ConsolesManagementPage
