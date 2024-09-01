import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectVetDropdown from '../components/Booking/BookingDropdowns/SelectVetDropdown';
import SelectServiceDropdown from '../components/Booking/BookingDropdowns/SelectServiceDropdown';
import SelectPetDropdown from '../components/Booking/BookingDropdowns/SelectPetDropdown';

describe('Dropdown Components', () => {
    describe('SelectVetDropdown', () => {
      const vetArray = [
        { vetName: 'Dr. Smith' },
        { vetName: 'Dr. Johnson' },
        { vetName: 'Dr. Williams' },
      ];
  
      const mockHandleVetChange = vi.fn();
  
      it('renders dropdown with default text when no vet is selected', () => {
        render(<SelectVetDropdown vetSelect={{}} handleVetChange={mockHandleVetChange} vetArray={vetArray} />);
        expect(screen.getByText('Select Vet')).toBeInTheDocument();
      });
  
      it('renders dropdown with selected vet name', () => {
        render(<SelectVetDropdown vetSelect={{ vetName: 'Dr. Smith' }} handleVetChange={mockHandleVetChange} vetArray={vetArray} />);
        expect(screen.getByText('Dr. Smith')).toBeInTheDocument();
      });
  
      it('renders all vet names in the dropdown menu', () => {
        render(<SelectVetDropdown vetSelect={{}} handleVetChange={mockHandleVetChange} vetArray={vetArray} />);
        fireEvent.click(screen.getByText('Select Vet'));
        vetArray.forEach(vet => {
          expect(screen.getByText(vet.vetName)).toBeInTheDocument();
        });
      });
  
      it('calls handleVetChange when a vet is selected', () => {
        render(<SelectVetDropdown vetSelect={{}} handleVetChange={mockHandleVetChange} vetArray={vetArray} />);
        fireEvent.click(screen.getByText('Select Vet'));
        fireEvent.click(screen.getByText('Dr. Smith'));
        expect(mockHandleVetChange).toHaveBeenCalledWith({ vetName: 'Dr. Smith' });
      });
    });
  
    describe('SelectServiceDropdown', () => {
      const mockHandleServiceChange = vi.fn();
  
      it('renders dropdown with default text when no service is selected', () => {
        render(<SelectServiceDropdown serviceSelect="" handleServiceChange={mockHandleServiceChange} />);
        expect(screen.getByText('Select Appointment Type')).toBeInTheDocument();
      });
  
      it('renders dropdown with selected service name', () => {
        render(<SelectServiceDropdown serviceSelect="Check-up" handleServiceChange={mockHandleServiceChange} />);
        expect(screen.getByText('Check-up')).toBeInTheDocument();
      });
  
      it('renders all service options in the dropdown menu', () => {
        render(<SelectServiceDropdown serviceSelect="" handleServiceChange={mockHandleServiceChange} />);
        fireEvent.click(screen.getByText('Select Appointment Type'));
  
        const services = ["Check-up", "Dental", "Vaccination", "Surgery", "Other"];
        services.forEach(service => {
          expect(screen.getByText(service)).toBeInTheDocument();
        });
      });
  
      it('calls handleServiceChange when a service is selected', () => {
        render(<SelectServiceDropdown serviceSelect="" handleServiceChange={mockHandleServiceChange} />);
        fireEvent.click(screen.getByText('Select Appointment Type'));
        fireEvent.click(screen.getByText('Check-up'));
        expect(mockHandleServiceChange).toHaveBeenCalledWith("Check-up");
      });
    });
  
    describe('SelectPetDropdown', () => {
      const mockHandlePetChange = vi.fn();
  
      const userData = {
        pets: [
          { petName: 'Buddy' },
          { petName: 'Max' },
          { petName: 'Bella' },
        ]
      };
  
      it('renders dropdown with default text when no pet is selected', () => {
        render(<SelectPetDropdown petSelect={{}} handlePetChange={mockHandlePetChange} />);
        expect(screen.getByText('Select Pet')).toBeInTheDocument();
      });
  
      it('renders dropdown with selected pet name', () => {
        render(<SelectPetDropdown petSelect={{ petName: 'Buddy' }} handlePetChange={mockHandlePetChange} />);
        expect(screen.getByText('Buddy')).toBeInTheDocument();
      });
  
      it('opens the popup when "Register New Pet" is selected', () => {
        render(<SelectPetDropdown petSelect={{}} handlePetChange={mockHandlePetChange} userData={userData} />);
        fireEvent.click(screen.getByText('Select Pet'));
        fireEvent.click(screen.getByText('Register New Pet'));
        expect(screen.getByText('Register New Pet')).toBeInTheDocument();
      });
    });
  });