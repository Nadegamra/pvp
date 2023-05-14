import { useEffect, useState } from 'react'
import { ConsoleGet } from '../models/Console'
import { UserConsoleGet, ConsoleStatus, UserConsolesStatusRequest } from '../models/UserConsole'
import { getConsoles } from '../api/ConsolesApi'
import { imagePathToURL } from '../models/Image'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function ConsolesPage() {
    const { t } = useTranslation()
    const [consoles, setConsoles] = useState<UserConsoleGet[]>()
    const [expandedConsole, setExpandedConsole] = useState<UserConsoleGet>();

    useEffect(() => {
        getConsoles().then((response) => {
            setConsoles(response.data)
        })
    }, [])
    return (
      <div className="grid grid-rows-2 grid-cols-5">
          {consoles?.map((userConsole) => (
              <div className="bg-bg-secondary rounded-lg w-[250px] p-3 m-3 cursor-pointer select-none"
            onClick={() => setExpandedConsole(userConsole)}>
                  {userConsole.images.length > 0 && <img src={imagePathToURL(userConsole.images[0].path, 250)} alt={userConsole.images[0].name} />}
                  <div className="text-t-secondary text-center">{userConsole?.console.name} ({userConsole?.console.dailyPrice} eur)</div>                  
              </div>
          ))}
          {expandedConsole && (
      <ConsoleDetails
        userConsole={expandedConsole}
        onClose={() => setExpandedConsole(undefined)}
      />
    )}
      </div>
  )
}

interface ConsoleDetailsProps {
    userConsole: UserConsoleGet;
    onClose: () => void;
  }
  
  function ConsoleDetails({ userConsole, onClose }: ConsoleDetailsProps) {
    const { t } = useTranslation();
  
    return (
      <div className="fixed z-50 top-0 left-0 w-full h-full overflow-auto bg-opacity-75 bg-gray-900">
        <div className="bg-bg-secondary rounded-lg w-full p-3 m-3 cursor-pointer select-none">
          <button className="float-right" onClick={onClose}>
            {t("Close")}
          </button>
          <div className="text-fs-h1 mt-5">{t('userConsolePage.lendTitle')}</div>
                <hr className="pb-2" />
                <div className="font-bold">{t('userConsolePage.lendAmount')}</div>
                <div className="ml-3">{userConsole?.amount}</div>
                <div className="font-bold">{t('userConsolePage.lendAccessories')}</div>
                <div className="ml-3">{userConsole?.accessories}</div>
        </div>
      </div>
    );
  }

export default ConsolesPage