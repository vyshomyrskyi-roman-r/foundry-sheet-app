'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface Props {
  children: ReactNode
}

/**
 * Wrap any page whose entry you want to lock behind authentication.
 * It reads the "token" cookie and, if absent, bounces you to /login.
 */
export default function ProtectedRoute({ children }: Props) {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.replace('/login')
    }
  }, [router])

  // While the effect runs on first render you might briefly see children,
  // but in practice this is almost instantaneous.
  return <>{children}</>
}
