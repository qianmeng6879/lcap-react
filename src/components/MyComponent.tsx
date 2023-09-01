import { MinusCircleFilled, PlusOutlined } from '@ant-design/icons'
import { Input, Button, InputRef, Divider, Form, Space } from 'antd'
import { useRef, useState } from 'react'
export default function MyComponent() {
    const valRef = useRef<InputRef>(null)
    const submitAction = () => {
        console.log(valRef.current?.input?.value)
    }

    const [formElement, setForm] = useState([
        {
            id: 1,
            code: '',
            nmae: ''
        }
    ])

    const formComplate = (datas: any) => {
        console.log(datas)
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>编码</th>
                        <th>名称</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formElement.map(element => {
                            return (
                                <tr key={element.id}>
                                    <td>
                                        {element.id}
                                    </td>
                                    <td>
                                        <Input />
                                    </td>
                                    <td>
                                        <Input />
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Input ref={valRef} />
            <Button onClick={submitAction}>提交</Button>
            <Divider />
            <Form onFinish={formComplate}>
                <Form.Item>
                    <Form.List name="field_definition">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'code']}
                                            rules={[{ required: true, message: '字段编码为空' }]}
                                        >
                                            <Input placeholder="编码" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            rules={[{ required: true, message: '字段名称为空' }]}
                                        >
                                            <Input placeholder="名称" />
                                        </Form.Item>
                                        <MinusCircleFilled onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        新增一行
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        确认
                    </Button>
                </Form.Item>
            </Form>
        </div >
    )
}
