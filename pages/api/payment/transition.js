export default async function handler (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const { token, orderid, amount, phone, name, age, dni, email } = req.query
  const { transactionToken } = req.body

  res.redirect(307, `/success/transaction?orderid=${orderid}&transactionToken=${transactionToken}&token=${token}&amount=${amount}&phone=${phone}&name=${name}&age=${age}&dni=${dni}&email=${email}`)
}
