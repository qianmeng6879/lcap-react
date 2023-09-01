import { employeeListApi } from '@/api/hr'
import { Employee } from '@/api/hr/types'
import { Button, Divider, Input, Table } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'

const columns = [
    {
        title: "员工姓名",
        key: "name",
        dataIndex: "name",
    },
    {
        title: "性别",
        key: "sex",
        dataIndex: "sex",
    },
    {
        title: "所属部门",
        key: "department",
        dataIndex: "department",
    },
    {
        title: "入职日期",
        key: "hire_date ",
        dataIndex: "hire_date",
    },
    {
        title: "操作",
        key: "name",
        render: () => {
            return (
                <Fragment>
                    <Button type='primary'>查看</Button>
                </Fragment>
            )
        }
    }
]


export default function EmployeeList() {
    const [dataSource, setDataSource] = useState<Employee[]>([])
    const [dataLoading, setDataLoading] = useState(false)
    const [searchLoading, setSearchLoading] = useState(false)

    // load data
    useEffect(() => {
        setDataLoading(true)
        employeeListApi().then(
            response => {
                setDataSource(response.results)
            }
        ).finally(() => setDataLoading(false))
    }, [])


    const onAddAction = () => {

    }

    const onRemoveAction = () => {

    }

    const onSearchAction = (value: string) => {
        setSearchLoading(true)
        employeeListApi(value ? { search: value } : null).then(
            response => {
                setDataSource(response.results)
            }
        ).finally(() => setSearchLoading(false))
    }


    return (
        <div>
            <h3>雇员信息</h3>
            <div className='site-header'>
                <Button onClick={onAddAction} className='site-btn' type='primary'>新增</Button>
                <Button onClick={onRemoveAction} className='site-btn' type='primary' danger>删除</Button>
                <Input.Search loading={searchLoading} onSearch={onSearchAction} style={{ width: "280px" }} enterButton="搜索" allowClear placeholder="请输入关键词" />
            </div>
            <Divider />
            <Table rowKey='name' dataSource={dataSource} columns={columns} loading={dataLoading} />
        </div>
    )
}
