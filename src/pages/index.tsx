import MyComponent from '@/components/MyComponent'
import store from '@/store';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Upload, UploadProps, message } from 'antd'
import { Link } from 'react-router-dom'
const props: UploadProps = {
  name: 'file',
  action: 'http://localhost:5000/upload/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function Home() {
  const changeStoreSub = () => {
    store.dispatch({
      type: "sub",
      value: 2
    })
  }
  const changeStorePlus = () => {
    store.dispatch({
      type: "add",
      value: 1
    })
  }


  return (
    <div>
      <MyComponent />
      <Divider />
      <Link to='/admin' >管理站点</Link>|
      <Link to='/login' >登录</Link>
      <Divider />
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Divider />
      <div>
        <Button onClick={changeStorePlus}>按钮+</Button>
        <Button onClick={changeStoreSub}>按钮-</Button>
      </div>
    </div>
  )
}
