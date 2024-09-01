import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import user from '@testing-library/user-event'
import renderWithRouter from './config/RenderWithRouter'
import NavBar from '../components/NavBar'
import { screen } from '@testing-library/react'
import sessionState from '../routes/store'

describe('Nav Component', () => {
    it('Nav logo sends you to /home on click', async () => {
        renderWithRouter(<NavBar />, { route: '/' })
        // Get a reference to the logo
        const nav-logo = screen.getByAltText('Navbar Logo') 
        // Simulate user clicking the logo in the nav bar
        await user.click(nav-logo)
        // Verify the URL changed to /home
        expect(window.location.pathname).toBe('/')
    })
    it('navigate to our home route when link is clicked', async () => {
        renderWithRouter(<NavBar />, { route: '/' })

        const ourTeamLink = screen.getByText(/Home/i)
        await user.click(ourTeamLink)
        expect(window.location.pathname).toBe('/')
    })

    it('navigate to our team route when link is clicked', async () => {
        renderWithRouter(<NavBar />, { route: '/ourteam' })

        const ourTeamLink = screen.getByText(/Our Team/i)
        await user.click(ourTeamLink)
        expect(window.location.pathname).toBe('/ourteam')
    })

    it('navigate to contact route when link is clicked', async () => {
        renderWithRouter(<NavBar />, { route: '/contact' })

        const ourTeamLink = screen.getByText(/Contact Us/i)
        await user.click(ourTeamLink)
        expect(window.location.pathname).toBe('/contact')
    })

    it('navigate to booking route when link is clicked', async () => {
        renderWithRouter(<NavBar />, { route: '/booking' })

        const ourTeamLink = screen.getByText(/Book Now/i)
        await user.click(ourTeamLink)
        expect(window.location.pathname).toBe('/booking')
    })
})

describe('NavBar Conditional Rendering', () => {
    it('shows "Login/Register" when not authenticated', () => {
        // Mock the session state to be not authenticated
        sessionState.setState({ isAuthenticated: false })

        renderWithRouter(<NavBar />, { route: '/' })

        // Check that "login/Register" is displayed
        expect(screen.getByText(/Login\/Register/i)).toBeInTheDocument()

        // Ensure "My Account" and "Logout" are not rendered
        expect(screen.queryByText(/My Account/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()
    })

    it('shows "My Account" and "Logout" button when authenticated', () => {
        // Mock the session state to be authenticated
        sessionState.setState({ isAuthenticated: true })
    
        renderWithRouter(<NavBar />, { route: '/' })
    
        // Check that "My Account" is displayed
        expect(screen.getByText(/My Account/i)).toBeInTheDocument()
        
        // Check that the "Logout" button is displayed
        expect(screen.getByText(/Logout/i)).toBeInTheDocument()
    
        // Ensure "Login/Register" is not rendered
        expect(screen.queryByText(/Login\/Register/i)).not.toBeInTheDocument()
    })

    it('calls logout function when "Logout" button is clicked', async () => {
        // Mock logout function to check if it is called
        const mockLogout = vi.fn(() => {
            sessionState.setState({
                token: null,
                isAuthenticated: false,
                error: null,
                userData: null,
                publicApptData: null
            })
        })

        sessionState.setState({ isAuthenticated: true, logout: mockLogout })
    
        renderWithRouter(<NavBar />, { route: '/' })
    
        // Click the "Logout" button
        const logoutButton = screen.getByText(/Logout/i)
        await user.click(logoutButton)
    
        // Ensure the logout function is called
        expect(mockLogout).toHaveBeenCalled()
    
        // After logging out, check that "Login/Register" is displayed
        expect(screen.getByText(/Login\/Register/i)).toBeInTheDocument()
        expect(screen.queryByText(/My Account/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument()
    })
})
