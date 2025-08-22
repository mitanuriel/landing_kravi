// Integration Tests - User Stories 8 & 9
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import Homepage from '../components/Homepage';

expect.extend(toHaveNoViolations);

describe('Homepage Integration Tests', () => {
  // User Story 8: Mobile Responsiveness
  describe('Mobile Responsiveness - User Story 8', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', { value: 375, configurable: true });
      Object.defineProperty(window, 'innerHeight', { value: 667, configurable: true });
      window.dispatchEvent(new Event('resize'));
    });

    test('website is fully responsive on mobile devices', () => {
      render(<Homepage />);

      // AC: Website is fully responsive on mobile devices
      const container = screen.getByTestId('homepage-container');
      const styles = window.getComputedStyle(container);
      expect(styles.maxWidth).toBe('100%');
    });

    test('touch targets are appropriately sized', () => {
      render(<Homepage />);

      // AC: Touch targets are appropriately sized (minimum 44px)
      const buttons = screen.getAllByRole('button');
      const links = screen.getAllByRole('link');

      [...buttons, ...links].forEach((element) => {
        const styles = window.getComputedStyle(element);
        const height = parseInt(styles.height);
        const minTouchTarget = parseInt(styles.minHeight) || height;
        expect(minTouchTarget).toBeGreaterThanOrEqual(44);
      });
    });

    test('text is readable without zooming', () => {
      render(<Homepage />);

      // AC: Text is readable without zooming
      const textElements = screen.getAllByTestId(/text|paragraph|heading/);
      textElements.forEach((element) => {
        const styles = window.getComputedStyle(element);
        const fontSize = parseInt(styles.fontSize);
        expect(fontSize).toBeGreaterThanOrEqual(16);
      });
    });

    test('forms are easy to complete on mobile', () => {
      render(<Homepage />);

      // AC: Forms are easy to complete on mobile
      const formInputs = screen.getAllByRole('textbox');
      formInputs.forEach((input) => {
        const styles = window.getComputedStyle(input);
        const height = parseInt(styles.height) || parseInt(styles.minHeight);
        expect(height).toBeGreaterThanOrEqual(44);
      });
    });
  });

  // User Story 9: Performance & SEO
  describe('Performance & SEO - User Story 9', () => {
    test('proper meta tags are present', () => {
      render(<Homepage />);

      // AC: Proper meta tags (title, description, keywords)
      expect(document.title).toBeTruthy();
      expect(document.querySelector('meta[name="description"]')).toBeTruthy();
      expect(document.querySelector('meta[name="keywords"]')).toBeTruthy();
    });

    test('images have alt text', () => {
      render(<Homepage />);

      // AC: Optimized images with alt text
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).not.toBe('');
      });
    });

    test('clean semantic HTML structure', () => {
      render(<Homepage />);

      // AC: Clean, semantic HTML structure
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
    });

    test('accessibility compliance', async () => {
      const { container } = render(<Homepage />);

      // AC: Accessibility compliance (WCAG 2.1 AA)
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // End-to-End User Journey Tests
  describe('Complete User Journey', () => {
    test('user can navigate through entire homepage flow', async () => {
      const user = userEvent.setup();
      render(<Homepage />);

      // 1. Hero section is visible
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

      // 2. User scrolls to value proposition
      const valueProposition = screen.getByTestId('value-proposition-section');
      valueProposition.scrollIntoView();
      expect(valueProposition).toBeVisible();

      // 3. User views social proof
      const socialProof = screen.getByTestId('social-proof-section');
      socialProof.scrollIntoView();
      expect(socialProof).toBeVisible();

      // 4. User fills out contact form
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/message/i);

      await user.type(nameInput, 'Test User');
      await user.type(emailInput, 'test@example.com');
      await user.type(messageInput, 'Interested in your services');

      const submitButton = screen.getByRole('button', { name: /submit|send/i });
      await user.click(submitButton);

      // 5. Success message appears
      await waitFor(() => {
        expect(screen.getByText(/thank you|success/i)).toBeInTheDocument();
      });
    });

    test('navigation between sections works correctly', async () => {
      const user = userEvent.setup();
      render(<Homepage />);

      // Test navigation menu
      const aboutLink = screen.getByRole('link', { name: /about/i });
      await user.click(aboutLink);

      const aboutSection = screen.getByTestId('about-section');
      expect(aboutSection).toBeVisible();
    });
  });
});