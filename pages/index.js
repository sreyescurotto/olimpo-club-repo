import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home () {
  const router = useRouter()

  const [amount, setAmount] = useState(100)
  const [isChecked, setIsChecked] = useState(true)
  const [isChecked2, setIsChecked2] = useState(false)

  const handleCheckbox = (deposit) => {
    setAmount(Number(deposit))
    if (deposit === 100) {
      setIsChecked(true)
      setIsChecked2(false)
    } else {
      setIsChecked(false)
      setIsChecked2(true)
    }
  }

  const suscribe = () => {
    router.push(`/club/suscribe?amount=${amount}`)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Olimpo Club</title>
        <meta name='description' content='Pura Diversion' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex min-h-screen flex-col items-center justify-center'>
        <div className='fixed gap-4 left-0 top-0 flex flex-col w-full lg:w-auto border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static   lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
          <h2 className='text-4xl'>Selecciona el plan</h2>
          <div className='bg-gray-300 p-4 rounded'>
            <div className='flex flex-col sm:flex-row'>
              <div className='lg:w-2/5 sm:w-full cursor-pointer' onClick={() => handleCheckbox(100)}>
                <div className='flex gap-3'>
                  <input type='checkbox' checked={isChecked === true} onClick={() => handleCheckbox(100)} />
                  <span className='text-black font-bold'>PLAN DELUXE</span>
                </div>
                <p className='text-black'>
                  ¡Con Plan Premium tienes beneficios exclusivos! Acceso a las principales sedes de Olimpo Restobar con un descuento del 30% del precio de carta. Puedes hacerlo válido en las sedes: Miraflores, San Isidro y Barranco. No aplica descuento sobre promociones. Además de tener los beneficios del PLAN VIP.
                </p>
              </div>
              <div className='lg:w-3/5 sm:w-full justify-center items-center content-center'>
                <h3 className='text-7xl font-bold self-center'><span className='text-xl sm:text-lg md:text-base'>S/</span> 100 <span className='text-xl sm:text-lg md:text-base'>,00</span></h3>
              </div>
            </div>
          </div>
          <div className='bg-purple-300 p-4 rounded'>
            <div className='flex flex-col sm:flex-row'>
              <div className='lg:w-2/5 sm:w-full cursor-pointer' onClick={() => handleCheckbox(50)}>
                <div className='flex gap-3'>
                  <input type='checkbox' checked={isChecked2 === true} onClick={() => handleCheckbox(50)} />
                  <span className='text-black font-bold'>PLAN VIP</span>
                </div>
                <p className='text-black'>
                  Con el Plan VIP puedes hacer uso de la piscina y todas las instalaciones del Olimpo Club de Puente Piedra y disfrutar de martes a domingo desde las 10:00 am hasta las 4:00 pm
                </p>
              </div>
              <div className='lg:-3/5 sm:w-full flex justify-center items-center content-center'>
                <h3 className='text-7xl font-bold self-center'><span className='text-xl sm:text-lg md:text-base'>S/</span> 50 <span className='text-xl sm:text-lg md:text-base'>,00</span></h3>
              </div>
            </div>
          </div>
          <button onClick={suscribe} className='bg-white text-black font-bold rounded-md py-2 px-4 hover:bg-gray-200 transition-colors duration-300 max-w-md self-center'>
            Suscribirse
          </button>
        </div>
      </main>
    </div>
  )
}
