import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Set desired value here
    }
  }
}

const saveFile = (file) => {
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(`./public/uploads/temp/${file.name}`, data);
  fs.unlinkSync(file.filepath);
  return;
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  // form.parse(req, function (err, fields, files) {
  //   saveFile(files.file);
  //   return res.status(201).send('gpa');
  // });
  console.log('form', form)
  form.parse(req, (err, fields, files) => {
    
    if (err) {
      console.error('Error al parsear el formulario:', err);
      return res.status(500).json({ error: 'Error al procesar el formulario' });
    }

    form.on('field', (fieldName, fieldValue) => {
      // Obtén los datos de los campos del formulario
      console.log(fieldName, fieldValue);
      // Realiza las operaciones necesarias con los datos obtenidos
      // ...
    });

    form.on('file', (fieldName, file) => {cd 
      // Procesa el archivo adjunto
      saveFile(file);
    });

    form.on('end', () => {
      return res.status(201).send('gpa');
    });
  });
}
