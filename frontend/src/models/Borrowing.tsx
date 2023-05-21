import { UserGet } from './User'
import { UserConsoleGet, UserConsoleStatus } from './UserConsole'

export class BorrowingGet {
    id: number
    userId: number
    user: UserGet
    conversationId: number
    status: BorrowingStatus
    userConsoles: UserConsoleGet[]

    constructor(
        id: number,
        userId: number,
        user: UserGet,
        conversationId: number,
        status: BorrowingStatus,
        userConsoles: UserConsoleGet[]
    ) {
        this.id = id
        this.userId = userId
        this.user = user
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
    borrowingStatus: BorrowingStatus

    constructor(id: number, borrowingStatus: BorrowingStatus) {
        this.id = id
        this.borrowingStatus = borrowingStatus
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
