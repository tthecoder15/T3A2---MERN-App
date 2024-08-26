import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import user from '@testing-library/user-event'
import renderWithRouter from './config/SetupTests'
import NavBar from '../components/NavBar'
import { screen } from '@testing-library/react'
import sessionState from '../routes/store'

describe('Nav Component', () => {
    it('Nav logo sends you to /home on click', async () => {
        renderWithRouter(<NavBar />, { route: '/' })
        // Get a reference to the logo
        const navLogo = screen.getByAltText('Navbar Logo') 
        // Simulate user clicking the logo in the nav bar
        await user.click(navLogo)
        // Verify the URL changed to /home
        expect(window.location.pathname).toBe('/')
    })

    it('navigate to the correct route when links are clicked', async () => {
        renderWithRouter(<NavBar />, { route: '/ourteam' })

        const ourTeamLink = screen.getByText(/Our Team/i)
        await user.click(ourTeamLink)
        expect(window.location.pathname).toBe('/ourteam')
    })
})