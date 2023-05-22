import axios from 'axios'

export default async function handler (req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // const merchantId = process.env.NIUBIZ_MERCHANT_TEST_ID
  const merchantId = process.env.NIUBIZ_MERCHANT_TEST_ID
  const options = {
    method: 'GET',
    url: process.env.NIUBIZ_CREATE_TOKEN_TEST,
    headers: {
      accept: 'text/plain',
      authorization: `Basic ${process.env.NIUBIZ_AUTH_TEST_TOKEN}`
    }
  }
  try {
    const response = await axios.request(options)
    res.json({
      token: response.data,
      merchantId
    })
  } catch (error) {
    console.log(error)
  }
}
