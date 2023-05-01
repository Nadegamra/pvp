export class UserGet {
    id: number
    role: string
    firstName: string
    lastName: string
    companyCode: string
    companyName: string
    username: string
    email: string
    emailConfirmed: boolean
    country: string
    county: string
    city: string
    street: string
    streetNo: string
    postCode: string
    isCompany: boolean

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
        postCode: string,
        isCompany: boolean
    ) {
        this.id = id
        this.role = role
        this.firstName = firstName
        this.lastName = lastName
        this.companyCode = companyCode
        this.companyName = companyName
        this.username = username
        this.email = email
        this.emailConfirmed = emailConfirmed
        this.country = country
        this.county = county
        this.city = city
        this.street = street
        this.streetNo = streetNo
        this.postCode = postCode
        this.isCompany = isCompany
    }
}

export class UserLogin {
    username: string
    password: string
    rememberPassword: boolean

    constructor(username: string, password: string, rememberPassword: boolean) {
        this.username = username
        this.password = password
        this.rememberPassword = rememberPassword
    }
}

export class RegisterPhysical {
    username: string
    firstName: string
    lastName: string
    email: string
    password: string

    constructor(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) {
        this.username = username
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.password = password
    }
}

export class RegisterLegal {
    username: string
    companyCode: string
    companyName: string
    email: string
    password: string

    constructor(
        username: string,
        companyCode: string,
        companyName: string,
        email: string,
        password: string
    ) {
        this.username = username
        this.companyCode = companyCode
        this.companyName = companyName
        this.email = email
        this.password = password
    }
}

export class RegisterRequestApproval {
    requestId: number
    isApproved: boolean
    constructor(requestId: number, isApproved: boolean) {
        this.requestId = requestId
        this.isApproved = isApproved
    }
}

export class RegisterRequest {
    id: number
    companyCode: string
    companyName: string
    email: string
    dateCreated: Date

    constructor(
        id: number,
        companyCode: string,
        companyName: string,
        email: string,
        dateCreated: Date
    ) {
        this.id = id
        this.companyCode = companyCode
        this.companyName = companyName
        this.email = email
        this.dateCreated = dateCreated
    }
}

export class UserPasswordReset {
    resetCode: string
    newPassword: string

    constructor(resetCode: string, newPassword: string) {
        this.resetCode = resetCode
        this.newPassword = newPassword
    }
}

export class UserPasswordChange {
    oldPassword: string
    newPassword: string

    constructor(resetCode: string, newPassword: string) {
        this.oldPassword = resetCode
        this.newPassword = newPassword
    }
}

export class UserEmailChange {
    newEmail: string

    constructor(newEmail: string) {
        this.newEmail = newEmail
    }
}

export enum UserRole {
    admin,
    lender,
    borrower
}
