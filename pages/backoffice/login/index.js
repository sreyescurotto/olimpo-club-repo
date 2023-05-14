import { LoginHandler } from '../../../components/login_handler'

export default function Login () {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='fixed gap-4 left-0 top-0 flex flex-col w-full border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-16 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
        <div>
          <p className='font-mono font-bold text-3xl'>Backoffice</p>
          <p className='font-mono font-bold text-3xl'>Olimpo Club</p>
          <LoginHandler />
        </div>
      </div>
    </main>
  )
}
