import Link from 'next/link'

export default function BackofficeLayout ({ children }) {
  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-center'>
        <div className='fixed gap-4 left-0 top-0 flex flex-col w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-16 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
          <nav className='bg-transparent border-b border-white'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex items-center justify-between h-16'>
                <div className='flex-shrink-0'>
                  {/* <a href="#" className="font-bold text-white">
                Logo
              </a> */}
                </div>
                <div className='hidden sm:block'>
                  <div className='flex space-x-4'>
                    <Link href='/backoffice' className='text-white hover:text-gray-300'>
                      Inicio
                    </Link>
                    <Link href='/backoffice/add' className='text-white hover:text-gray-300'>
                      Agregar
                    </Link>
                    <Link href='/backoffice/list' className='text-white hover:text-gray-300'>
                      Registrar
                    </Link>
                    <Link href='/backoffice/register' className='text-white hover:text-gray-300'>
                      Listar
                    </Link>
                  </div>
                </div>
                <div className='flex sm:hidden'>
                  <button
                    type='button'
                    className='text-white hover:text-gray-300 focus:outline-none focus:text-gray-300'
                    aria-label='Toggle menu'
                  >
                    <svg
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='menu w-6 h-6'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 15a1 1 0 100 2h12a1 1 0 100-2H4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <svg
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='close w-6 h-6 hidden'
                    >
                      <path
                        fillRule='evenodd'
                        d='M14.35 5.65a1 1 0 00-1.414 0L10 8.586 6.065 4.65a1 1 0 00-1.414 1.414L8.586 10l-3.935 3.935a1 1 0 101.414 1.414L10 11.414l3.935 3.935a1 1 0 001.414-1.414L11.414 10l3.935-3.935a1 1 0 000-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className='sm:hidden hidden bg-gray-900'>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                <Link href='/backoffice' className='block text-white hover:text-gray-300'>
                  Inicio
                </Link>
                <Link href='/backoffice/add' className='block text-white hover:text-gray-300'>
                  Agregar
                </Link>
                <Link href='/backoffice/register' className='block text-white hover:text-gray-300'>
                  Registar
                </Link>
                <Link href='/backoffice/list' className='block text-white hover:text-gray-300'>
                  Listar
                </Link>
              </div>
            </div>
          </nav>
          {children}
        </div>
      </main>
    </>
  )
}
