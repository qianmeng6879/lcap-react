import { dataModelListApi, getAppClientApi } from '@/api';
import { AppClient } from '@/api/app_client/types';
import { addModelApi } from '@/api/data_model';
import { DataModel } from '@/api/data_model/types';
import ModelForm from '@/components/model/ModelForm';
import { Button, Input, Pagination, Table, Tabs, notification } from 'antd'
import { useEffect, useState } from 'react';





interface propTypes {
    create?: boolean
    remove?: boolean
    search?: boolean
}

export default function DataModelView(props: propTypes) {
    const { create = true, remove = true, search = true } = props;
    const [datasource, setDatasource] = useState<Array<DataModel>>([])
    const [dataCount, setDataCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [formDialogState, setFormDialogState] = useState(false)
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '编号',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '所属应用',
            render: (row: DataModel) => {
                return (
                    <span>{row.app.name}</span>
                )
            }
        },
        {
            title: '创建者',
            render: (row: DataModel) => {
                return (
                    <span>{row.creator.username}</span>
                )
            }
        },
        {
            title: '操作',
            render: (row: any) => {
                return (
                    <Button>查看 - {row.id}</Button>
                )
            }
        }
    ];

    useEffect(() => {
        dataModelListApi().then(
            res => {
                setDatasource(res.results)
                setDataCount(res.count)
            }
        ).finally(
            () => setLoading(false)
        )
    }, [])


    const tagPages = [
        {
            label: '列表',
            key: 'list',
            children: (
                <>
                    <Table loading={loading} dataSource={datasource} columns={columns} pagination={false} rowKey='id' />
                    <div className='site-footer'>
                        <Pagination defaultCurrent={1} total={dataCount} />
                    </div>
                </>
            )
        },
        {
            label: '新增模型',
            key: 'add',
            children: (
                <ModelForm />
            )
        }
    ]

    return (
        <div>
            <h3>数据模型</h3>
            <div className='site-header'>
                {create && <Button onClick={() => setFormDialogState(true)} className='site-btn' type='primary'>新增</Button>}
                {(remove && datasource.length > 0) && <Button className='site-btn' type='primary' danger>删除</Button>}
                {search && <Input.Search style={{ width: "280px" }} enterButton="搜索" allowClear placeholder="请输入关键词" />}
            </div>

            <Tabs
                defaultActiveKey="1"
                type="card"
                items={tagPages}
            />
        </div>
    )
}
