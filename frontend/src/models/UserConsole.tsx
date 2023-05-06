import { ConsoleGet } from './Console'
import { ImageAdd, ImageGet, ImageUpdate } from './Image'
import { UserGet } from './User'

export class UserConsoleGet {
    id: number
    userId: number
    user: UserGet
    consoleId: number
    console: ConsoleGet
    amount: number
    accessories: string
    images: ImageGet[]
    status: ConsoleStatus

    constructor(
        id: number,
        userId: number,
        user: UserGet,
        consoleId: number,
        console: ConsoleGet,
        amount: number,
        accessories: string,
        images: ImageGet[],
        status: ConsoleStatus
    ) {
        this.id = id
        this.userId = userId
        this.user = user
        this.consoleId = consoleId
        this.console = console
        this.amount = amount
        this.accessories = accessories
        this.images = images
        this.status = status
    }
}

export class UserConsoleAdd {
    consoleId: number
    amount: number
    accessories: string
    images: ImageAdd[]

    constructor(consoleId: number, amount: number, accessories: string, images: ImageAdd[]) {
        this.consoleId = consoleId
        this.amount = amount
        this.accessories = accessories
        this.images = images
    }
}

export class UserConsoleUpdate {
    id: number
    consoleId: number
    amount: number
    accessories: string
    images: ImageUpdate

    constructor(
        id: number,
        consoleId: number,
        amount: number,
        accessories: string,
        images: ImageUpdate
    ) {
        this.id = id
        this.consoleId = consoleId
        this.amount = amount
        this.accessories = accessories
        this.images = images
    }
}

export class UserConsoleStatusUpdate {
    id: number
    consoleStatus: ConsoleStatus

    constructor(id: number, consoleStatus: ConsoleStatus) {
        this.id = id
        this.consoleStatus = consoleStatus
    }
}

export enum ConsoleStatus {
    AT_OWNER,
    AT_PLATFORM,
    AT_LENDER,
    AWAITING_RETURN
}
