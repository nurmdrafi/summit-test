import multer from 'multer'
import { json } from 'body-parser'
import util from 'util'
import fs from 'fs'
import path from 'path'
import unzipper from 'unzipper'

const upload = multer({
  dest: 'data/temp/' // Destination folder for temporary storage
}).single('kmz') // 'kmz' should match the name attribute of your file input

const uploadMiddleware = util.promisify(upload)

export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser
  },
}

export default function handler(req: any, res: any) {
  try {
    // Parse the request body with a higher limit
    const parseBody = json({ limit: '50mb' })
    parseBody(req, res, async () => {
      try {
        await uploadMiddleware(req, res)

        const kmzFile = req.file
        const kmzFilePath = kmzFile.path

        // Unzip the KMZ file
        fs.createReadStream(kmzFilePath)
          .pipe(unzipper.Extract({ path: 'data/uploads/' })) // Extract to 'data/uploads'
          .on('finish', () => {
            // Delete all files from 'data/temp/'
            const tempDirPath = 'data/temp/'
            fs.readdirSync(tempDirPath).forEach(file => {
              const filePath = path.join(tempDirPath, file)
              fs.unlinkSync(filePath)
            })
            
            // send response
            res.status(200).send({ message: 'File uploaded and extracted successfully.' })
          })
      } catch (error) {
        res.status(500).send({ message: 'Error uploading the file.' })
      }
    })
  } catch (error) {
    res.status(500).send({ message: 'Server error.' })
  }
}
