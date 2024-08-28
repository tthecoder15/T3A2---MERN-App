import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'


export const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)
  
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  )
}

export default renderWithRouter;