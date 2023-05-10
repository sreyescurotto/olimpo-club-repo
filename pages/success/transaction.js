
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { buttons } from '../../components/buttons'

export default function Success () {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({})
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)

  useEffect(() => {
    if (router.query.transactionToken === undefined && router.query.token === undefined) {
      return
    }
    const { transactionToken, token, orderid, amount, dni } = router.query
    axios.post('/api/payment/authTransaction', {
      auth: token,
      token: transactionToken,
      orderid,
      amount,
      dni
    }).then((response) => {
      setData(response.data.data)
      if (response.status === 200) {
        setLoading(false)
        buttons.fire({
          icon: 'success',
          title: 'Pago realizado con éxito',
          text: 'Tu pago se ha realizado con éxito'
        })
      } else {
        buttons.fire({
          icon: 'error',
          title: 'Error al procesar tu pago...',
          text: 'Parece que hubo un error con tu medio de pago'
        })
      }
    })
      .catch((error) => {
        setIsError(true)
        setLoading(false)
        const { response } = error
        setError(response.data.data)
        console.log('GAAAAAAAAAAAAAAAAAAAA', response)
      })
  }, [router.query])
  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <div className='fixed gap-4 left-0 top-0 flex flex-col w-full lg:w-auto border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static   lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
          {loading && (
            <div className='flex justify-center items-center h-screen'>
              <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900' />
            </div>)}
          {!loading && !isError && (
            <div className='flex flex-col justify-center items-center'>
              <h2 className='text-4xl'>¡Gracias por tu compra!</h2>

              <article className='my-6'>
                <h3 className='text-4xl'>Detalles de la compra</h3>
                <p className='text-2xl'>Número de orden: {router.query.orderid}</p>
                <p className='text-2xl'>{data.dataMap.ACTION_DESCRIPTION}</p>
                <p className='text-2xl'>Tarjeta: {data.dataMap.CARD}</p>
                <p className='text-2xl'>Marca: {(data.dataMap.BRAND).toUpperCase()}</p>
                <p className='text-2xl'>Monto: S/. {data.dataMap.AMOUNT}</p>
                <p className='text-2xl'>{(new Date(data.header.ecoreTransactionDate)).toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}</p>
                <div className='border-t border-gray-300 my-6' />
                <p className='text-2xl'>Nombre: {router.query.name}</p>
                <p className='text-2xl'>DNI: {router.query.dni}</p>
                <p className='text-2xl'>Email: {router.query.email}</p>
                <p className='text-2xl'>Teléfono: {router.query.phone}</p>

              </article>
            </div>
          )}

          {error && isError && (
            <div className='flex flex-col justify-center items-center'>
              <h2 className='text-4xl'>¡Hubo un error con tu compra!</h2>
              <article className='my-6'>
                <div className='border-t border-gray-300 my-6' />
                <h3 className='text-4xl'>Detalles del error</h3>
                <p className='text-2xl'>{error.data.ACTION_DESCRIPTION}</p>
                <p className='text-2xl'>{(new Date(error.header.ecoreTransactionDate)).toLocaleString('es-ES', { dateStyle: 'full', timeStyle: 'short' })}</p>
              </article>
            </div>
          )}
        </div>
      </main>

    </>
  )
}
