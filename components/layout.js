import Link from "next/link";
import Image from "next/image";

export default function BackofficeLayout({ children }) {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="absolute top-3 left-10 p-2 md:block hidden">
          <Image
            src="/logo_olimpoclub.png"
            alt="Olimpo Club"
            width={200}
            height={200}
          />
        </div>
        <div className="gap-4 left-0 top-0 flex flex-col w-full border-b border-gray-300 bg-clightpurple p-16 backdrop-blur-2xl dark:border-neutral-800 dark:bg-clightpurple-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-clightpurple lg:dark:bg-clightpurple">
          <nav className="bg-transparent border-b border-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="hidden sm:block">
                  <div className="flex space-x-4">
                    <Link href="/backoffice">
                      <div className="text-black hover:text-gray-300 cursor-pointer">
                        Inicio
                      </div>
                    </Link>
                    <Link href="/backoffice/add">
                      <div className="text-black hover:text-gray-300 cursor-pointer">
                        Agregar
                      </div>
                    </Link>
                    <Link href="/backoffice/register">
                      <div className="text-black hover:text-gray-300 cursor-pointer">
                        Registrar
                      </div>
                    </Link>
                    <Link href="/backoffice/list">
                      <div className="text-black hover:text-gray-300 cursor-pointer">
                        Usuarios
                      </div>
                    </Link>
                    <Link href="/backoffice/attendance">
                      <div className="text-black hover:text-gray-300 cursor-pointer">
                        Asistencias
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex sm:hidden">
              <button
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                aria-label="Toggle menu"
              >
                <svg viewBox="0 0 20 20" fill="black" className="menu w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 15a1 1 0 100 2h12a1 1 0 100-2H4z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  viewBox="0 0 20 20"
                  fill="black"
                  className="close w-6 h-6 hidden"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.35 5.65a1 1 0 00-1.414 0L10 8.586 6.065 4.65a1 1 0 00-1.414 1.414L8.586 10l-3.935 3.935a1 1 0 101.414 1.414L10 11.414l3.935 3.935a1 1 0 001.414-1.414L11.414 10l3.935-3.935a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </nav>
          <div className="sm:hidden hidden bg-gray-900 absolute top-0 left-0 w-full h-full flex align-center justify-center">
            <div className="absolute right-0 top-0 m-6">
              <button
                type="button"
                className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
                aria-label="Toggle menu"
              >
                <svg
                  viewBox="0 0 20 20"
                  fill="white"
                  className="menu w-6 h-6 hidden"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM4 15a1 1 0 100 2h12a1 1 0 100-2H4z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg viewBox="0 0 20 20" fill="white" className="close w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M14.35 5.65a1 1 0 00-1.414 0L10 8.586 6.065 4.65a1 1 0 00-1.414 1.414L8.586 10l-3.935 3.935a1 1 0 101.414 1.414L10 11.414l3.935 3.935a1 1 0 001.414-1.414L11.414 10l3.935-3.935a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="px-2 pt-2 pb-3 flex flex-col gap-6 align-center justify-center">
              <Link
                href="/backoffice"
                className="block text-black hover:text-gray-300"
              >
                Inicio
              </Link>
              <Link
                href="/backoffice/add"
                className="block text-black hover:text-gray-300"
              >
                Agregar
              </Link>
              <Link
                href="/backoffice/register"
                className="block text-black hover:text-gray-300"
              >
                Registar
              </Link>
              <Link
                href="/backoffice/list"
                className="block text-black hover:text-gray-300"
              >
                Usuarios
              </Link>
              <Link
                href="/backoffice/attendance"
                className="block text-black hover:text-gray-300"
              >
                Asistencias
              </Link>
            </div>
          </div>
          {children}
        </div>
      </main>
    </>
  );
}
