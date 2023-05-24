import { excuteQuery } from "../../../../server/db"

export default async function handler (req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Método no permitido' })
  } 

  const { dni } = req.body

  const response = await excuteQuery({
    query: 'DELETE FROM `usuario` WHERE dni = ?;',
    values: [dni]
  })

  if (response.affectedRows === 0) {
    return res.status(400).json({ error: 'No se pudo registrar el cliente' })
  }

  return res.status(201).json({
    message: 'Cliente ELiminado correctamente'
  })
}