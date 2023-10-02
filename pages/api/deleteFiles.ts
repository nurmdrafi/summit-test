import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const directoryPath = path.join(process.cwd(), 'data/uploads')

  try {
    // Read the files in the directory
    const files = await fs.promises.readdir(directoryPath)

    // Iterate through the files and delete each one
    for (const file of files) {
      const filePath = path.join(directoryPath, file)
      fs.promises.unlink(filePath)
    }

    res.status(200).json({ message: 'File deleted successfully.' })
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting file.' })
  }
}
