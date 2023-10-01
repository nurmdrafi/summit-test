'use client'

import { message } from 'antd'
import axios from 'axios'

const FileUpload = () => {
  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0]

    const formData = new FormData()
    formData.append('kmz', file)

    try {
      await axios.post('/api/upload', formData)
        .then(res => message.success({ key: 'upload-success', content: res.data?.message }))
    } catch (error: any) {
      message.error({ key: 'upload-error', content: error.response?.data.message ? error.response?.data?.message : 'File Upload Error' })
    }
  }

  return (
    <div>
      <input type="file" onChange={ handleFileUpload } />
    </div>
  )
}

export default FileUpload
