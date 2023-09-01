import React, { useState } from 'react'
import './index.css'
import { Progress, message, notification } from 'antd'
import { v4 } from 'uuid'
const supportFileType = [
    'jpeg',
    'jpg',
    'png'
]

export default function FileUpload(props: { successHandle: Function, uploadUrl: string, isUpload: boolean, prefix: string, accessToken: string }) {
    const [dataUrl, setDataUrl] = useState<string>('')
    const [percent, setPercent] = useState<number>(0);

    const uploadFile = (fileData: string, filename: string) => {
        filename = v4() + '.' + filename.substring(filename.lastIndexOf(".") + 1)
        let xhr = new XMLHttpRequest()
        xhr.open("POST", props.uploadUrl)

        xhr.upload.onprogress = (e) => {
            console.log(e)
            setPercent(e.loaded / e.total * 100)
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {

                    if (props.successHandle) {
                        props.successHandle(JSON.parse(xhr.responseText))
                    }
                    notification.success({
                        message: "文件上传成功"
                    })
                } else {
                    notification.error({
                        message: "文件上传失败"
                    })
                }
            }
        }
        xhr.setRequestHeader("Authorization", "Bearer " + props.accessToken)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify({
            filename: filename,
            prefix: props.prefix,
            data: fileData
        }))
    }

    const renderImage = (file: File) => {
        let fr = new FileReader()

        fr.readAsDataURL(file)

        return new Promise((resolve, reject) => {
            fr.onload = (data) => {
                if (data.target?.result) {
                    setDataUrl(data.target.result.toString())
                    resolve(data.target.result)
                }
            }
        })
    }

    const checkFileType = (file: File) => {
        const fileExtend = file.type.substring(file.type.lastIndexOf("/") + 1)
        return supportFileType.indexOf(fileExtend) != -1
    }

    const changeFile = async (e) => {
        setPercent(0)
        if (e.target.files.length > 0) {
            const file = e.target.files[0]
            if (checkFileType(file)) {
                let fileData = await renderImage(file)

                if (props.isUpload) {
                    uploadFile(fileData.substring(fileData.indexOf(",") + 1), file.name)
                }
            } else {
                message.error("不支持的文件类型")
            }
        }
    }

    return (
        <div>
            <div className="file_upload">
                <img className="pre_image" src={dataUrl} />
                <input type="file" onChange={changeFile} />
            </div>
            <Progress className='upload_progres' percent={percent} showInfo={false} />
        </div>
    )
}
