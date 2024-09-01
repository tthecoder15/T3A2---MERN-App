import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookingCalendar from '../components/Booking/BookingCalendar';

describe('BookingCalendar Component', () => {
  const vetArray = [
    {
      vetName: 'Dr. Smith',
      appointments: [
        { date: '2024-09-01T09:00:00' },
        { date: '2024-09-01T10:00:00' },
      ],
    },
  ];

  const vetSelect = { vetName: 'Dr. Smith' };
  const setTimeSelect = vi.fn();
  const setSubmitSuccess = vi.fn();

  it('renders year buttons', () => {
    render(
      <BookingCalendar
        vetArray={vetArray}
        vetSelect={vetSelect}
        setTimeSelect={setTimeSelect}
        submitSuccess={false}
        setSubmitSuccess={setSubmitSuccess}
      />
    );

    const yearButtons = screen.getAllByRole('button');
    expect(yearButtons).toHaveLength(2);
  });

  it('renders month buttons after selecting a year', () => {
    render(
      <BookingCalendar
        vetArray={vetArray}
        vetSelect={vetSelect}
        setTimeSelect={setTimeSelect}
        submitSuccess={false}
        setSubmitSuccess={setSubmitSuccess}
      />
    );

    fireEvent.click(screen.getByText('2024'));
    const monthButtons = screen.getAllByRole('button').slice(2); // Skip year buttons
    expect(monthButtons).not.toHaveLength(0);
  });

  it('renders day buttons after selecting a month', () => {
    render(
      <BookingCalendar
        vetArray={vetArray}
        vetSelect={vetSelect}
        setTimeSelect={setTimeSelect}
        submitSuccess={false}
        setSubmitSuccess={setSubmitSuccess}
      />
    );

    fireEvent.click(screen.getByText('2024'));
    fireEvent.click(screen.getByText('Sep'));

    const dayButtons = screen.getAllByRole('button').slice(4); // Skip year and month buttons
    expect(dayButtons).not.toHaveLength(0);
  });
});
