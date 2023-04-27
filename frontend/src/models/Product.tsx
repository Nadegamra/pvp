

export class ProductGet {
    id: number;
    manufacturerId: number;
    categoryid: number;
    name: string;
    description: string;
    currentDiscount: number;
    priceEurNoTaxes: number;
    images: ProductImageGet[];


    constructor(
        id: number,
        manufacturerId: number,
        categoryid: number,
        name: string,
        description: string,
        currentDiscount: number,
        priceEurNoTaxes: number,
        images: ProductImageGet[],
    ) {
        this.id = id;
        this.manufacturerId = manufacturerId;
        this.categoryid = categoryid;
        this.name = name;
        this.description = description;
        this.currentDiscount = currentDiscount;
        this.priceEurNoTaxes = priceEurNoTaxes;
        this.images = images;
    }
}

export class ProductAdd {
    manufacturerId: number;
    categoryid: number;
    name: string;
    description: string;
    priceEurNoTaxes: number;

    constructor(
        manufacturerId: number,
        categoryid: number,
        name: string,
        description: string,
        priceEurNoTaxes: number
    ) {
        this.manufacturerId = manufacturerId;
        this.categoryid = categoryid;
        this.name = name;
        this.description = description;
        this.priceEurNoTaxes = priceEurNoTaxes;
    }
}

export class ProductAddUnits {
    productId: number;
    units: number;

    constructor(productId: number, units: number) {
        this.productId = productId;
        this.units = units;
    }
}

export class ProductUpdate {
    productId: number;
    manufacturerId?: number;
    categoryid?: number;
    name?: string;
    description?: string;
    priceEurNoTaxes?: number;
    currentDiscount?: number;

    constructor(
        productId: number,
        manufacturerId?: number,
        categoryid?: number,
        name?: string,
        description?: string,
        priceEurNoTaxes?: number,
        currentDiscount?: number
    ) {
        this.productId = productId;
        this.manufacturerId = manufacturerId;
        this.categoryid = categoryid;
        this.name = name;
        this.description = description;
        this.priceEurNoTaxes = priceEurNoTaxes;
        this.currentDiscount = currentDiscount;
    }
}

export class ProductImageGet {
    id: number;
    description: string;
    displaySizeURL: string;
    thumbnailURL: string;
    productId: number;

    constructor(
        id: number,
        description: string,
        displaySizeUrl: string,
        thumbnailUrl: string,
        productId: number
    ) {
        this.id = id;
        this.description = description;
        this.displaySizeURL = displaySizeUrl;
        this.thumbnailURL = thumbnailUrl;
        this.productId = productId;
    }
}

export class ProductImageAdd {
    description: string;
    displaySizeURL: string;
    thumbnailURL: string;
    productId: number;

    constructor(
        description: string,
        displaySizeUrl: string,
        thumbnailUrl: string,
        productId: number
    ) {
        this.description = description;
        this.displaySizeURL = displaySizeUrl;
        this.thumbnailURL = thumbnailUrl;
        this.productId = productId;
    }
}