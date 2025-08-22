import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ValueProposition from '../components/ValueProposition';

describe('ValueProposition Component - User Story 3', () => {
  test('displays 3-4 key benefits/features', () => {
    render(<ValueProposition />);

    // AC: Section displays 3-4 key benefits/features
    const benefitItems = screen.getAllByTestId(/benefit-item/);
    expect(benefitItems).toHaveLength(3 || 4);
    expect(benefitItems.length).toBeGreaterThanOrEqual(3);
    expect(benefitItems.length).toBeLessThanOrEqual(4);
  });

  test('each benefit has icon, title, and description', () => {
    render(<ValueProposition />);

    // AC: Each benefit has an icon, title, and brief description
    const benefitItems = screen.getAllByTestId(/benefit-item/);

    benefitItems.forEach((item) => {
      expect(item.querySelector('[data-testid*="icon"]')).toBeInTheDocument();
      expect(item.querySelector('h3, h4')).toBeInTheDocument();
      expect(item.querySelector('p')).toBeInTheDocument();
    });
  });

  test('content is scannable and easy to digest', () => {
    render(<ValueProposition />);

    // AC: Content is scannable and easy to digest
    const benefitTitles = screen.getAllByRole('heading', { level: 3 });
    benefitTitles.forEach((title) => {
      expect(title.textContent.split(' ').length).toBeLessThanOrEqual(5);
    });

    const descriptions = screen.getAllByTestId(/benefit-description/);
    descriptions.forEach((desc) => {
      expect(desc.textContent.length).toBeLessThanOrEqual(150);
    });
  });

  test('benefits are customer-focused', () => {
    render(<ValueProposition />);

    // AC: Benefits are customer-focused (not feature-focused)
    const benefitTexts = screen.getAllByTestId(/benefit-description/);
    const customerWords = /you|your|save|improve|increase|reduce|help|solution/i;

    benefitTexts.forEach((text) => {
      expect(text.textContent).toMatch(customerWords);
    });
  });

  test('section has consistent styling', () => {
    render(<ValueProposition />);

    // AC: Section is visually appealing with consistent styling
    const benefitItems = screen.getAllByTestId(/benefit-item/);
    const container = screen.getByTestId('value-proposition-section');

    expect(container).toHaveClass(/value-proposition|benefits/);

    // Check consistent spacing/layout
    benefitItems.forEach((item) => {
      expect(item).toHaveClass(/benefit|feature/);
    });
  });
});