import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'

export default function Home () {
  const router = useRouter()

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

  const suscribe = (amount) => {
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
        <div className='absolute top-3 left-10 p-2 md:block hidden'>
          <Image
          src='/logo_olimpoclub.png'
          alt='Olimpo Club'
          width={200}
          height={200}
          />
        </div>
        <div className='fixed gap-4 left-0 top-0 flex flex-col w-full lg:w-auto bg-gradient-to-b from-clightpurple-200 p-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-clightpurple-800/30 dark:from-inherit lg:static lg:rounded-xl lg:bg-clightpurple-200 lg:dark:bg-clightpurple-800/30'>
          <h2 className='text-4xl text-tpurple font-bold'>Elige el plan de tu preferencia</h2>
          <div className='bg-cpurple p-6 rounded cursor-pointer' onClick={() => suscribe(100)}>
            <div className='flex flex-col sm:flex-row'>
              <div className='lg:w-2/5 sm:w-full'>
                <div className='flex gap-3'>
                  <span className='text-white font-bold'>PLAN DELUXE</span>
                </div>
                <p className='text-white'>
                  ¡Con Plan Premium tienes beneficios exclusivos! Acceso a las principales sedes de Olimpo Restobar con un descuento del 30% del precio de carta. Puedes hacerlo válido en las sedes: Miraflores, San Isidro y Barranco. No aplica descuento sobre promociones. Además de tener los beneficios del PLAN VIP.
                </p>
              </div>
              <div className='lg:w-3/5 sm:w-full flex justify-end items-center content-center'>
                <h3 className='text-7xl font-bold self-center text-white'><span className='text-xl sm:text-lg md:text-base'>S/</span> 100 <span className='text-xl sm:text-lg md:text-base'>,00</span></h3>
              </div>
            </div>
          </div>
          <div className='bg-cblue p-6 rounded cursor-pointer' onClick={() => suscribe(50)}>
            <div className='flex flex-col sm:flex-row'>
              <div className='lg:w-2/5 sm:w-full'>
                <div className='flex gap-3'>
                  <span className='text-white font-bold'>PLAN VIP</span>
                </div>
                <p className='text-white'>
                  Con el Plan VIP puedes hacer uso de la piscina y todas las instalaciones del Olimpo Club de Puente Piedra y disfrutar de martes a domingo desde las 10:00 am hasta las 4:00 pm
                </p>
              </div>
              <div className='lg:w-3/5 sm:w-full flex justify-end items-center content-center'>
                <h3 className='text-7xl font-bold self-center text-white'><span className='text-xl sm:text-lg md:text-base'>S/</span> 50 <span className='text-xl sm:text-lg md:text-base'>,00</span></h3>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
