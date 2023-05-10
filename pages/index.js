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
            <div className='flex'>
              <div className='w-2/5 cursor-pointer' onClick={() => handleCheckbox(100)}>
                <div className='flex gap-3'>
                  <input type='checkbox' checked={isChecked === true} onClick={() => handleCheckbox(100)} />
                  <span className='text-black font-bold'>PLAN DELUXE</span>
                </div>
                <p className='text-black '>
                  ¡Con Plan Black tienes beneficios exclusivos! Acceso a todas
                  las sedes de Smart Fit en Perú y Latinoamérica, entrena con 5
                  invitados al mes y relájate en nuestros sillones de masajes.
                </p>
              </div>
              <div className='w-3/5 flex justify-center items-center content-center'>
                <h3 className='text-7xl font-bold self-center'><span className='text-xl'>S/</span> 100 <span className='text-xl'>,00</span></h3>
              </div>
            </div>
          </div>
          <div className='bg-purple-300 p-4 rounded'>
            <div className='flex'>
              <div className='w-2/5 cursor-pointer' onClick={() => handleCheckbox(50)}>
                <div className='flex gap-3'>
                  <input type='checkbox' checked={isChecked2 === true} onClick={() => handleCheckbox(50)} />
                  <span className='text-black font-bold'>PLAN VIP</span>
                </div>
                <p className='text-black'>
                  Con el Plan Smart puedes hacer uso de todas las instalaciones solo del gimnasio escogido y entrenar sin restricción de horario.
                </p>
              </div>
              <div className='w-3/5 flex justify-center items-center content-center'>
                <h3 className='text-7xl font-bold self-center'><span className='text-xl'>S/</span> 50 <span className='text-xl'>,00</span></h3>
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
