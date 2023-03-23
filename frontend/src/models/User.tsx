export class UserGet {
    id: number;
    role: string;
    firstName: string;
    lastName: string;
    companyCode: string;
    companyName: string;
    username: string;
    email: string;
    emailConfirmed: boolean;
    country: string;
    county: string;
    city: string;
    street: string;
    streetNo: string;
    postCode: string;

    constructor(
        id: number,
        role: string,
        firstName: string,
        lastName: string,
        companyCode: string,
        companyName: string,
        username: string,
        email: string,
        emailConfirmed: boolean,
        country: string,
        county: string,
        city: string,
        street: string,
        streetNo: string,
        postCode: string
    ) {
        this.id = id;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.companyCode = companyCode;
        this.companyName = companyName;
        this.username = username;
        this.email = email;
        this.emailConfirmed = emailConfirmed;
        this.country = country;
        this.county = county;
        this.city = city;
        this.street = street;
        this.streetNo = streetNo;
        this.postCode = postCode;
    }
}

export class UserLogin {
    username: string;
    password: string;
    rememberPassword: boolean;

    constructor(username: string, password: string, rememberPassword: boolean) {
        this.username = username;
        this.password = password;
        this.rememberPassword = rememberPassword;
    }
}

export class CustomerRegister {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

export class CompanyRegister {
    username: string;
    companyCode: string;
    companyName: string;
    email: string;
    password: string;

    constructor(
        username: string,
        companyCode: string,
        companyName: string,
        email: string,
        password: string
    ) {
        this.username = username;
        this.companyCode = companyCode;
        this.companyName = companyName;
        this.email = email;
        this.password = password;
    }
}

export enum UserRole {
    admin,
    customer,
    company
}
