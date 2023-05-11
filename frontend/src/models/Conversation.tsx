import { MessageGet } from './Message'
import { UserConsoleGet } from './UserConsole'

export class ConversationGet {
    id: number
    userConsoleId: number
    userConsole: UserConsoleGet
    messages: MessageGet[]

    constructor(
        id: number,
        userConsoleId: number,
        userConsole: UserConsoleGet,
        messages: MessageGet[]
    ) {
        this.id = id
        this.userConsoleId = userConsoleId
        this.userConsole = userConsole
        this.messages = messages
    }
}
