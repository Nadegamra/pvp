import { ConsoleGet } from './Console'

export class UserConsoleGet {
    id: number
    consoleId: number
    console: ConsoleGet
    userId: number
    amount: number
    description: string
    constructor(
        id: number,
        consoleId: number,
        console: ConsoleGet,
        userId: number,
        amount: number,
        description: string,
        status: ConsoleStatus
    ) {
        this.id = id
        this.consoleId = consoleId
        this.console = console
        this.userId = userId
        this.amount = amount
        this.description = description
        this.status = status
    }
    status: ConsoleStatus
}

export enum ConsoleStatus {
    AT_OWNER,
    AT_PLATFORM,
    AT_LENDER,
    AWAITING_RETURN
}
