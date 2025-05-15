import React from 'react'
import ProfileIcon from '../../components/ProfileIcon'
import { mount } from 'cypress/react'
import { MemoryRouter } from 'react-router-dom' // or use next/router mock

describe('ProfileIcon', () => {
  it('renders and links to /profile', () => {
    mount(
      <MemoryRouter>
        <ProfileIcon />
      </MemoryRouter>
    )
    cy.get('[data-testid=profile-icon]')
      .should('have.attr', 'href', '/profile')
  })
})
