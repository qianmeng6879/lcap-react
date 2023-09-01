import request from "@/utils/request"
import { LoginData, TokenType, UploadFileType, UserProfile, PageData } from "./types"
import { AppClient, AppClientForm } from "./app_client/types"
import { DataModel } from "./data_model/types"

interface ApiResponse<T> {
    data: T,
    code: number,
    message: string
}


export const getTokenApi = (data: LoginData) => {
    return request<TokenType>('/token/', "POST", data)
}

export const getUserinfoApi = () => {
    return request<UserProfile>('/token/userinfo/', "GET")
}

export const verifyTokenApi = (token: string) => {
    return request<{ success: boolean, message: string, type: string, expire: number }>("/token/verify/", "POST", { token })
}

export const refreshTokenApi = (refreshToken: string) => {
    return request<TokenType>("/token/refresh/", "POST", { refresh_token: refreshToken })
}

export const getAppClientApi = () => {
    return request<PageData<AppClient>>('/api/v1/apps/', "GET")
}

export const uploadFileApi = (fileObj: UploadFileType) => {
    return request("/file/upload/image/", "POST", fileObj)
}

export const addAppClientApi = (data: AppClientForm) => {
    return request("/api/v1/apps/", "POST", data)
}

export const forgetPasswrodApi = (email: string) => {
    return request("/api/v1/members/password/forget/", "POST", { email: email })
}

// 用户列表、分页接口
export const userListApi = () => {
    return request<PageData<UserProfile>>("/api/v1/members/", "GET")
}

export const dataModelListApi = () => {
    return request<PageData<DataModel>>("/api/v1/models/", "GET")
}


export const getImageCodeApi = (flag: string) => {
    return request<{ data: string, prefix: string }>("/code/image/?format=json&flag=" + flag, "GET")
}