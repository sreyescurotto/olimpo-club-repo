'use client'

import React, { useState } from 'react'
import useAdmin from '../hooks/useUser'
import { userServiceFactory } from '../services/user.service'

const userService = userServiceFactory()

export function LoginHandler () {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const { admin, mutateUser } = useAdmin({
    redirectTo: '/',
    redirectIfFound: true
  })

  const handleUserName = (e) => {
    setUser(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async () => {
    try {
      mutateUser(
        await userService.login(user, password)
      )
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <>
      {!admin && (<h1>Loading ...</h1>)}
      <div className='flex flex-col'>
        <label htmlFor='usuario' className='text-lg text-gray-400'>
          Username
        </label>
        <input
          onChange={handleUserName}
          className='bg-transparent border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 text-white-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          type='text'
          name='usuario'
          id='usuario'
        />
      </div>
      <div className='flex flex-col'>
        <label htmlFor='password' className='text-lg text-gray-400'>
          Password
        </label>
        <input
          onChange={handlePassword}
          className='bg-transparent border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 text-white-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          type='password'
          name='password'
          id='password'
        />
      </div>
      <div className='mt-8'>
        <button
          onClick={handleLogin}
          className='bg-transparent hover:bg-gray-100 text-white-700 font-semibold hover:text-gray-800 py-2 px-4 border border-gray-300 hover:border-gray-400 rounded shadow'
        >
          Iniciar sesión
        </button>
      </div>
    </>
  )
}
