'use client'

import axios from 'axios'

const FileUpload = () => {
  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0]

    const formData = new FormData()
    formData.append('kmz', file)

    try {
      await axios.post('/api/upload', formData)
    } catch (error) {
      console.error('File upload failed:', error)
    }
  }

  return (
    <div>
      <input type="file" onChange={ handleFileUpload } />
    </div>
  )
}

export default FileUpload
