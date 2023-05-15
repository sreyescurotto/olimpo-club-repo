import { useEffect } from 'react'
import useSWR from 'swr'

export default function useAdmin ({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const { data: admin, mutate: mutateUser } = useSWR('/api/admin')

  useEffect(() => {
    if (!redirectTo || !admin) return

    if (
      (redirectTo && !redirectIfFound && !admin?.isLoggedIn) ||
        (redirectIfFound && admin?.isLoggedIn)
    ) {
      console.log('debe redireccionar')
    }
  }, [admin, redirectIfFound, redirectTo])

  return { admin, mutateUser }
}
