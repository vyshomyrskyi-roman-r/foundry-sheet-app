import React from 'react'
import Button from '../../components/Button'
import { mount } from 'cypress/react'

describe('Button component', () => {
  it('renders children and fires onClick', () => {
    const onClick = cy.stub().as('onClick')
    mount(<Button onClick={onClick}>Press me</Button>)

    cy.contains("Press me").should("be.visible").click();

    cy.get('@onClick').should('have.been.calledOnce')
  })
})