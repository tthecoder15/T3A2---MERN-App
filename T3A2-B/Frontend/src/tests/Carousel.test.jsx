import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NewsCarousel from '../components/Home/Carousel'
import renderWithRouter from './config/RenderWithRouter'

describe('NewsCarousel', () => {
  it('renders the carousel component', () => {
    renderWithRouter(<NewsCarousel />);
    
    const carousel = screen.getByTestId('carousel');
    expect(carousel).toBeInTheDocument();
  });

  it('renders the first carousel item with correct content', () => {
    renderWithRouter(<NewsCarousel />);
    
    // Find all carousel items using a more direct approach
    const carouselItems = screen.getAllByTestId('carousel-item');
    const firstItem = carouselItems[0];
    
    expect(firstItem).toBeInTheDocument();
    expect(screen.getByText('The Paw-stronaut: First Dog on the Moon')).toBeInTheDocument();
    expect(screen.getByText(/Man has conquered the moon, but what about our furry friends?/i)).toBeInTheDocument();
    expect(screen.getByAltText('Astronaut Dog')).toBeInTheDocument();
  });

  it('renders the second carousel item with correct content', () => {
    renderWithRouter(<NewsCarousel />);
    
    // Find all carousel items using a more direct approach
    const carouselItems = screen.getAllByTestId('carousel-item');
    const secondItem = carouselItems[1];
    
    expect(secondItem).toBeInTheDocument();
    expect(screen.getByText('The Feline Physician: Whiskers the Cancer Cure')).toBeInTheDocument();
    expect(screen.getByText(/Whiskers wasn't your average house cat./i)).toBeInTheDocument();
    expect(screen.getByAltText('Cat on Scrubs')).toBeInTheDocument();
  });

  it('renders the third carousel item with correct content', () => {
    renderWithRouter(<NewsCarousel />);
    
    // Find all carousel items using a more direct approach
    const carouselItems = screen.getAllByTestId('carousel-item');
    const thirdItem = carouselItems[2];
    
    expect(thirdItem).toBeInTheDocument();
    expect(screen.getByText('Ben the Janitor: Pawfect Care\'s Unsung Hero')).toBeInTheDocument();
    expect(screen.getByText(/Behind the scenes of Pawfect Care Veterinary Clinic,/i)).toBeInTheDocument();
    expect(screen.getByAltText('Mop on floor')).toBeInTheDocument();
  });
});
