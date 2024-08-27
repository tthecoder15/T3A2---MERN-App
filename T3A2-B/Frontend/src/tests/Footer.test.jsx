import '@testing-library/jest-dom'
import { describe, expect, it } from 'vitest'
import { screen } from '@testing-library/react'
import Footer from '../components/Footer'
import renderWithRouter from './config/RenderWithRouter'

describe('Footer Component', () => {

  it('renders the contact information', () => {
    renderWithRouter(<Footer />)

    expect(screen.getByText(/Address: 1 First St Melbourne/i)).toBeInTheDocument()
    expect(screen.getByText(/Email: Pawfect@care.com/i)).toBeInTheDocument()
    expect(screen.getByText(/Phone: 0412 345 678/i)).toBeInTheDocument()
    expect(screen.getByText(/After Hours Emergency:/i)).toBeInTheDocument()
    expect(screen.getByText(/0423 456 789/i)).toBeInTheDocument()
  })

  it('renders the website links as links', () => {
    renderWithRouter(<Footer />);

    // Check that each link is present and is indeed a link
    const homeLink = screen.getByRole('link', { name: /Home/i });
    const ourTeamLink = screen.getByRole('link', { name: /Our Team/i });
    const bookNowLink = screen.getByRole('link', { name: /Book Now/i });
    const contactUsLink = screen.getByRole('link', { name: /Contact Us/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/'); // Verify the href

    expect(ourTeamLink).toBeInTheDocument();
    expect(ourTeamLink).toHaveAttribute('href', '/ourteam'); // Verify the href

    expect(bookNowLink).toBeInTheDocument();
    expect(bookNowLink).toHaveAttribute('href', '/booking'); // Verify the href

    expect(contactUsLink).toBeInTheDocument();
    expect(contactUsLink).toHaveAttribute('href', '/contact'); // Verify the href
  });

  it('renders the opening hours', () => {
    renderWithRouter(<Footer />)

    expect(screen.getByText(/Weekdays: 9am - 5pm/i)).toBeInTheDocument()
    expect(screen.getByText(/Weekends: Closed/i)).toBeInTheDocument()
  })

  it('renders the logo image with correct alt text', () => {
    renderWithRouter(<Footer />)

    const logoImage = screen.getByAltText('First slide')
    expect(logoImage).toBeInTheDocument()
    expect(logoImage.src).toContain('PC-logo-square-text.png')  // Ensure it's the correct image
  })

  it('renders the copyright notice', () => {
    renderWithRouter(<Footer />)

    expect(screen.getByText(/© Copyright Pawfect Care 2024/i)).toBeInTheDocument()
  })
})