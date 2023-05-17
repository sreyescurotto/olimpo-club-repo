import { excuteQuery } from "../../../../server/db"

export default async function handler (req, res) {
    if (req.method !== 'GET') {
        return res.status(405).end()
    } 
    try {
        const response = await excuteQuery({
            query: 'SELECT * FROM `usuario`;',
            values: []
        })
        res.status(200).json(response)
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ error: e.message })
    }
}