export class ImageGet {
    id: number
    path: string
    name: string
    description: string
    toDelete: boolean
    consoleId?: number
    userConsoleId?: number

    constructor(
        id: number,
        path: string,
        name: string,
        description: string,
        toDelete: boolean,
        consoleId?: number,
        userConsoleId?: number
    ) {
        this.id = id
        this.path = path
        this.name = name
        this.description = description
        this.toDelete = toDelete
        this.consoleId = consoleId
        this.userConsoleId = userConsoleId
    }
}

export class ImageAdd {
    name: string
    description: string
    stream: string
    consoleId?: number
    userConsoleId?: number

    constructor(
        name: string,
        description: string,
        stream: string,
        consoleId?: number,
        userConsoleId?: number
    ) {
        this.name = name
        this.description = description
        this.stream = stream
        this.consoleId = consoleId
        this.userConsoleId = userConsoleId
    }
}

export class ImageUpdate {
    id: number
    name: string
    description: string

    constructor(id: number, name: string, description: string) {
        this.id = id
        this.name = name
        this.description = description
    }
}

export function imagePathToURL(path: string, width: number) {
    return `https://res.cloudinary.com/drzqsbvky/image/upload/w_${width}/${path}`
}
