import { excuteQuery } from "../../../../server/db";
export default async function handler (req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    } 
    try {
        const response = await excuteQuery({
            query: 'SELECT asistencia.id, asistencia.date, asistencia.sede, usuario.nombre, usuario.apellido, usuario.dni FROM asistencia INNER JOIN usuario ON asistencia.usuario_id = usuario.id;',
            values: []
        })
        res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ error: e.message })
    }

}