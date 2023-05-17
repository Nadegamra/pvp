import { ConversationGet } from './Conversation'

export class MessageGet {
    id: number
    conversationId: number
    conversation: ConversationGet
    text: string
    fromAdmin: boolean
    dateSent: Date

    constructor(
        id: number,
        conversationId: number,
        conversation: ConversationGet,
        text: string,
        fromAdmin: boolean,
        dateSent: Date
    ) {
        this.id = id
        this.conversationId = conversationId
        this.conversation = conversation
        this.text = text
        this.fromAdmin = fromAdmin
        this.dateSent = dateSent
    }
}
export class MessageAdd {
    conversationId: number
    text: string

    constructor(conversationId: number, text: string) {
        this.conversationId = conversationId
        this.text = text
    }
}
