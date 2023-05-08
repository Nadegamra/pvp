import { useParams } from 'react-router'
import { ConsoleStatus, UserConsoleGet } from '../models/UserConsole'
import { useEffect, useState } from 'react'
import { getUserConsole } from '../api/UserConsolesApi'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import { imagePathToURL } from '../models/Image'
import Button from '../components/ui/Button'

function MyConsolePage() {
    const { id } = useParams()
    const [userConsole, setUserConsole] = useState<UserConsoleGet>()

    useEffect(() => {
        getUserConsole(parseInt(id ?? '1')).then((result) => {
            setUserConsole(result.data)
            console.log(result.data)
        })
    }, [])

    const displayStatus = () => {
        let status = ''
        if (userConsole?.consoleStatus == ConsoleStatus.AT_OWNER) {
            status = 'Namuose'
        } else if (userConsole?.consoleStatus == ConsoleStatus.AT_PLATFORM) {
            status = 'Laukiama nuomos'
        } else if (userConsole?.consoleStatus == ConsoleStatus.AT_LENDER) {
            status = 'Pas nuomotoją'
        } else if (userConsole?.consoleStatus == ConsoleStatus.AWAITING_RETURN) {
            status = 'Laukiama grąžinimo'
        }
        return (
            <div>
                <div className="font-bold">Dabartinė būsena</div>
                <div className="ml-3">{status}</div>
            </div>
        )
    }

    return (
        <div className="mt-10 mx-auto flex flex-col md:flex-row">
            <div className="md:h-[400px] md:w-[700px] text-center align-middle mx-10">
                {userConsole !== undefined && (
                    <Carousel>
                        {userConsole?.images.map((value) => (
                            <div>
                                <p className="legend">{value.name}</p>
                                <img src={imagePathToURL(value.path, 250)} alt={value.name} />
                            </div>
                        ))}
                    </Carousel>
                )}
            </div>
            <div className="ml-5 md:ml-0 mb-10 min-w-[400px]">
                <div className="text-fs-h1">Apie konsolę</div>
                <hr className="pb-2" />
                <div className="font-bold">Pavadinimas</div>
                <div className="ml-3">{userConsole?.console.name}</div>
                <div className="font-bold">Aprašymas</div>
                <div className="ml-3">{userConsole?.console.description}</div>
                <div className="font-bold">Pilna nuomos kaina (1 vnt.)</div>
                <div className="ml-3">{userConsole?.console.dailyPrice} €</div>
                <div className="font-bold">Dieninės pajamos nuomos metu (1 vnt.)</div>
                <div className="ml-3">
                    {Math.round((userConsole?.console.dailyPrice ?? 0) * 0.6 * 100) / 100} €
                </div>

                <div className="text-fs-h1 mt-5">Nuomos detalės</div>
                <hr className="pb-2" />
                <div className="font-bold">Nuomojamas kiekis</div>
                <div className="ml-3">{userConsole?.amount} vnt.</div>
                <div className="font-bold">Priedai</div>
                <div className="ml-3">{userConsole?.accessories}</div>
                {displayStatus()}
                <div className="mt-5">
                    <Button
                        text="Inicijuoti sutarties nutraukimą"
                        dialog={true}
                        onClick={() => {
                            console.log('Inicijuoti sutarties nutraukimą')
                            // Inicijuoti sutarties nutraukimą
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default MyConsolePage
