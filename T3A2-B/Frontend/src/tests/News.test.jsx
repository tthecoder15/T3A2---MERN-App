import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import News from '../components/Home/News';

describe('News Component', () => {
    const contentArray = [
        {
            text: 'The Paw-stronaut: First Dog on the Moon',
            imgSrc: './docs/Home/CarouselOne.jpg',
        },
        {
            text: 'The Feline Physician: Whiskers the Cancer Cure',
            imgSrc: './docs/Home/CarouselTwo.jpg',
        },
        {
            text: 'Ben the Janitor: Pawfect Care\'s Unsung Hero',
            imgSrc: './docs/Home/CarouselThree.jpg',
        },
    ];

    it('should render the initial content correctly', () => {
        render(<News />);

        const currentIndex = 0;
        
        // Check the initial image source
        const image = screen.getByAltText('Displayed content');
        expect(image).toHaveAttribute('src', contentArray[currentIndex].imgSrc);

        // Check the initial text content
        expect(screen.getByText(contentArray[currentIndex].text)).toBeInTheDocument();

        // Check the initial button text
        const nextIndex = (currentIndex + 1) % contentArray.length;
        expect(screen.getByText(contentArray[nextIndex].text)).toBeInTheDocument();
    });

    it('should switch to the next content when the button is clicked', () => {
        render(<News />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        const currentIndex = 1;
        
        // Check the updated image source
        const image = screen.getByAltText('Displayed content');
        expect(image).toHaveAttribute('src', contentArray[currentIndex].imgSrc);

        // Check the updated text content
        expect(screen.getByText(contentArray[currentIndex].text)).toBeInTheDocument();

        // Check the updated button text
        const nextIndex = (currentIndex + 1) % contentArray.length;
        expect(screen.getByText(contentArray[nextIndex].text)).toBeInTheDocument();
    });

    it('should cycle back to the first content after the last one', () => {
        render(<News />);

        const button = screen.getByRole('button');

        // Click the button twice to go to the last content
        fireEvent.click(button);
        fireEvent.click(button);

        const currentIndex = 2;
        
        // Check the last content's image source and text
        const image = screen.getByAltText('Displayed content');
        expect(image).toHaveAttribute('src', contentArray[currentIndex].imgSrc);
        expect(screen.getByText(contentArray[currentIndex].text)).toBeInTheDocument();

        // Click the button once more to cycle back to the first content
        fireEvent.click(button);

        const resetIndex = 0;

        // Check that it returns to the first content
        expect(image).toHaveAttribute('src', contentArray[resetIndex].imgSrc);
        expect(screen.getByText(contentArray[resetIndex].text)).toBeInTheDocument();
    });
});
