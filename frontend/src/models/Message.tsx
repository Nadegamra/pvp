import { ConversationGet } from './Conversation'

export class MessageGet {
    id: number
    conversationId: number
    conversation: ConversationGet
    text: string
    fromAdmin: boolean

    constructor(
        id: number,
        conversationId: number,
        conversation: ConversationGet,
        text: string,
        fromAdmin: boolean
    ) {
        this.id = id
        this.conversationId = conversationId
        this.conversation = conversation
        this.text = text
        this.fromAdmin = fromAdmin
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
