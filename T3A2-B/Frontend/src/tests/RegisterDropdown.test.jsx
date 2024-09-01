import '@testing-library/jest-dom'
import { render, fireEvent, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RegisterDropDown from '../components/Login/RegisterDropDown';

describe('RegisterDropDown', () => {
    // Mock RegisterUser as a functional component
    vi.mock('../components/RegisterForms/RegisterUser', () => ({
        __esModule: true,
        default: ({ onSuccess }) => {
            // Simulate successful registration by calling onSuccess prop
            return (
                <div>
                    Mocked RegisterUser Component
                    <button onClick={() => onSuccess('Registration successful')}>Mock Submit</button>
                </div>
            );
        },
    }));

    it('toggles form visibility when the button is clicked', () => {
        render(<RegisterDropDown />);
        
        // Check initial state (form is closed)
        const button = screen.getByText('Register Now');
        expect(button).toBeInTheDocument();
        expect(screen.queryByText('Mocked RegisterUser Component')).toBeNull();

        // Click to open the form
        fireEvent.click(button);
        expect(screen.getByText('Close register form')).toBeInTheDocument();
        expect(screen.getByText('Mocked RegisterUser Component')).toBeInTheDocument();

        // Click to close the form
        fireEvent.click(screen.getByText('Close register form'));
        expect(screen.getByText('Register Now')).toBeInTheDocument();
        expect(screen.queryByText('Mocked RegisterUser Component')).toBeNull();
    });

    it('displays a success message after registration', () => {
        render(<RegisterDropDown />);
        
        // Open the form
        fireEvent.click(screen.getByText('Register Now'));

        // Simulate success by clicking the "Mock Submit" button that triggers the onSuccess prop
        fireEvent.click(screen.getByText('Mock Submit'));

        // Check that the success message is displayed
        expect(screen.getByText('Registration successful')).toBeInTheDocument();

        // Check that the form is closed
        expect(screen.queryByText('Mocked RegisterUser Component')).toBeNull();
    });
});