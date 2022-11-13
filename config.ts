interface AuthCodes {
    username: String,
    password: String
}

interface ConfigOptions {
    port: Number
    auth: AuthCodes
}

export const Config: ConfigOptions = {
    port: 3000,
    auth: {
        username: "Retro",
        password: "1111"
    }
}