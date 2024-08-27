import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ServicesButtons from '../components/Home/Services'
import renderWithRouter from './config/RenderWithRouter'

describe('ServicesButtons component', () => {
  
  it('renders all buttons without crashing', () => {
    renderWithRouter(<ServicesButtons />);
    
    expect(screen.getByText('Check-Ups')).toBeInTheDocument();
    expect(screen.getByText('Dental Service')).toBeInTheDocument();
    expect(screen.getByText('Vaccinations')).toBeInTheDocument();
    expect(screen.getByText('Surgeries')).toBeInTheDocument();
  });

  it('displays correct content when "Check-Ups" button is clicked', () => {
    renderWithRouter(<ServicesButtons />);
    
    const button = screen.getByText('Check-Ups');
    fireEvent.click(button);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Check-Ups');
    expect(screen.getByText(/A typical checkup at our clinic involves a comprehensive evaluation/)).toBeInTheDocument();
  });

  it('displays correct content when "Dental Service" button is clicked', () => {
    renderWithRouter(<ServicesButtons />);
    
    const button = screen.getByText('Dental Service');
    fireEvent.click(button);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Dental Service');
    expect(screen.getByText(/Dental health is an often-overlooked aspect of pet care/)).toBeInTheDocument();
  });

  it('displays correct content when "Vaccinations" button is clicked', () => {
    renderWithRouter(<ServicesButtons />);
    
    const button = screen.getByText('Vaccinations');
    fireEvent.click(button);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Vaccinations');
    expect(screen.getByText(/Vaccinations are a vital part of preventive care for your pet/)).toBeInTheDocument();
  });

  it('displays correct content when "Surgeries" button is clicked', () => {
    renderWithRouter(<ServicesButtons />);
    
    const button = screen.getByText('Surgeries');
    fireEvent.click(button);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Surgeries');
    expect(screen.getByText(/Surgery is sometimes necessary to address health issues in pets/)).toBeInTheDocument();
  });
});
