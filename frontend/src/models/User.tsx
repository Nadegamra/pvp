export class UserGet {
    id: number;
    role: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    emailConfirmed: boolean;

    constructor(
        id: number,
        role: string,
        firstName: string,
        lastName: string,
        username: string,
        email: string,
        emailConfirmed: boolean
    ) {
        this.id = id;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.emailConfirmed = emailConfirmed;
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
