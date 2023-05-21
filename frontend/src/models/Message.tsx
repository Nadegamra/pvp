import { ConversationGet } from './Conversation'
import { MessageFileAdd, MessageFileGet } from './MessageFile'

export class MessageGet {
    id: number
    conversationId: number
    conversation: ConversationGet
    text: string
    fromAdmin: boolean
    dateSent: Date
    messageFiles: MessageFileGet[]

    constructor(
        id: number,
        conversationId: number,
        conversation: ConversationGet,
        text: string,
        fromAdmin: boolean,
        dateSent: Date,
        messageFiles: MessageFileGet[]
    ) {
        this.id = id
        this.conversationId = conversationId
        this.conversation = conversation
        this.text = text
        this.fromAdmin = fromAdmin
        this.dateSent = dateSent
        this.messageFiles = messageFiles
    }
}
export class MessageAdd {
    conversationId: number
    text: string
    files: MessageFileAdd[]

    constructor(conversationId: number, text: string, files: MessageFileAdd[]) {
        this.conversationId = conversationId
        this.text = text
        this.files = files
    }
}
