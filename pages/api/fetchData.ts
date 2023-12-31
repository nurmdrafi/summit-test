import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

const kmlFilePath = path.resolve('data/uploads/doc.kml')

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Check if the file exists
    if (!fs.existsSync(kmlFilePath)) {
      return res.status(404).json({ message: 'KML file not found' })
    }
    
    const kmlContent = fs.readFileSync(kmlFilePath, 'utf-8')
    res.status(200).send(kmlContent)
  } catch (error) {
    res.status(500).json({ message: 'Unable to read KML file' })
  }
}
