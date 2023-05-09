import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Script from 'next/script'

export default function Suscribe () {
  const router = useRouter()
  const generateOrderNumber = () => {
    return Math.floor(Math.random() * 1000000000)
  }
  const orderID = generateOrderNumber()
  //   const [cfreq, setCfreq] = useState(0)
  const [merchandid, setMerchandid] = useState()
  const [token, setToken] = useState('')
  const [amount, setAmount] = useState(100)
  const [selectedFile, setSelectedFile] = useState(null)

  function handleFileInputChange (event) {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const randomString = () => {
    let text = ''
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 8; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return text
  }

  function createOrder () {
    const options = {
      method: 'POST',
      url: `https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/${merchandid}`,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: token
      },
      data: {
        antifraud: {
          merchantDefineData: {
            MDD4: `${randomString}@gmail.com"`,
            MDD21: 1,
            MDD32: '74629686',
            MDD75: 'Registrado'
            // MDD77: cfreq
          }
        },
        // recurrenceMaxAmount: `${amount}.0`,
        channel: 'web',
        amount: `${amount}.0`
      }
    }
    axios
      .request(options)
      .then(function (response) {
        openForm(response.data.sessionKey)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const openForm = (sessionKey) => {
    // eslint-disable-next-line no-undef
    VisanetCheckout.configure({
      sessiontoken: sessionKey,
      channel: 'web',
      merchantid: merchandid,
      purchasenumber: orderID,
      amount: `${amount}.0`,
      expirationminutes: '20',
      timeouturl: 'https://apuestadota.com/paymentError',
      merchantname: 'Olimpo Club',
      formbuttoncolor: '#000000',
      // recurrence: 'TRUE',
      // recurrencetype: 'FIXED',
      // recurrencefrequency: 'MONTHLY',
      // recurrencemaxamount: `${amount}.0`,
      // recurrenceamount: `${amount}.0`,
      buttoncolor: 'navy',
      method: 'POST',
      action: `/api/payment/transition?token=${token}&orderid=${orderID}&amount=${amount}`,
      complete: function (params) {
        <h1>LOADING</h1>
      }
    })
    // eslint-disable-next-line no-undef
    VisanetCheckout.open()
  }

  useEffect(() => {
    axios.get('/api/payment/token').then((response) => {
      setToken(response.data.token)
      setMerchandid(response.data.merchantId)
    })

    const { amount } = router.query
    setAmount(amount)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Script
        type='text/javascript'
        // src='https://static-content.vnforapps.com/v2/js/checkout.js'
        src='https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true'
      />
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <div className='fixed gap-4 left-0 top-0 flex flex-col w-full lg:w-auto border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static   lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
          <div>
            <p className='font-mono font-bold text-3xl'>Nuevo Socio</p>
            <form className='max-w-lg mx-auto'>
              <div className='my-4'>
                <input
                  className='bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                  id='nombre'
                  type='text'
                  placeholder='Nombre completo'
                />
              </div>
              <div className='my-4'>
                <input
                  className='bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                  id='dni'
                  type='text'
                  placeholder='DNI'
                />
              </div>
              <div className='my-4'>
                <input
                  className='bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-white-700 font-bold leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                  id='celular'
                  type='text'
                  placeholder='Celular'
                />
              </div>
              <div className='my-4'>
                <input
                  className='bg-transparent placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-white-700 font-bold leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                  id='edad'
                  type='text'
                  placeholder='Edad'
                />
              </div>
              <div className='my-4'>
                <input
                  className='bg-transparent placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-white-700 font-bold leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                  id='email'
                  type='email'
                  placeholder='Correo Electrónico'
                />
              </div>
              <div className='my-4'>
                <input
                  className='bg-transparent placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-white-700 font-bold leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                  id='amount'
                  type='amount'
                  disabled
                  value={`S/. ${amount}.00`}
                />
              </div>
              <div className='my-4'>
                <input
                  className='bg-transparent placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-white-700 font-bold leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
                  id='frecuency'
                  type='frecuency'
                  disabled
                  value='Mensual'
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-white-700 font-bold mb-2'
                  htmlFor='foto'
                >
                  Fotografía
                </label>
                <div className='flex items-center '>
                  <label className='w-64 flex flex-col items-center px-4 py-6 bg-transparent text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white '>
                    <svg
                      className='w-8 h-8'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 14a4 4 0 100-8 4 4 0 000 8zm0 2a6 6 0 100-12 6 6 0 000 12zm5.94-8.06a2 2 0 11-2.83 2.83 2 2 0 012.83-2.83zM10 18a8 8 0 110-16 8 8 0 010 16z'
                        clip-rule='evenodd'
                      />
                    </svg>
                    <span id='file-name' className='mt-2 text-base leading-normal'>
                      {selectedFile ? selectedFile.name : 'Seleccionar archivo'}
                    </span>
                    <input
                      type='file'
                      id='foto'
                      className='hidden'
                      onChange={handleFileInputChange}
                    />
                  </label>
                </div>
              </div>
            </form>
          </div>
          <button onClick={createOrder} className='bg-white text-black font-bold rounded-md py-2 px-4 hover:bg-gray-200 transition-colors duration-300 max-w-md self-center'>
            Pagar
          </button>
        </div>
      </main>
    </>
  )
}
