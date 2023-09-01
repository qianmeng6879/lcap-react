import request from "@/utils/request"
import { PageData } from "../types"
import { Department, Employee } from "./types"




export const employeeListApi = (params: any = null) => {
    return request<PageData<Employee>>("/api/v1/employees/", "GET", params)
}


export const departmentListApi = (params: any = null) => {
    return request<PageData<Department>>("/api/v1/departments/", "GET", params)
}