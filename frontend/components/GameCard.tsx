'use client'

import type { ReactNode } from 'react'

interface Props {
  title: string
  image?: string
  action?: ReactNode
}

export default function GameCard({ title, image, action }: Props) {
  return (
    <div className="w-72 h-48 bg-[rgba(180,159,132,0.9)] rounded-2xl overflow-hidden flex flex-col">
      <div className="flex-1 bg-white flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="object-cover h-full w-full" />
        ) : (
          <span className="text-sm text-gray-600">Img placeholder</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-center text-white text-lg font-semibold">{title}</h3>
        {action && <div className="mt-2">{action}</div>}
      </div>
    </div>
  )
}
