import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  const { auth, token, orderid, amount, dni } = req.body;
  const merchantId = process.env.NIUBIZ_MERCHANT_TEST_ID;

  const options = {
    method: "POST",
    url: `https://apisandbox.vnforappstest.com/api.authorization/v3/authorization/ecommerce/${merchantId}`,
    headers: {
      "Content-Type": "application/json",
      // eslint-disable-next-line quote-props
      Authorization: auth,
    },
    data: {
      channel: "web",
      captureType: "manual",
      countable: true,
      order: {
        tokenId: token,
        purchaseNumber: orderid,
        productId: "001",
        amount: `${amount}.00`,
        currency: "PEN",
      },
      cardHolder: {
        documentType: "0",
        documentNumber: dni, 
      },
      recurrence: {
        maxAmount: 100.0,
        amount: `${amount}.00`,
        beneficiaryId: dni,
        frequency: "MONTHLY",
        type: "FIXED",
      },
    },
  };

  try {
    const response = await axios.request(options);
    const { data, status } = response;
    res.status(200).json({ data }, { status });
  } catch (error) {
    console.log("errror GADSDQWDW", error.response);
    const data = error.response.data;
    res.status(400).json({ data });
  }
}
