import multer from 'multer'
import { json } from 'body-parser'
import util from 'util'
import fs from 'fs'
import path from 'path'
import unzipper from 'unzipper'

const upload = multer({
  dest: 'public/temp/' // Destination folder for temporary storage
}).single('kmz') // 'kmz' should match the name attribute of your file input

const uploadMiddleware = util.promisify(upload)

export const config = {
  api: {
    bodyParser: false, // Disable built-in bodyParser
  },
}

export default async function handler(req: any, res: any) {
  try {
    // Parse the request body with a higher limit
    const parseBody = json({ limit: '50mb' })
    await parseBody(req, res, async () => {
      try {
        await uploadMiddleware(req, res)

        const kmzFile = req.file
        const kmzFilePath = kmzFile.path
        // const kmzFilePath = path.join('public/uploads', kmzFile.originalname)
        
        // fs.renameSync(kmzFile.path, kmzFilePath)

        // const downloadLink = `public/uploads/${ kmzFile.originalname }`

        // res.status(200).send({ message: 'File uploaded successfully.', downloadLink })
        // Testing
        // console.log(kmzFilePath, 'kmzFilePath')
        // Unzip the KMZ file
        fs.createReadStream(kmzFilePath)
          .pipe(unzipper.Extract({ path: 'public/uploads/' })) // Extract to 'public/uploads'
          .on('finish', () => {
            // Unzip completed
            // const kmlFileName = `${ path.basename(kmzFile.originalname, '.kmz') }.kml`
            // const kmlFilePath = `public/uploads/${ kmlFileName }`
            res.status(200).send({ message: 'File uploaded and extracted successfully.' })
            // Check if the KML file exists
            // if (fs.existsSync(kmlFilePath)) {
            //   // Read the content of the KML file
            //   const kmlContent = fs.readFileSync(kmlFilePath, 'utf8')
            //   // console.log(kmlContent, 'kmlContent')
            //   const downloadLink = `public/data/${ kmlFileName }`

            //   res.status(200).send({ message: 'File uploaded and extracted successfully.', downloadLink, kmlContent })
            // } else {
            //   res.status(500).send({ error: 'KML file not found after extraction.' })
            // }
          })
      } catch (error) {
        res.status(500).send({ error: 'Error uploading the file.' })
      }
    })
  } catch (error) {
    res.status(500).send({ error: 'Server error.' })
  }
}
