import '@testing-library/jest-dom';
import React, { act } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import renderWithRouter from './config/RenderWithRouter';
import LoginField from '../components/Login/LoginField';
import { loginTestUser } from './config/MockSessionState';
import sessionState from '../routes/store';

// Mock react-router-dom to mock useNavigate while keeping other functionality
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: vi.fn(),
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

  it('should navigate to user account after successful login using loginTestUser', async () => {
    renderWithRouter(<LoginField />);

    await act(async () => {
      await loginTestUser();
    });

    await waitFor(() => {
      const { isAuthenticated } = sessionState.getState();
      expect(isAuthenticated).toBe(true); // Ensure isAuthenticated is true

      expect(screen.getByText('Login Successful!')).toBeInTheDocument();
    });
  });
});