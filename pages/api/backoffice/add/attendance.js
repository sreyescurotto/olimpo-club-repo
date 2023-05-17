import { excuteQuery } from "../../../../server/db"

export default async function handler (req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end()
    } else {
        const { id } = req.body
        // Process a POST request
        try {
            // const res = await excuteQuery({
            //     query: 'SELECT * FROM `asistencia` WHERE usuario_id = ?;',
            //     values: [id]
            // })
            // if (res.length > 0) {
            //     return res.status(400).json({ error: 'El usuario ya tiene una asistencia registrada' })
            // }
            const response = await excuteQuery({
                query: 'INSERT INTO `asistencia` (usuario_id) VALUES (?);',
                values: [id]
            })
            if (
                response.affectedRows === 0
            ) {
                return res.status(400).json({ error: 'No se pudo registrar la asistencia' })
            }
            return res.status(201).json(response)
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        }
    }
}