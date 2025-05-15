import { render, screen } from '@testing-library/react'
import ProtectedRoute from '../ProtectedRoute'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ replace: jest.fn() })
}))
jest.mock('js-cookie')

describe('ProtectedRoute', () => {
  it('редіректить на /login якщо cookie.token відсутня', () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined)
    render(
      <ProtectedRoute>
        <div>Secret</div>
      </ProtectedRoute>
    )
    expect(useRouter().replace).toHaveBeenCalledWith('/login')
  })

  it('показує дітей якщо токен є', () => {
    (Cookies.get as jest.Mock).mockReturnValue('abc')
    render(
      <ProtectedRoute>
        <div>Secret</div>
      </ProtectedRoute>
    )
    expect(screen.getByText('Secret')).toBeInTheDocument()
  })
})
