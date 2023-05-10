// import { excuteQuery } from '../../../../server/db'
import formidable from 'formidable'
import fs from 'fs'

export default async function handler (req, res) {
// Utiliza el módulo `formidable` para parsear el formulario
  const form = new formidable.IncomingForm()

  form.uploadDir = './public/uploads'

  form.parse(req, async (fields, files) => {
    res.status(200).json({ message: 'Imagen subida exitosamente' })
    // if (err) {
    //   console.error('Error al parsear el formulario:', err)
    //   res.status(500).json({ error: 'Error al subir la imagen' })
    // }

    try {
      const { imagen } = files

      const newPath = `./public/uploads/${imagen.name}`
      fs.renameSync(imagen.path, newPath)

      res.status(200).json({ message: 'Imagen subida exitosamente' })
    } catch (error) {
      console.error('Error al procesar la imagen:', error)
      res.status(500).json({ error: 'Error al procesar la imagen' })
    }
  })
}

// const { nombre, apellido, dni, telefono, foto } = req.body
// const result = await excuteQuery({
//   query:
//         'INSERT INTO `usuario`(`nombre`, `apellido`, `dni`, `telefono`, `foto`, `suscrito`, `fecha_suscripcion`) VALUES (?, ?, ?, ?, ?, 0, NOW())',
//   values: [nombre, apellido, dni, telefono, foto]
// })
// if (result.error) {
//   res.status(500).json({ response: 'Usuario Agregado' })
// }
// res.status(200).json({ response: 'Usuario Agregado' })

// import multer from 'multer'
// import sharp from 'sharp'

// const upload = multer({
//   dest: './public/uploads/temp'
// })

// const uploadMiddleware = upload.single('file')

// export default async function handler (req, res) {
// Ejecuta el middleware de subida de imagen
//   uploadMiddleware(req, res, async (err) => {
//     if (err) {
//       console.error('Error al subir la imagen:', err)
//       return res.status(500).json({ error: 'Error al subir la imagen' })
//     }

//     try {
//       const { file } = req
//       console.log('file', file)

//       const compressedImagePath = `./public/uploads/${file.filename}`

//       await sharp(file.path)
//         .resize(800) // Establece el tamaño deseado de la imagen comprimida
//         .toFile(compressedImagePath)

//       return res.status(200).json({ message: 'Imagen subida y comprimida exitosamente' })
//     } catch (error) {
//       console.error('Error al procesar la imagen:', error)
//       return res.status(500).json({ error: 'Error al procesar la imagen' })
//     }
//   })
// }

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Set desired value here
    }
  }
}
