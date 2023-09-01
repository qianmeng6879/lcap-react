export interface Data<T> {
    message: string
    code: number
    data: T
}

export interface RestData<T> {
    message: string
    code: number
    data: T
}

export interface UserProfile {
    id: number
    username: string
    avatar: string
    options: {
        is_active: boolean
        is_staff: boolean
        is_admin: boolean
    }
}

export interface Member {
    "id": number
    "last_login": string
    "is_superuser": boolean
    "username": string
    "first_name": string
    "last_name": string
    "email": string
    "is_staff": boolean
    "is_active": boolean
    "date_joined": string
    "phone": string
    "avatar": string
    "groups": [],
    "user_permissions": []
}

export interface LoginData {
    username: string
    password: string
    flag: string,
    code: string
}

export interface TokenType {
    refresh_token: string
    access_token: string
}


export interface UploadFileType {
    data: string,
    prefix: string,
    filename: string
}

export interface UserProfile {
    id: number
    username: string
    nickname: string
    email: string
    phone: string
    avatar: string
}


export interface PageData<T> {
    count: number
    next: string | null
    previous: string | null
    results: Array<T>
}