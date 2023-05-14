import { useState } from 'react'

export default function AddClient () {
  const [selectedFile, setSelectedFile] = useState(null)

  function handleFileInputChange (event) {
    const file = event.target.files[0]
    setSelectedFile(file)
  }
  return (
    <>
      <div>
        <p className='font-mono font-bold text-3xl'>Ingresar Nuevo Cliente</p>
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
              className='bg-transparent appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
              id='celular'
              type='text'
              placeholder='Celular'
            />
          </div>
          <div className='my-4'>
            <input
              className='bg-transparent placeholder-white-500 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500'
              id='edad'
              type='text'
              placeholder='Edad'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-white-700 font-bold mb-2'
              htmlFor='fecha'
            >
              Fecha de inicio
            </label>
            <div className='flex'>
              <div className='mr-2'>
                <input
                  className='placeholder-red-500 appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline form-date bg-transparent'
                  id='fecha'
                  type='date'
                  placeholder='YYYY-MM-DD'
                />
              </div>
            </div>
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
                    fill-rule='evenodd'
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

          <div className='flex items-center mt-8 justify-center'>
            <button
              className='bg-white hover:bg-transparent hover:border border hover:text-white text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='button'
            >
              Agregar cliente
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
