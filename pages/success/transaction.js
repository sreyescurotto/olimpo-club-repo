
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { buttons } from '../../components/buttons'

export default function Success () {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  // const authTransaction = () => {
  //   axios.post('/api/payment/authTransaction', {
  //     auth: token,
  //     token: transactionToken,
  //     orderid,
  //     amount
  //   }).then((response) => {
  //     if (response.status === 200) {
  //       setLoading(false)
  //       //   sendDatatoDB(response.data.data)
  //       buttons.fire({
  //         icon: 'success',
  //         title: 'Pago realizado con éxito',
  //         text: 'Tu pago se ha realizado con éxito'
  //       }).then(() => {
  //         alert('Tu pago se ha realizado con éxito')
  //       })
  //     } else {
  //       buttons.fire({
  //         icon: 'error',
  //         title: 'Error al procesar tu pago...',
  //         text: 'Parece que hubo un error con tu medio de pago'
  //       })
  //     }
  //   })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  useEffect(() => {
    if (router.query.transactionToken === undefined && router.query.token === undefined) {
      return
    }
    const { transactionToken, token, orderid, amount } = router.query
    axios.post('/api/payment/authTransaction', {
      auth: token,
      token: transactionToken,
      orderid,
      amount
    }).then((response) => {
      if (response.status === 200) {
        setLoading(false)
        //   sendDatatoDB(response.data.data)
        buttons.fire({
          icon: 'success',
          title: 'Pago realizado con éxito',
          text: 'Tu pago se ha realizado con éxito'
        }).then(() => {
          alert('Tu pago se ha realizado con éxito')
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
        console.log(error)
      })
  }, [router.query])
  return (
    <>
      {/* {loading
        ? (
          <div className='flex justify-center items-center h-screen'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900' />
          </div>
          )
        : (
          <div className='flex justify-center items-center h-screen'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900' />
          </div>
          )} */}
      {loading ? 'Cargando..' : 'Tu pago se realizo con exito'}
      {/*
      <button onClick={authTransaction}>
        De acuerdo..
      </button> */}
    </>
  )
}
