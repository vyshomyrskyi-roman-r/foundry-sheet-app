import { render, screen } from '@testing-library/react'
import ProfileIcon from '../ProfileIcon'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider'

describe('ProfileIcon', () => {
  it('має посилання на /profile', () => {
    render(
      <MemoryRouterProvider>
        <ProfileIcon />
      </MemoryRouterProvider>
    )
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/profile')
  })
})
