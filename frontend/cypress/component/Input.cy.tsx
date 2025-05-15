import React from 'react'
import Input from '../../components/Input'
import { mount } from 'cypress/react'

describe('Input component', () => {
  it('renders placeholder and calls onChange when typing', () => {
    const onChange = cy.stub().as('onChange')
    mount(
      <Input
        name="test-input"
        placeholder="Type here"
        value=""
        onChange={onChange}
      />
    )

    cy.get('input')
      .should('have.attr', 'placeholder', 'Type here')
      .type('abc')
      .then(() => {
        cy.wrap(onChange).should('have.been.called')
      })
  })
})