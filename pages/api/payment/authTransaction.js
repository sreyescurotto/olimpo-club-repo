import axios from 'axios'

export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { auth, token, orderid, amount } = req.body
  const merchantId = process.env.NIUBIZ_MERCHANT_TEST_ID

  console.log({
    auth, token, orderid, merchantId
  })

  const options = {
    method: 'POST',
    url: `https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/${merchantId}`,
    // url: `https://apiprod.vnforapps.com/api.authorization/v3/authorization/ecommerce/${merchandid}`,
    headers: {
      'Content-Type': 'application/json',
      // eslint-disable-next-line quote-props
      'Authorization': auth
    },
    data: {
      channel: 'web',
      captureType: 'manual',
      countable: true,
      order: {
        tokenId: token,
        purchaseNumber: orderid,
        productId: '329',
        amount: `${amount}.00`,
        currency: 'PEN',
        cardHolder: {
          documentType: '0',
          documentNumer: '74629686'
        }
        // recurrence: {
        //   maxAmount: `${amount}.00`,
        //   beneficiaryId: '74629686',
        //   frequency: 'MONTHLY',
        //   type: 'FIXED'
        // }
      }
    }
  }
  try {
    const response = await axios.request(options)
    const { data, status } = response
    res.status(200).json({ data }, { status })
  } catch (error) {
    console.log(error.response)
    res.status(400).json({ error })
  }
}
