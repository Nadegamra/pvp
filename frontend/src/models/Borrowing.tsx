import { UserConsoleGet } from './UserConsole'

export class BorrowingGet {
    id: number
    userId: number
    conversationId: number
    status: BorrowingStatus
    userConsoles: UserConsoleGet[]

    constructor(
        id: number,
        userId: number,
        conversationId: number,
        status: BorrowingStatus,
        userConsoles: UserConsoleGet[]
    ) {
        this.id = id
        this.userId = userId
        this.conversationId = conversationId
        this.status = status
        this.userConsoles = userConsoles
    }
}

export class BorrowingAdd {
    userConsoleIds: number[]

    constructor(userConsoleIds: number[]) {
        this.userConsoleIds = userConsoleIds
    }
}

export class BorrowingUpdate {
    id: number
    userConsoleIds: number[]

    constructor(id: number, userConsoleIds: number[]) {
        this.id = id
        this.userConsoleIds = userConsoleIds
    }
}

export class BorrowingUpdateStatus {
    id: number
    status: BorrowingStatus

    constructor(id: number, status: BorrowingStatus) {
        this.id = id
        this.status = status
    }
}

export enum BorrowingStatus {
    PENDING,
    ACTIVE,
    AWAITING_TERMINATION
}

export function getBorrowingStatusString(status: BorrowingStatus) {
    if (status === BorrowingStatus.PENDING) {
        return 'borrowing.statusPending'
    } else if (status === BorrowingStatus.ACTIVE) {
        return 'borrowing.statusActive'
    } else {
        return 'borrowing.statusTerminating'
    }
}
