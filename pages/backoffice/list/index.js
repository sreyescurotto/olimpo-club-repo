import Image from 'next/image'

export default function listClient () {
  return (
    <>
      <div>
        <p className='font-mono font-bold text-3xl'>Lista de Clientes</p>
      </div>
      <div className='overflow-x-auto bg-transparent'>
        <table className='table-auto mx-auto border border-white'>
          <thead>
            <tr>
              <th className='px-4 py-2 border text-white-600'>ID</th>
              <th className='px-4 py-2 border text-white-600'>DNI</th>
              <th className='px-4 py-2 border text-white-600'>
                Nombres Completos
              </th>
              <th className='p-2 border text-white-600'>Fecha de Ingreso</th>
              <th className='p-2 border text-white-600'>Suscripción</th>
              <th className='p-2 border text-white-600'>Celular</th>
              <th className='p-2 border text-white-600'>Foto</th>
              <th className='p-2 border text-white-600'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='border p-2'>12</td>
              <td className='border p-2'>72629686</td>
              <td className='border p-2'>Sergio Antonio Reyes Curotto</td>
              <td className='border p-2'>19-04-2023</td>
              <td className='border p-2'>
                <span className='inline-block px-2 py-1 text-s font-bold leading-none text-white bg-green-500 rounded-full'>
                  Activa hasta 19-05-2023
                </span>
              </td>
              <td className='border p-2'>935301021</td>
              <td className='border p-2'>
                <Image
                  src='/duck.jpg'
                  alt='Picture of the author'
                  width={50}
                  height={50}
                />
              </td>
              <td className='border p-2'>
                <svg
                  className='heroicon-s-pencil h-12 w-12 text-white-500'
                  viewBox='0 0 20 20'
                  fill='none'
                  stroke='currentColor'
                >
                  <path
                    d='M12.2929 3.29289C12.6834 2.90237 13.3166 2.90237 13.7071 3.29289L16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711L7.41421 17H4V13.5858L12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289V5.29289Z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </td>
            </tr>
            <tr>
              <td className='border p-2'>13</td>
              <td className='border p-2'>47527441</td>
              <td className='border p-2'>Axel Emmanuel Gallardo Espinola</td>
              <td className='border p-2'>19-01-2023</td>
              <td className='border p-2'>
                <span className='inline-block px-2 py-1 text-s font-bold leading-none text-white bg-red-500 rounded-full'>
                  Inactiva
                </span>
              </td>
              <td className='border p-2'>943257008</td>
              <td className='border p-2'>
                <Image
                  src='/duck.jpg'
                  alt='Picture of the author'
                  width={50}
                  height={50}
                />
              </td>
              <td className='border p-2'>
                <svg
                  className='heroicon-s-pencil h-12 w-12 text-white-500'
                  viewBox='0 0 20 20'
                  fill='none'
                  stroke='currentColor'
                >
                  <path
                    d='M12.2929 3.29289C12.6834 2.90237 13.3166 2.90237 13.7071 3.29289L16.7071 6.29289C17.0976 6.68342 17.0976 7.31658 16.7071 7.70711L7.41421 17H4V13.5858L12.2929 5.29289C12.6834 4.90237 13.3166 4.90237 13.7071 5.29289V5.29289Z'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}
