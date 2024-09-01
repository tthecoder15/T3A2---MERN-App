import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import UpdateAppointmentsDropdown from '../components/MyAcc/MyAccDropdowns/UpdateAppointmentsDropdown';

describe('UpdateAppointmentsDropdown', () => {
    const mockAppts = [
      {
        _id: '1',
        date: '2023-09-01T10:00:00Z',
        vetId: { vetName: 'Dr. Smith' },
        petId: { petName: 'Buddy' },
        appointmentType: 'checkup'
      },
      {
        _id: '2',
        date: '2023-09-02T10:00:00Z',
        vetId: { vetName: 'Dr. Doe' },
        petId: { petName: 'Max' },
        appointmentType: 'surgery'
      }
    ];
  
    it('renders upcoming appointments correctly', () => {
      render(<UpdateAppointmentsDropdown upcomingAppts={mockAppts} />);
  
      // Check that the heading is rendered
      expect(screen.getByText(/Upcoming Appointments/i)).toBeInTheDocument();
  
      // Check that each appointment detail is rendered
      expect(screen.getByText(/Buddy/i)).toBeInTheDocument();
      expect(screen.getByText(/Dr. Smith/i)).toBeInTheDocument();
      expect(screen.getByText(/Checkup/i)).toBeInTheDocument();
  
      expect(screen.getByText(/Max/i)).toBeInTheDocument();
      expect(screen.getByText(/Dr. Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Surgery/i)).toBeInTheDocument();
    });
  
    it('renders nothing when no appointments are passed', () => {
      render(<UpdateAppointmentsDropdown upcomingAppts={[]} />);
  
      // Check that no appointments are rendered
      expect(screen.queryByText(/Appointment Date:/i)).not.toBeInTheDocument();
    });
  });