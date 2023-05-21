import { BorrowingGet } from './Borrowing'
import { MessageGet } from './Message'
import { UserConsoleGet } from './UserConsole'

export class ConversationGet {
    id: number
    userConsoleId: number
    userConsole: UserConsoleGet
    borrowingId: number
    borrowing: BorrowingGet
    messages: MessageGet[]

    constructor(
        id: number,
        userConsoleId: number,
        userConsole: UserConsoleGet,
        borrowingId: number,
        borrowing: BorrowingGet,
        messages: MessageGet[]
    ) {
        this.id = id
        this.userConsoleId = userConsoleId
        this.userConsole = userConsole
        this.borrowingId = borrowingId
        this.borrowing = borrowing
        this.messages = messages
    }
}
