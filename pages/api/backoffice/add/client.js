import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler (req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    return res.status(201).send("");
  });
};

const saveFile = async (file) => {
  console.log('file', file)
  const data = fs.readFileSync(file. _writeStream.path);
  fs.writeFileSync(`./public/uploads/temp/${file.newFilename}`, data);
  fs.unlinkSync(file. _writeStream.path);
  return;
};
