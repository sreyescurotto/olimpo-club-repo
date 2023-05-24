import Link from 'next/link'
import BackofficeLayout from '../../components/layout'

export default function Backoffice () {
  return (
    <>
      <BackofficeLayout>
        <div>
          <p className='font-mono font-bold text-3xl text-black'>Bienvenido</p>
          <p className='font-mono font-bold text-3xl text-black'>Sergio Reyes</p>
          <div className='flex flex-col gap-6 my-6'>
            <div className='bg-transparent hover:bg-gray-100 text-black font-semibold hover:text-gray-800 py-2 px-4 border border-gray-300 hover:border-gray-400 rounded shadow w-full text-center'>
              <Link href='/backoffice/add'>Ingresar nuevo cliente</Link>
            </div>
            <div className='bg-transparent hover:bg-gray-100 text-black font-semibold hover:text-gray-800 py-2 px-4 border border-gray-300 hover:border-gray-400 rounded shadow w-full text-center'>
              <Link href='/backoffice/register'>
                Registrar asistencia del cliente
              </Link>
            </div>
            <div className='hover:bg-gray-100 text-black font-semibold hover:text-gray-800 py-2 px-4 border border-gray-300 hover:border-gray-400 rounded shadow w-full text-center'>
              <Link href='/backoffice/list'>Ver lista de clientes</Link>
            </div>
          </div>
          <div>
            <button className='bg-white  text-gray-700 font-semibold hover:text-gray-800 py-2 px-4 border border-gray-300 hover:border-gray-300 rounded shadow w-full'>
              <Link href='/'>Cerrar Sesión</Link>
            </button>
          </div>
        </div>
      </BackofficeLayout>
    </>
  )
}
