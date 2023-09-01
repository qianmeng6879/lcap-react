import { departmentListApi } from '@/api/hr'
import { Department } from '@/api/hr/types'
import { Button, Divider, Input, Table } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'


const columns = [
    {
        title: "部门名称",
        key: "name",
        dataIndex: "name",
    },
    {
        title: "上级部门",
        key: "parent",
        render: (row: Department) => {
            return row.parent ? row.parent.name : '-'
        }
    },
    {
        title: "备注",
        key: "notes",
        dataIndex: "notes"
    },
    {
        title: "操作",
        key: 'name',
        render: () => {
            return (
                <Fragment>
                    <Button type='primary'>查看</Button>
                </Fragment>
            )
        }
    }
]

export default function DepartmentList() {
    const [dataSource, setDataSource] = useState<Department[]>([])
    const [dataLoading, setDataLoading] = useState(false)


    useEffect(() => {
        setDataLoading(true)
        departmentListApi().then(
            response => {
                setDataSource(response.results)
            }
        ).finally(() => setDataLoading(false))
    }, [])
    return (
        <div>
            <h3>部门信息</h3>
            <div className='site-header'>
                <Button className='site-btn' type='primary'>新增</Button>
                <Button className='site-btn' type='primary' danger>删除</Button>
                <Input.Search style={{ width: "280px" }} enterButton="搜索" allowClear placeholder="请输入关键词" />
            </div>
            <Divider />
            <Table rowKey='name' dataSource={dataSource} columns={columns} loading={dataLoading} />
        </div>
    )
}
