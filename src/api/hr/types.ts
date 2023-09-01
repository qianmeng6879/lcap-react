export interface Department {
    id: string
    name: string
    notes: string
    parent: Department
}

export interface Employee {
    id: string
    name: string
    code: string
    department: string
    hire_date: string
    sex: string
}