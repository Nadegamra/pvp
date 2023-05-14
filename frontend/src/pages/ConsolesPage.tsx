import { useEffect, useState } from 'react'
import { ConsoleGet } from '../models/Console'
import { getConsoles } from '../api/ConsolesApi'
import { imagePathToURL } from '../models/Image'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function ConsolesPage() {
    const { t } = useTranslation()
    const [consoles, setConsoles] = useState<ConsoleGet[]>()

    useEffect(() => {
        getConsoles().then((response) => {
            setConsoles(response.data)
        })
    }, [])
    return (
      <div className="grid grid-rows-2 grid-cols-5">
          {consoles?.map((console) => (
              <div className="bg-bg-secondary rounded-lg w-[250px] p-3 m-3 cursor-pointer select-none">
                  {console.images.length > 0 && <img src={imagePathToURL(console.images[0].path, 250)} alt={console.images[0].name} />}
                  <div className="text-t-secondary text-center">{console.name} ({console.dailyPrice} eur)</div>                  
              </div>
          ))}
      </div>
  )
}

export default ConsolesPage