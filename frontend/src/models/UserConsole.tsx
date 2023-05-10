import { ConsoleGet } from './Console'
import { ConversationGet } from './Conversation'
import { ImageAdd, ImageGet, ImageUpdate } from './Image'
import { UserGet } from './User'

export class UserConsoleGet {
    id: number
    userId: number
    user: UserGet
    consoleId: number
    console: ConsoleGet
    conversationId: number
    conversation: ConversationGet
    amount: number
    accessories: string
    images: ImageGet[]
    consoleStatus: ConsoleStatus

    constructor(
        id: number,
        userId: number,
        user: UserGet,
        consoleId: number,
        console: ConsoleGet,
        conversationId: number,
        conversation: ConversationGet,
        amount: number,
        accessories: string,
        images: ImageGet[],
        consoleStatus: ConsoleStatus
    ) {
        this.id = id
        this.userId = userId
        this.user = user
        this.consoleId = consoleId
        this.console = console
        this.conversationId = conversationId
        this.conversation = conversation
        this.amount = amount
        this.accessories = accessories
        this.images = images
        this.consoleStatus = consoleStatus
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
    UNCONFIRMED,
    AT_OWNER,
    AT_PLATFORM,
    AT_LENDER,
    AWAITING_TERMINATION
}

export function getConsoleStatusString(status: ConsoleStatus) {
    if (status === ConsoleStatus.UNCONFIRMED) {
        return 'userConsolePage.statusUnconfirmed'
    } else if (status === ConsoleStatus.AT_OWNER) {
        return 'userConsolePage.statusAtOwner'
    } else if (status === ConsoleStatus.AT_PLATFORM) {
        return 'userConsolePage.statusAtPlatform'
    } else if (status === ConsoleStatus.AT_LENDER) {
        return 'userConsolePage.statusAtLender'
    } else {
        return 'userConsolePage.statusTerminating'
    }
}
