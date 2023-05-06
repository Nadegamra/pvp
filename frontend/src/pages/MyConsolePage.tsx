import { useParams } from 'react-router'
import { ConsoleStatus, UserConsoleGet } from '../models/UserConsole'
import { useEffect, useState } from 'react'
import { getUserConsole } from '../api/UserConsolesApi'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

function MyConsolePage() {
    const { id } = useParams()
    const [userConsole, setUserConsole] = useState<UserConsoleGet>()

    useEffect(() => {
        getUserConsole(parseInt(id ?? '1')).then((result) => {
            setUserConsole(result.data)
        })
    }, [])

    const displayStatus = () => {
        let status = ''
        let message = ''
        if (userConsole?.status == ConsoleStatus.AT_OWNER) {
            status = 'Namuose'
            message = 'Prašyti paėmimo'
        } else if (userConsole?.status == ConsoleStatus.AT_PLATFORM) {
            status = 'Laukiama nuomos'
            message = 'Prašyti grąžinimo'
        } else if (userConsole?.status == ConsoleStatus.AT_LENDER) {
            status = 'Pas nuomotoją'
            message = 'Prašyti grąžinimo'
        } else if (userConsole?.status == ConsoleStatus.AWAITING_RETURN) {
            status = 'Laukiama grąžinimo'
            message = 'Atšaukti'
        }
        return (
            <div>
                <div className="font-bold">Dabartinė būsena</div>
                <div className="ml-3">{status}</div>
                <div className="mt-5">
                    <button className="bg-bg-extra p-2 rounded-md">{message}</button>
                </div>
            </div>
        )
    }

    return (
        <div className="mt-10 mx-auto flex flex-row">
            <div className="h-[400px] w-[700px] border text-center align-middle mx-10">
                <Carousel>
                    <div>
                        <img src="https://fastly.picsum.photos/id/908/700/400.jpg?hmac=aXlt0vjk314zunXBhxUOJ9chLxnq7xYldFUNzv9WxdU" />
                        <p className="legend">Nuotrauka 1</p>
                    </div>
                    <div>
                        <img src="https://fastly.picsum.photos/id/416/700/400.jpg?hmac=XCPRf5KUWxp4CkpoKc5kIQVO-5q_S1mWTJDPbO4O0ZA" />
                        <p className="legend">Nuotrauka 2</p>
                    </div>
                    <div>
                        <img src="https://fastly.picsum.photos/id/153/700/400.jpg?hmac=0ulBJpBvJhiicFzaMC2mM4Ri6FULpB7GZmmm12K_D8g" />
                        <p className="legend">Nuotrauka 3</p>
                    </div>
                </Carousel>
            </div>
            <div className="mb-10 min-w-[400px]">
                <div className="text-fs-h1">Apie konsolę</div>
                <hr className="pb-2" />
                <div className="font-bold">Pavadinimas</div>
                <div className="ml-3">{userConsole?.console.name}</div>
                <div className="font-bold">Aprašymas</div>
                <div className="ml-3">{userConsole?.console.description}</div>
                {/* <div className="font-bold">Pilna nuomos kaina (1 vnt.)</div>
                <div className="ml-3">{userConsole?.console.dailyPrice} €</div> */}
                <div className="font-bold">Dieninės pajamos nuomos metu (1 vnt.)</div>
                <div className="ml-3">
                    {Math.round((userConsole?.console.dailyPrice ?? 0) * 0.6 * 100) / 100} €
                </div>

                <div className="text-fs-h1 mt-5">Apie nuomos partnerį</div>
                <hr className="pb-2" />
                <div className="font-bold">Pavadinimas</div>
                <div className="ml-3">UAB "Konsolių nuoma"</div>
                <div className="font-bold">Maksimalus grąžinimo terminas</div>
                <div className="ml-3">5 darbo dienos</div>

                <div className="text-fs-h1 mt-5">Nuomos detalės</div>
                <hr className="pb-2" />
                <div className="font-bold">Nuomojamas kiekis</div>
                <div className="ml-3">{userConsole?.amount} vnt.</div>
                <div className="font-bold">Priedai</div>
                <div className="ml-3">{userConsole?.accessories}</div>
                {displayStatus()}
            </div>
        </div>
    )
}

export default MyConsolePage
