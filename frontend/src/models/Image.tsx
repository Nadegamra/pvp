export class ImageGet {
    id: number
    path: string
    name: string
    description: string
    consoleId: number

    constructor(id: number, path: string, name: string, description: string, consoleId: number) {
        this.id = id
        this.path = path
        this.name = name
        this.description = description
        this.consoleId = consoleId
    }
}

export class ImageAdd {
    name: string
    description: string
    consoleId: number
    stream: string

    constructor(name: string, description: string, consoleId: number, stream: string) {
        this.name = name
        this.description = description
        this.consoleId = consoleId
        this.stream = stream
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
