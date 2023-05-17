import { excuteQuery } from "../../../../server/db"

export default async function handler (req, res) {
    if (req.method === 'GET') {
        const { dni } = req.query
        // Process a POST request
        try {
            const response = await excuteQuery({
                query: 'SELECT * FROM `usuario` WHERE dni = ?;',
                values: [dni]
            })
            res.status(200).json(response[0])
        } catch (e) {
            console.log(e)
            res.status(500).json({ error: e.message })
        }
    } else {
        // Handle any other HTTP method
        req.res.status(405).end()
    }
}