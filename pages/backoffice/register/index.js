export default function Register () {
  return (
    <>
      <div>
        <label htmlFor='fruits' className='block text-white-700 font-bold mb-2'>
          Buscar según:
        </label>
        <div className='relative inline-block w-full sm:w-96 text-white-700'>
          <select
            id='fruits'
            name='fruits'
            className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
          >
            <option>DNI</option>
            <option>Nombre</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg className='fill-current h-4 w-4' viewBox='0 0 20 20'>
              <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
              <path
                fill-rule='evenodd'
                d='M15 3a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2h6a2 2 0 002-2V3zm-2 14V5h-4v12h4z'
                clip-rule='evenodd'
              />
            </svg>
          </div>
        </div>
        <div className='flex items-center mt-8 justify-center'>
          <button
            className='bg-white hover:bg-transparent hover:border border hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
          >
            Consultar
          </button>
        </div>
      </div>
    </>
  )
}
