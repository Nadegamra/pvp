import axios from 'axios'
import { ConsoleAdd, ConsoleGet, ConsoleUpdate } from '../models/Console'
import { getConsoles } from './ConsolesApi'
import { ConsoleStatus, UserConsoleGet } from '../models/UserConsole'

const api = axios.create({
    baseURL: 'https://localhost:44351/UserConsoles/'
})

const headers = {
    withCredentials: true
}

export async function getUserConsoles() {
    const consoles: ConsoleGet[] = (await getConsoles()).data
    const userConsoles: UserConsoleGet[] = [
        {
            id: 1,
            userId: 2,
            consoleId: 1,
            console: consoles.filter((x) => x.id == 1)[0],
            amount: 1,
            description: '3 pulteliai',
            status: ConsoleStatus.AT_LENDER
        },
        {
            id: 2,
            userId: 2,
            consoleId: 2,
            console: consoles.filter((x) => x.id == 2)[0],
            amount: 3,
            description: '12 pultelių',
            status: ConsoleStatus.AWAITING_RETURN
        }
    ]
    return userConsoles
}

export async function getUserConsole(id: number) {
    const consoles: ConsoleGet[] = (await getConsoles()).data
    const userConsoles: UserConsoleGet[] = [
        {
            id: 1,
            userId: 2,
            consoleId: 1,
            console: consoles.filter((x) => x.id == 1)[0],
            amount: 1,
            description: '3 pulteliai',
            status: ConsoleStatus.AT_LENDER
        },
        {
            id: 2,
            userId: 2,
            consoleId: 2,
            console: consoles.filter((x) => x.id == 2)[0],
            amount: 3,
            description: '12 pultelių',
            status: ConsoleStatus.AWAITING_RETURN
        }
    ]

    return userConsoles.filter((x) => x.id == id)[0]
}
