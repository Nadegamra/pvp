export class ManufacturerGet {
    id: number;
    name: string;
    description: string;

    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

export class ManufacturerAdd {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export class ManufacturerUpdate {
    manufacturerId: number;
    name?: string;
    description?: string;

    constructor(manufacturerId: number, name?: string, description?: string) {
        this.manufacturerId = manufacturerId;
        this.name = name;
        this.description = description;
    }
}