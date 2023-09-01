import request from "@/utils/request"
import { DataModelForm } from "./types"
import { RestData } from "../types"

export const addModelApi = (modelForm: DataModelForm) => {
    return request<RestData<any>>('/api/v1/models/', 'POST', modelForm)
}