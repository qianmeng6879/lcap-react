import { getAppClientApi } from '@/api'
import { AppClient } from '@/api/app_client/types'
import { Button, Form, Input, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'



const fieldTypes = [
    {
        name: "文本",
        value: "string"
    },
    {
        name: "整数",
        value: "integer"
    },
    {
        name: "数字",
        value: "number"
    },
    {
        name: "选择",
        value: "select"
    },
    {
        name: "引用",
        value: "reference"
    },
    {
        name: "布尔",
        value: "boolean"
    },
    {
        name: "日期",
        value: "date"
    },
    {
        name: "日期时间",
        value: "datetime"
    },
]

export default function ModelForm() {
    const [appClient, setAppclient] = useState<Array<AppClient>>([])

    const [formData, setFormData] = useState([{
        uid: v4(),
        name: '',
        code: '',
        required: false,
        field_type: "string",
        notes: '',
        meta: {},
        default_value: null
    }])


    const removeRecordAction = (uid: string) => {
        if (formData.length === 1) {
            return message.error("删除失败，至少有一个字段定义")
        }
        setFormData(formData.filter(item => item.uid !== uid))
    }

    const addRecordAction = () => {
        setFormData([...formData, {
            uid: v4(),
            name: '',
            code: '',
            required: false,
            field_type: "string",
            notes: '',
            meta: {},
            default_value: null
        }])
    }


    const changeFieldValueAction = (uid: string, name: string, value: any) => {
        const currentField = formData.filter(item => item.uid === uid)[0]
        currentField[[name]] = value
        setFormData(formData.map(item => item.uid === uid ? currentField : item))
    }


    const formFinishAction = (data: any) => {
        console.log({ data, fields: formData })
    }

    useEffect(() => {
        getAppClientApi().then(
            res => {
                setAppclient(res.results)
            }
        )
    }, [])
    return (
        <div>
            <Form labelAlign='left' onFinish={formFinishAction}>
                <Form.Item name='app_id' label="应用" rules={[{ required: true, message: '应用未选择' }]}>
                    <Select>
                        {
                            appClient?.map(item => {
                                return (
                                    <Select.Option value={item.id} key={item.id}>
                                        {item.name}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                </Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Form.Item name='name' label="名称" rules={[{ required: true, message: '模型名称为空' }]}>
                        <Input autoComplete='off' />
                    </Form.Item>
                    <Form.Item name='code' label="编码" rules={[{ required: true, message: '模型编码为空' }]}>
                        <Input autoComplete='off' />
                    </Form.Item>
                </div>
                <div><Button onClick={addRecordAction}>新增一行</Button></div>
                <div style={{ margin: '10px' }}>
                    <table className="account_table" style={{ width: '200px', margin: 'auto' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '25px' }}>编码</th>
                                <th>名称</th>
                                <th>类型</th>
                                <th>必填</th>
                                <th>备注</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                formData.map((item) => (
                                    <tr key={item.uid}>
                                        <td>
                                            <input autoComplete='off' type="text" defaultValue={item.code} name='code' onChange={(e) => changeFieldValueAction(item.uid, e.target.name, e.target.value)} />
                                        </td>
                                        <td><input autoComplete='off' type="text" defaultValue={item.name} name='name' onChange={(e) => changeFieldValueAction(item.uid, e.target.name, e.target.value)} />
                                        </td>
                                        <td>
                                            <select defaultValue={item.field_type} name='field_type' onChange={(e) => changeFieldValueAction(item.uid, e.target.name, e.target.value)}>
                                                {
                                                    fieldTypes.map(item => {
                                                        return (
                                                            <option key={item.value} value={item.value}>{item.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </td>
                                        <td>
                                            <input className="is_required" type="checkbox" name='isRequired' onChange={(e) => changeFieldValueAction(item.uid, e.target.name, !item.required)} />
                                        </td>
                                        <td><input autoComplete='off' className="notes" type="text" defaultValue={item.notes} name='notes' onChange={(e) => changeFieldValueAction(item.uid, e.target.name, e.target.value)} />
                                        </td>
                                        <td>
                                            <button onClick={() => removeRecordAction(item.uid)} type='button' style={{ width: '50px' }}>删除</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div>
                    <Button htmlType='submit' type='primary'>确认</Button>
                </div>
            </Form>
        </div >
    )
}