import axios from 'axios'

// Import Components
import { Button, Col, Row, message } from 'antd'

const FileSystemControls = () => {
  // Handle File Upload
  const _handleFileUpload = async (event: any) => {
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

  // Delete Existing Files
  const _deleteExistingFiles = () => {
    try {
      axios.delete('/api/deleteFiles')
        .then(res => message.success({ key: 'delete-success', content: res.data?.message ? res.data?.message : 'File deleted successfully.' }))
    } catch (error: any) {
      message.error({ key: 'upload-error', content: error.response?.data.message ? error.response?.data?.message : 'An error occurred while deleting file' })
    }
  }

  return (
    <Row>
      {/* Import */}
      <Col span={ 24 } style={ buttonWrapperStyles }>
        <label htmlFor='file' className="custom-file-upload">
          Import
          <input type="file" id='file' onChange={ _handleFileUpload } accept=".kmz" />
        </label>
      </Col>

      {/* Export */}
      <Col span={ 24 } style={ buttonWrapperStyles }>
        <button type='button' className='custom-file-export'>Export</button>
      </Col>

      {/* Clear Import */}
      <Col span={ 24 } style={ buttonWrapperStyles }>
        <Button type='primary' size='large' danger style={{ width: '95%' }} onClick={ _deleteExistingFiles }>Clear Import</Button>
      </Col>
    </Row>
  )
}

// Style
const buttonWrapperStyles = {
  display: 'flex', 
  justifyContent: 'center', 
  margin: '10px 0'
}

export default FileSystemControls
