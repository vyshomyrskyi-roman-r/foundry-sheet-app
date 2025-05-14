'use client'

import Link from 'next/link'
import { User as UserIcon } from 'lucide-react'

export default function ProfileIcon() {
  return (
    <Link href="/profile" className="absolute top-4 right-4">
      <UserIcon className="w-10 h-10 text-white hover:opacity-80" />
    </Link>
  )
}
