import '@testing-library/jest-dom';
import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './config/RenderWithRouter';
import LoginField from '../components/Login/LoginFunc';
import { loginTestUser } from './config/MockSessionState';
import sessionState from '../routes/store';


// Mock react-router-dom to mock useNavigate while keeping other functionality
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

beforeEach(() => {
  // Reset the session state to default before each test
  sessionState.setState({
    isAuthenticated: false,
    userData: {},
    error: null,
  });
});

describe('LoginField Component', () => {
  it('should render login form', () => {
    renderWithRouter(<LoginField />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId('Login')).toBeInTheDocument();
  });

  it('should attempt login when the form is submitted', async () => {
    renderWithRouter(<LoginField />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'pawfectcare@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'admin123' },
    });

    fireEvent.click(screen.getByTestId('Login'));

    await waitFor(() => {
      const { isAuthenticated, userData } = sessionState.getState();
      expect(isAuthenticated).toBe(true);
      expect(userData.email).toBe('pawfectcare@gmail.com');
    });
  });

  it('should navigate to user account after successful login using loginTestUser', async () => {
    renderWithRouter(<LoginField />);

    // Ensure that loginTestUser is properly awaited and wrapped in act
    await act(async () => {
      await loginTestUser();
    });

    await waitFor(() => {
      expect(screen.getByText('Login Successful!')).toBeInTheDocument();
    });
  });
});
