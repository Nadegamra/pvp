export class CategoryGet {
    id: number;
    name: string;
    description: string;
    childCategories: CategoryGet[];

    constructor(id: number, name: string, description: string, childCategories: CategoryGet[]) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.childCategories = childCategories;
    }
}

export class CategoryAdd {
    name: string;
    description: string;
    parentCategoryId?: number;

    constructor(name: string, description: string, parentCategoryId?: number) {
        this.name = name;
        this.description = description;
        this.parentCategoryId = parentCategoryId;
    }
}

export class CategoryUpdate {
    categoryId: number;
    name?: string;
    description?: string;
    parentCategoryId?: number;

    constructor(
        categoryId: number,
        name?: string,
        description?: string,
        parentCategoryId?: number
    ) {
        this.categoryId = categoryId;
        this.name = name;
        this.description = description;
        this.parentCategoryId = parentCategoryId;
    }
}