import '@testing-library/jest-dom';
import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import MyAccountDash from '../components/MyAcc/MyAccountDash';
import renderWithRouter from './config/RenderWithRouter';
import { loginTestUser } from './config/MockSessionState'; 
// Mock sessionState to return a minimal userData mock for testing
vi.mock('../../routes/store', () => ({
  default: vi.fn().mockImplementation((selector) =>
    selector({
      userData: {
        phNumber: '123-456-7890',
        email: 'test@example.com',
        appointments: [],
        pets: [],
      },
    })
  ),
}));

describe('MyAccountDash Component', () => {
  beforeEach(async () => {
    await loginTestUser(); // Ensure user is logged in before rendering
    renderWithRouter(<MyAccountDash />);  // Use renderWithRouter here
  });

  it('renders personal information section', () => {
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Your phone number: 0411222333')).toBeInTheDocument();
    expect(screen.getByText('Your email address: johnseesstars@gmail.com')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update personal information/i })).toBeInTheDocument();
  });

  it('renders next appointment section', () => {
    expect(screen.getByText('Next Appointment')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update appointment/i })).toBeInTheDocument();
  });

  it('renders pet information section', () => {
    expect(screen.getByText('Pet Information')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register new pet/i })).toBeInTheDocument();
  });

  it('renders appointment history section', () => {
    expect(screen.getByText('Appointment History')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /see more../i })).toBeInTheDocument();
  });
});
