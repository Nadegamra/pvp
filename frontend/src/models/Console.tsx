import { ImageAdd, ImageGet, ImageUpdate } from './Image'

export class ConsoleGet {
    id: number
    name: string
    description: string
    dailyPrice: number
    images: ImageGet[]

    constructor(
        id: number,
        name: string,
        description: string,
        dailyPrice: number,
        images: ImageGet[]
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.dailyPrice = dailyPrice
        this.images = images
    }
}

export class ConsoleAdd {
    name: string
    description: string
    dailyPrice: number
    images: ImageAdd[]

    constructor(name: string, description: string, dailyPrice: number, images: ImageAdd[]) {
        this.name = name
        this.description = description
        this.dailyPrice = dailyPrice
        this.images = images
    }
}

export class ConsoleUpdate {
    id: number
    name: string
    description: string
    dailyPrice: number
    images: ImageUpdate[]

    constructor(
        id: number,
        name: string,
        description: string,
        dailyPrice: number,
        images: ImageUpdate[]
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.dailyPrice = dailyPrice
        this.images = images
    }
}
