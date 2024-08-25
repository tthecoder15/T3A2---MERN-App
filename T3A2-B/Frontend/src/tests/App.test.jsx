import '@testing-library/jest-dom'
import { describe, expect, it } from "vitest";
import { BrowserRouter } from 'react-router-dom'
import App from '../App.jsx'
import user from '@testing-library/user-event'
import { render } from "@testing-library/react";

describe('App Component', () => {
    it('render app component', () => {
        const { container } = render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        )

        const h1 =  container.querySelector('h1')

        expect(h1).toBeInTheDocument()
        expect(h1).toHaveTextContent('Pawfect Care')
    })

    it('Nav logo sends you to /home on click', async () => {
        const { container } = render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        )
        // Get a reference to logo
        const navLogo = container.querySelector('#navLogo')
        // Simulate user clicking the logo in the nav bar
        await user.click(navLogo)
        
        // Check if the user is redirected to /home by searching for the H1 "Pawfect Care"
        const h1 =  container.querySelector('h1')

        expect(h1).toBeInTheDocument()
        expect(h1).toHaveTextContent('Pawfect Care')
    })
})