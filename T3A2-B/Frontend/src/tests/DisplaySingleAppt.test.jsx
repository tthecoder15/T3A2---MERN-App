import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DisplaySingleAppt from '../components/MyAcc/DisplaySingleAppt';

vi.mock('../components/Popups/DeleteApptPopup', () => ({
  __esModule: true,
  default: ({ popupIsOpen, makePopupClose }) => {
    return popupIsOpen ? (
      <div>
        <p>Delete Appointment</p>
        <button onClick={makePopupClose}>Close</button>
      </div>
    ) : null;
  }
}));

describe('DisplaySingleAppt', () => {
  const mockAppt = {
    _id: '1',
    date: '2023-09-01T10:00:00Z',
    vetId: { vetName: 'Dr. Smith' },
    petId: { petName: 'Buddy' },
    appointmentType: 'checkup'
  };

  it('renders appointment details correctly', () => {
    render(<DisplaySingleAppt appt={mockAppt} />);

    expect(screen.getByText(/Appointment Date:/)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Smith/)).toBeInTheDocument();
    expect(screen.getByText(/Buddy/)).toBeInTheDocument();
    expect(screen.getByText(/Checkup/)).toBeInTheDocument();
  });

  it('does not show the delete button when deleteB is false', () => {
    render(<DisplaySingleAppt appt={mockAppt} deleteB={false} />);

    const deleteButton = screen.queryByText('Delete');
    expect(deleteButton).not.toBeInTheDocument();
  });

  it('shows the delete button when deleteB is true', () => {
    render(<DisplaySingleAppt appt={mockAppt} deleteB={true} />);

    const deleteButton = screen.getByText('Delete');
    expect(deleteButton).toBeInTheDocument();
  });

  it('opens and closes the delete popup correctly', () => {
    render(<DisplaySingleAppt appt={mockAppt} deleteB={true} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(screen.getByText('Delete Appointment')).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    expect(screen.queryByText('Delete Appointment')).not.toBeInTheDocument();
  });
});