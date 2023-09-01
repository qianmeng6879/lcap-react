export const AppState = {
    created: "已创建",
    running: "运行中",
    closed: "已下架"
}


export interface AppClient {
    id: number
    name: string
    code: string
    notes: string
    picture: string
    is_public: boolean
    app_type: string
    state: string
    creator: number
    created_time: string
    last_modified_time: string
    is_delete: boolean
    deleted_time: string
}
export interface AppClientForm {
    name: string
    code: string
    notes: string
    picture: string
    is_public: boolean
    app_type: string
}