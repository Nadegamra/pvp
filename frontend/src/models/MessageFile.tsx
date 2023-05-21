export class MessageFileGet {
    path: string
    name: string
    description: string
    messageId: number

    constructor(path: string, name: string, description: string, messageId: number) {
        this.path = path
        this.name = name
        this.description = description
        this.messageId = messageId
    }
}

export class MessageFileAdd {
    name: string
    description: string
    messageId: number
    stream: string

    constructor(name: string, description: string, messageId: number, stream: string) {
        this.name = name
        this.description = description
        this.messageId = messageId
        this.stream = stream
    }
}

export function messageFilePathToURL(path: string) {
    return `https://res.cloudinary.com/drzqsbvky/image/upload/${path}`
}
