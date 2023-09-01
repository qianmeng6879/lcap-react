import { AppClient } from "../app_client/types"
import { Member } from "../types"


export interface Field {
    uid: string
    code: string
    meta: {
        options?: {
            code: string
            name: string
        },
        regex: string

    }
    name: string
    notes: string
    required: boolean
    field_type: string
    default_value?: any
}

export interface DataModel {
    id: number
    name: string
    code: string
    notes: string
    app: AppClient
    field_define: Array<Field>
    creator: Member
}


export interface DataModelForm {
    uid: string,
    app_id: number,
    code: string,
    name: string,
    field_define: Array<Field>
}