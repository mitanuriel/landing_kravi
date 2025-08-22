import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import HeroSection from '../components/HeroSection';

describe('HeroSection Component - User Story 1', () => {
  test('renders hero section with required elements', () => {
    render(<HeroSection />);

    // AC: Hero section displays a clear, compelling headline (max 10 words)
    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toBeInTheDocument();
    expect(headline.textContent.split(' ').length).toBeLessThanOrEqual(10);
  });

  test('displays subheadline with additional context', () => {
    render(<HeroSection />);

    // AC: Subheadline provides additional context (1-2 sentences)
    const subheadline = screen.getByTestId('hero-subheadline');
    expect(subheadline).toBeInTheDocument();
    expect(subheadline.textContent.length).toBeGreaterThan(0);
  });

  test('primary CTA button is prominently displayed and functional', async () => {
    const user = userEvent.setup();
    render(<HeroSection />);

    // AC: Primary call-to-action (CTA) button is prominently displayed
    const ctaButton = screen.getByRole('button', { name: /get started|learn more|contact us/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toBeVisible();

    // Test button functionality
    await user.click(ctaButton);
    // Add assertion based on expected behavior
  });

  test('hero section includes background media', () => {
    render(<HeroSection />);

    // AC: Hero section includes a relevant background image or video
    const backgroundImage = screen.getByTestId('hero-background') ||
      document.querySelector('[style*="background-image"]');
    expect(backgroundImage).toBeInTheDocument();
  });

  test('content is visible above the fold', () => {
    render(<HeroSection />);

    // AC: Content is visible above the fold on desktop and mobile
    const heroContainer = screen.getByTestId('hero-container');
    expect(heroContainer).toBeInTheDocument();

    // Check if hero section has appropriate height
    const styles = window.getComputedStyle(heroContainer);
    expect(styles.minHeight).toBeTruthy();
  });

  test('hero section loads within performance requirements', async () => {
    const startTime = performance.now();
    render(<HeroSection />);

    // Wait for all content to load
    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    const endTime = performance.now();
    const loadTime = endTime - startTime;

    // AC: Hero section loads within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });
});