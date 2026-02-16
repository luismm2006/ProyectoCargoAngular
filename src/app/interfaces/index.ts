
export interface User {
    id : string,
    email : string,
    name : string,
    role : string
}

export interface LoginResponse {
    token : string,
    user : User
}

export interface JWTPayload{
    id : string,
    email : string,
    name : string,
    role : string,
    exp : number,
    iat : number
}