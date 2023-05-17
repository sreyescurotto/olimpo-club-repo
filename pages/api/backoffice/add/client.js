import { excuteQuery } from "../../../../server/db"

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' })
  } 

  const { nombre, apellido, dni, telefono, email, foto } = req.body

  const response = await excuteQuery({
    query: 'INSERT INTO `usuario` (nombre, apellido, dni, telefono, email, foto) VALUES (?, ?, ?, ?, ?, ?);',
    values: [nombre, apellido, dni, telefono, email, foto]
  })

  console.log('qew', response)
  if (response.affectedRows === 0) {
    return res.status(400).json({ error: 'No se pudo registrar el cliente' })
  }

  return res.status(201).json({
    message: 'Cliente agregado correctamente'
  })
}