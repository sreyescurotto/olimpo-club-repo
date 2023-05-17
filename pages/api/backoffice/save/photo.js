import formidable from "formidable";
import fs from "fs";
import sharp from "sharp";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler (req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const image_path = await saveFile(files.file);
    return res.status(201).send({
      path: image_path
    });
  });
};

const saveFile = async (file) => {
    console.log('file', file)
  const data = fs.readFileSync(file._writeStream.path);
  const file_extension = file.originalFilename.split('.')[1];
  const compressedData = await sharp(data).resize(800).toBuffer(); // Comprimir la imagen a un ancho máximo de 800 píxeles (ajusta según tus necesidades)
  const image_path = `${file.newFilename}.${file_extension}`
  fs.writeFileSync(`./public/uploads/temp/${image_path}`, compressedData);
  const path = file._writeStream.path;
  fs.unlinkSync(path);
  return image_path;
};
